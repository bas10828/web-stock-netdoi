import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const globalVariablesRes = await fetch("globalVariables.json");
      const globalVariables = await globalVariablesRes.json();
      const ip = globalVariables.ip;
      const response = await fetch(`${ip}:5000/data`);
      console.log("res", response);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Serial</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.price}</td>
              <td>{item.serial}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
