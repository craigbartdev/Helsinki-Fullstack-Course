import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const create = newObj => {
  const req = axios.post(baseUrl, newObj)
  return req.then(res => res.data)
}

const deletePerson = id => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

const updatePerson = (id, newObj) => {
  const req = axios.put(`${baseUrl}/${id}`, newObj)
  return req.then(res => res.data)
}

const personService = { create, deletePerson, updatePerson }
export default personService