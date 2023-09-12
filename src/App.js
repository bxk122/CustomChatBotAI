import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const result = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });
      const data = await result.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Error fetching data");
    }
  };
  
return (
  <div className="App">
    <div className="App-header">
      <h2>Ask me anything?</h2>
      <form onSubmit={handleSubmit} className="input-container">
  <input 
    type="text" 
    value={query} 
    onChange={handleChange} 
    placeholder="Enter your query..." 
  />
  <button type="submit" disabled={!query.trim()}></button>
</form>
      <div className="response-section">
        <div className="response-title">Response:</div>
        <div className="response-text">{response}</div>
      </div>
    </div>
  </div>
);
}
export default App;