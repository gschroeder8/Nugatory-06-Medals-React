import React, { useState } from "react";
import Medals from "./Medals";

function Country({ country, deleteCountry }) {
  const [gold, setGold] = useState(country.gold);
  const [silver, setSilver] = useState(country.silver);
  const [bronze, setBronze] = useState(country.bronze);

  return (
    <div className="country">
      <h2>{country.name}</h2>
      <Medals type="Gold" count={gold} setCount={setGold} />
      <Medals type="Silver" count={silver} setCount={setSilver} />
      <Medals type="Bronze" count={bronze} setCount={setBronze} />
      <button onClick={() => deleteCountry(country.id)}>Delete</button>
    </div>
  );
}

export default Country;
