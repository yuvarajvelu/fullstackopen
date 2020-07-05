import React, { useState, useEffect } from 'react'

import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import personService from './services/persons'
import Notification from  './component/Notification'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState([]);
  const [ newNotMatched,setNotMatched ] = useState('');
  const [ notifyMessage, setNotifyMessage] = useState(null);

  useEffect(() => {
  personService.getAll().then(initialNotes => {
    setPersons(initialNotes)
  })
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const contactInfo = {
      name: newName,
      number: newNumber
    }
    let result = persons.reduce((result,person)=>{
      if(person.name === contactInfo.name) {
        if(person.number !== contactInfo.number) {
          result = 2
        } else return 0
      } 
      return result
    },1);
    if(contactInfo.name === '' || contactInfo.number === '') {
      alert('Empty fields')
    }else if(result === 2) {
      if(window.confirm(`${contactInfo.name} is already in the phonebook. Do you want to replace the old number with new number?`)) {
        const person = persons.find(person => person.name === contactInfo.name)
        const updatedContact = {...person, number: contactInfo.number};

        personService
        .update(person.id,updatedContact)
        .then(receivedData => setPersons(persons.map(contact=>contact.name!==person.name?contact:receivedData)))
        .catch(() => {
          setNotifyMessage(`Information of ${updatedContact.name} has already been deleted on the server`)
          setTimeout(()=> {
            setNotifyMessage(null)
          },5000);
          setPersons(persons.filter(person => person.name !== updatedContact.name))
        })
      }
      
    }else if(result === 0) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      personService
      .create(contactInfo)
      .then(returnedData => {
        setPersons(persons.concat(returnedData))
        setNotifyMessage(`${returnedData.name} is added to the phonebook`);
        setTimeout(()=>{
          setNotifyMessage(null)
        },5000)
      });
    }
    setNewName('');
    setNewNumber('');
  }
  const handleName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  }
  let filter = '';
  const handleFilter = (event) => {
    filter = filter + event.target.value;
    setNewFilter([].push(filter))
    if(filter.length !== 0) {
    let filteredPerson = persons.reduce((acc,person)=>{
      if(person.name.search(new RegExp(filter,'gi'))>=0) {
        acc.push(person);
      } else {
        setNotMatched(filter)
      }
      return acc;
    },[]);
    	setNewFilter(filteredPerson)
    } else {
      setNewFilter([]);
      setNotMatched('');
    }
  }

  const handleDelete = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      setPersons(persons.filter(contact => contact.name !== person.name))
      personService.remove(person.id)
    } else alert('Operation cancelled');

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notifyMessage} />
      <Filter handleFilter = {handleFilter} />
      <h2>Add a new contact</h2>
      <PersonForm handleSubmit = {handleSubmit} newName = {newName} newNumber = {newNumber} handleName = {handleName} handleNumber ={handleNumber} />
      <h2>Numbers</h2>
      <Persons newFilter = {newFilter} newNotMatched = {newNotMatched} persons = {persons} handleDelete = {handleDelete}/>
    </div>
  )
}

export default App