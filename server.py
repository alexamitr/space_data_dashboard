from fastapi import FastAPI, Query, HTTPException
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV and clean data
df = pd.read_csv("space_missions_dataset.csv")

# Standardize column names
df.rename(columns={"Mission Cost (billion USD)": "MissionCost", "Mission Success (%)": "MissionSuccess"}, inplace=True)

# Ensure numerical values
df["MissionCost"] = pd.to_numeric(df["MissionCost"], errors="coerce")
df["MissionSuccess"] = pd.to_numeric(df["MissionSuccess"], errors="coerce")

# Drop rows with missing values
df.dropna(inplace=True)

# Compute quartiles
quantiles = {
    "Q1": df["MissionCost"].quantile(0.25),
    "Q2": df["MissionCost"].quantile(0.50),
    "Q3": df["MissionCost"].quantile(0.75),
}

@app.get("/data")
def get_data(q: int = Query(..., description="Quantile number (1 to 4)")):
    """Fetch data for a specific quantile (1 to 4)."""
    if q not in [1, 2, 3, 4]:
        raise HTTPException(status_code=400, detail="Invalid quantile. Choose 1, 2, 3, or 4.")
    
    if q == 1:
        filtered_df = df[df["MissionCost"] <= quantiles["Q1"]]
    elif q == 2:
        filtered_df = df[(df["MissionCost"] > quantiles["Q1"]) & (df["MissionCost"] <= quantiles["Q2"])]
    elif q == 3:
        filtered_df = df[(df["MissionCost"] > quantiles["Q2"]) & (df["MissionCost"] <= quantiles["Q3"])]
    else:  # q == 4
        filtered_df = df[df["MissionCost"] > quantiles["Q3"]]

    return filtered_df.to_dict(orient="records")

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
