import Weather from "./Weather"

const Langauges = ({ languages }) => {
  return (
    <div>
      <h3>Languages</h3>
      <ul>
        {Object.keys(languages)
          .map(key => <li key={key}>{languages[key]}</li>)}
      </ul>
    </div>
  )
}

// don't render capital and languages if undefined
const Country = ({ country, fetchWeather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      {country.capital && <p>capital {country.capital}</p>}
      <p>population {country.population}</p>
      {country.languages && 
      <Langauges languages={country.languages} />}
      <img src={country.flags.png} alt={country.name.common}/>
      {country.capital && fetchWeather &&
        <Weather capital={country.capital}
      />}
    </div>
  )
}

export default Country