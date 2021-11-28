import axios from "axios";
import React, { useEffect, useState } from "react";

import Country from "./components/Country";
import Listing from "./components/Listing";

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }, [])

  // apply filter to countries list
  const countriesToShow = newFilter ?
  countries.filter(country => 
    country.name.common
      .toLowerCase()
      .includes(newFilter)) :
  []

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  // render countries here
  const showCountries = () => {
    if (countriesToShow.length <= 10) {
      // show full entry if only one match
      if (countriesToShow.length === 1) {
        return (
          countriesToShow.map(country => (
            <Country 
              key={country.name.common}
              country={country} 
              fetchWeather={true}
            />))
        )
      } else {
        return (
          // show a list if less than 10 matches
          countriesToShow.map(country => (
            <div key={country.name.common}>
              <Listing country={country} />
            </div>
          ))
        )
      }
    } else {
      return <p>Too many entries match, get more specific</p>
    }
  }

  return (
    <div>
      filter countries <input onChange={handleFilterChange} />
      {showCountries()}
    </div>
  );
}

export default App
