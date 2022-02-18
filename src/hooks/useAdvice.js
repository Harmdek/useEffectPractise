import { useState, useEffect } from "react";

export default function useAdvice() {
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

  return {
    ...state,
    updateResourceType,
  };
}
