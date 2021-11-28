import axios from 'axios'
import React, { useEffect, useState } from 'react'

import './index.css'
import personService from './services/personService'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null) // notification message
  const [good, setGood] = useState(true); // for setting notification color

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, [])

  const handleForm = (event) => {
    event.preventDefault()
    const newObj = { name: newName, number: newNumber }

    // check if person exists
    const person = persons
      .find(person => person.name === newObj.name)

    if (!person) {
      // add person to server if non duplicate
      personService
        .create(newObj)
          .then(retObj => {
            setPersons(persons.concat(retObj))
            setNotification(`${retObj.name} has been added`)
            setGood(true)
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(err => {
            alert("Post request failed")
          })
    } else {
      // update existing user if duplicate
      window.confirm(`${person.name} is already in the `
        + `phonebook, do you want to replace their number?`) 
      &&
      personService
        .updatePerson(person.id, newObj)
          .then(retObj => {
            // replace old object in persons
            setPersons(persons.map(p => (
              p.id !== retObj.id ? p : retObj
            )))
            setNotification(`${person.name} has been updated`)
            setGood(true)
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(err => {
            setNotification(`Could not find ${person.name}`)
            setGood(false)
            setPersons(persons
              .filter(p => p.id !== person.id))
          })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (id, name) => {
    window.confirm(`Do you want to delete ${name}?`) &&
    personService
      .deletePerson(id)
        .then(res => setPersons(persons
          .filter(person => person.id !== id)))
        .catch(err => alert(`Could not delete ${name}`))
  }

  const personsToShow = newFilter ? 
  persons.filter(person => 
    person.name.toLowerCase()
    .includes(newFilter)) : 
  persons

  return (
    <div>
      <Filter 
        handleFilterChange={handleFilterChange}
        notification={notification}
        good={good}
      />
      <Form 
        handleForm={handleForm}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Numbers 
        personsToShow={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
