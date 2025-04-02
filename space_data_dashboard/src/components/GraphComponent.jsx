import { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function GraphComponent({ apiEndpoint, title }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [apiEndpoint]);

  return (
    <div className="p-4 bg-[#1E1E1E] shadow-lg rounded-lg border border-[#303030]">
      <h2 className="text-lg font-bold mb-4 text-center text-cyan-300">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="MissionCost" 
            stroke="#8884d8" 
            label={{ value: "Cost (USD)", position: "insideBottom", offset: -5, fill: "#fff" }}
          />
          <YAxis 
            dataKey="MissionSuccess" 
            stroke="#82ca9d" 
            label={{ value: "Success (%)", angle: -90, position: "insideLeft", fill: "#fff" }}
          />
          <Tooltip wrapperStyle={{ backgroundColor: "#222", color: "#fff", borderRadius: "5px" }} />
          <Scatter name="Missions" data={data} fill="#00FFFF" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
