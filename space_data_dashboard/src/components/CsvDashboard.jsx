import { useState } from "react";
import Papa from "papaparse";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CsvDashboard() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const parsedData = result.data;
        setHeaders(parsedData[0]); // First row as headers
        setData(parsedData.slice(1)); // Rest as data rows
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">CSV Data Dashboard</h2>

      {/* File Upload */}
      <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4 p-2 border rounded" />

      {/* Table Display */}
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {headers.map((header, index) => (
                  <th key={index} className="border p-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border p-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bar Chart */}
      {data.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Graph Visualization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.slice(0, 10).map((row, index) => ({ name: row[0], value: Number(row[1]) }))}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
