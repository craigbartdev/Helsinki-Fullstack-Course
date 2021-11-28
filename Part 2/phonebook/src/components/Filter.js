import Notification from "./Notification"

const Filter = ({ handleFilterChange, notification, good }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={notification}
        good={good}
      />
      <input onChange={handleFilterChange} />
    </div>
  )
}

export default Filter