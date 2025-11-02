import React, { useEffect, useState } from "react";
// Import the Axios library
import axios from "axios";
import 'maplibre-gl/dist/maplibre-gl.css'; // Keep the MapLibre CSS import for cleanup

function App() {
  // 1. State hook to hold the message received from the backend
  const [msg, setMsg] = useState("Connecting..."); 
  const [status, setStatus] = useState("pending");

  // 2. useEffect hook runs once after the component mounts
  useEffect(() => {
    // Axios performs an HTTP GET request to the backend's root path
    axios.get("http://localhost:5000/")
      .then(res => {
        // If the request is successful (HTTP 200), set the message and status
        setMsg(res.data);
        setStatus("success");
      })
      .catch(err => {
        // If the request fails (e.g., backend is not running, 404, etc.)
        console.error("Error fetching data from backend:", err);
        setMsg("ERROR: Could not connect to backend.");
        setStatus("error");
      });
  }, []); // The empty dependency array ensures this runs only once

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h1>Travel Guide</h1>
      
      {/* Visual feedback based on connection status */}
      <div style={{ 
          padding: '15px', 
          marginTop: '20px',
          borderRadius: '8px',
          backgroundColor: status === 'success' ? '#d4edda' : status === 'error' ? '#f8d7da' : '#fff3cd',
          color: status === 'success' ? '#155724' : status === 'error' ? '#721c24' : '#856404',
          border: `1px solid ${status === 'success' ? '#c3e6cb' : status === 'error' ? '#f5c6cb' : '#ffeeba'}`
      }}>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Backend says: {msg}
        </p>
      </div>

      <p style={{ marginTop: '30px', color: '#555' }}>
        If you see the success message, your React frontend is successfully communicating with your backend server!
      </p>
    </div>
  );
}

export default App;

