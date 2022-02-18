import { useState, useEffect } from "react";
import "./App.css";
import AdviceButton from "./components/AdviceButton";

function App() {
  const [state, setState] = useState({
    resourceType: "cheese",
    items: [],
    loader: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      `https://deelay.me/2000/https://api.adviceslip.com/advice/search/${state.resourceType}`,
      { signal: controller.signal }
    )
      .then((response) => response.json())
      .then((json) => {
        if (!json.slips) {
          return setState({
            ...state,
            loader: false,
            error: json.message.text,
          });
        }
        setState({
          ...state,
          items: json,
          loader: false,
        });
      })
      .catch((error) => {
        return setState({
          ...state,
          loader: false,
          error: error.message,
        });
      });

    return () => controller.abort();
  }, [state.resourceType]);

  function updateResourceType(resourceType) {
    setState({
      resourceType: resourceType,
      items: [],
      loader: true,
      error: null,
    });
  }

  return (
    <div className="wrapper">
      <div className="head">
        <div className="dots">
          <span className="red"></span>
          <span className="orange"></span>
          <span className="green"></span>
        </div>

        <div className="colorScheme">
          <select name="colorScheme">
            <option value="volvo">Light</option>
            <option value="saab">Dark</option>
          </select>
        </div>
      </div>

      <div className="main">
        <div className="title">
          <h1>Solid advice 🧐</h1>
        </div>

        <div className="buttons">
          <AdviceButton
            icon="🧀"
            buttonText="Cheese"
            onClick={() => updateResourceType("cheese")}
          />
          <AdviceButton
            icon="❤️"
            buttonText="Love"
            onClick={() => updateResourceType("love")}
          />

          <button className="button" onClick={() => updateResourceType("love")}>
            <span>❤️</span>Love
          </button>
          <button
            className="button"
            onClick={() => updateResourceType("friends")}
          >
            <span>🫂</span>Friends
          </button>
          <button
            className="button"
            onClick={() => updateResourceType("sleep")}
          >
            <span>😴</span>Sleep
          </button>
          <button className="button" onClick={() => updateResourceType("food")}>
            <span>🍽️</span>Food
          </button>
          <button
            className="button"
            onClick={() => updateResourceType("spiders")}
          >
            <span>🕷️</span>Spiders
          </button>
          <button
            className="button"
            onClick={() => updateResourceType("regret")}
          >
            <span>😥</span>Regret
          </button>
          <button className="button" onClick={() => updateResourceType("work")}>
            <span>👨‍💻</span>Work
          </button>
          <button
            className="button"
            onClick={() => updateResourceType("testtt")}
          >
            <span>???</span>NIKS
          </button>
        </div>

        <div className="content">
          <h2>
            Here is some solid advice about
            <br />
            <span>{state.resourceType}</span>
          </h2>

          <div className="results">
            {state.loader && "LOADING..."}
            {state.items.slips && (
              <ul className="outputList">
                {state.items.slips.map((item) => {
                  return (
                    <li key={item.id}>
                      {JSON.stringify(item.advice).replace(/['"]+/g, "")}
                    </li>
                  );
                })}
              </ul>
            )}
            {state.error && <p>{state.error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// Quotes weghalen doormiddel van str function > Kan dat makkelijker?
// nummer lijst doormiddel van CSS > Kan dat makkelijker?
