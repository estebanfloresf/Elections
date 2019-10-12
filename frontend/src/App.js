import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [hasError, setErrors] = useState(false);
  const [candidates, setCandidates] = useState([]);

  async function fetchData() {
    const res = await fetch("http://localhost:8090/api/candidates");
    res
      .json()
      .then(res => setCandidates(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <p>Here are the candidates</p>
      {candidates.map(item => (
        <div>
          <img src={`../images/candidates/${item.image}`} alt={item.image} />
          <p>{item.candidate}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
