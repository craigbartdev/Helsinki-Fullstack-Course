import { useState } from "react"
import Country from "./Country"

const Listing = ({ country }) => {
  const [isOpen, setIsOpen] = useState(false)

  // toggle view on button click, no weather
  return (
    <div>
    {isOpen ?
      <div>
        <button onClick={() => setIsOpen(false)}>
          Close
        </button>
        <Country country={country} fetchWeather={false} /> 
      </div>
      :
      <div>
        {country.name.common} <button onClick={() => setIsOpen(true)}>
          Show
        </button>
      </div>
    }
    </div>
  )
}

export default Listing