import React, { useState, useEffect } from "react";

import "../styles/App.scss";

function App() {
  const [hasError, setErrors] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  const menu = ["results", "surveys"];

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
    <div className="wrapper">
      <header>
        <h1 className="logo">
          <a href="/">elections</a>
        </h1>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <nav>
          <ul className="">
            {menu.map((item, i) => (
              <li
                key={i}
                className={hovered ? "example hover " : "example hover active"}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
              >
                <a href="/">{item}</a>
              </li>
            ))}
          </ul>
        </nav>
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span>
        </label>
      </header>
      <article>
        <h2>Article Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          laborum, ex tempora esse fuga consequuntur dolores excepturi, eaque
          quis incidunt?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          laborum, ex tempora esse fuga consequuntur dolores excepturi, eaque
          quis incidunt?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          laborum, ex tempora esse fuga consequuntur dolores excepturi, eaque
          quis incidunt?
        </p>
      </article>
    </div>
  );
}

export default App;
