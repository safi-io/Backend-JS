import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
    <div style={{backgroundColor : "#123"}}>
      <h1>Hello Safi</h1>
      <p>Number of Jokes:- {jokes.length}</p>

    </div>

      {jokes.map((joke) => (
        <div key={joke.id}>
          <h1>{joke.title}</h1>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  );
}
