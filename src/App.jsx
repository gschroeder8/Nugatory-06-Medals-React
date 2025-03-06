import React, { useState, useEffect } from "react";
import Country from "./components/Country";
import "./App.css";

const API_URL = "https://olympic-medals-api-cphbesgrdyfcc7fb.centralus-01.azurewebsites.net/api/country";

function App() {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState(""); 
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching countries: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setCountries(data))
      .catch((error) => setError(error.message));
  }, []);

  const addCountry = () => {
    if (!newCountry.trim()) {
      alert("Country name cannot be empty!");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCountry, gold: 0, silver: 0, bronze: 0 }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add country.");
        return response.json();
      })
      .then((newCountryData) => {
        setCountries([...countries, newCountryData]); 
        setNewCountry(""); 
      })
      .catch((error) => console.error("Add country error:", error));
  };

  const deleteCountry = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete country.");
        }
        setCountries(countries.filter((country) => country.id !== id)); 
      })
      .catch((error) => console.error("Delete error:", error));
  };

  return (
    <div className="app">
      <h1>Olympic Medals</h1>

      <div>
        <input
          type="text"
          placeholder="Enter country name"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
        />
        <button onClick={addCountry}>Add Country</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="medals">
        {countries.length > 0 ? (
          countries.map((country) => (
            <Country key={country.id} country={country} deleteCountry={deleteCountry} />
          ))
        ) : (
          <p>Loading countries...</p>
        )}
      </div>
    </div>
  );
}

export default App;
