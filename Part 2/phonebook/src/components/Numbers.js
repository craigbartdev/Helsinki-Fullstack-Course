const Numbers = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map((person) => 
        <Person 
          key={person.id}
          id={person.id}
          name={person.name} 
          number={person.number}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

const Person = ({ id, name, number, handleDelete }) => {
  return (
    <div key={id}>
      {name} {number} {" "}
      <button onClick={() => handleDelete(id, name)}>
        Delete
      </button>
    </div>
  )
}

export default Numbers