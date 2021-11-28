const Form = ({ handleForm, handleNameChange, 
  handleNumberChange, newName, newNumber }) => {  
  return (
    <div>
      <h2>Add New </h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Form