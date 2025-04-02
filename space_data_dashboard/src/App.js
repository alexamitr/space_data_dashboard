import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import GraphComponent from "./components/GraphComponent";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#181818] text-white">
  <Navbar />
  <div className="p-6 bg-[#1E1E1E] overflow-auto min-h-screen">
    <h2 className="text-2xl font-bold text-cyan-400 mb-4">Mission Cost VS Mission Success!</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GraphComponent apiEndpoint="http://127.0.0.1:8000/data?q=1" title="First Quartile (Q1)" />
      <GraphComponent apiEndpoint="http://127.0.0.1:8000/data?q=2" title="Second Quartile (Q2)" />
      <GraphComponent apiEndpoint="http://127.0.0.1:8000/data?q=3" title="Third Quartile (Q3)" />
      <GraphComponent apiEndpoint="http://127.0.0.1:8000/data?q=4" title="Fourth Quartile (Q4)" />

    </div>
  </div>
</div>

    </div>
  );
}
