import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Details from './components/Details'

const App = () => {
  const [countries, setCountry] = useState([])
  const [search, setSearch] = useState([])
  const [notify, setNotify] = useState('')
  const [temp, setTemp] = useState(0)

  useEffect (()=>{
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountry(response.data)
    })
  },[])
  const handlefilter = (event) => {
    let filter = '';
    filter = filter + event.target.value;
    let filteredCountries = [];
    if (filter !== '') {
    filteredCountries = countries.reduce((filtered, country)=>{
      if(country.name.search(new RegExp(filter,'ig'))>=0) {
        filtered.push(country) 
      }
      return filtered;
    },[]);
    }
    if(filteredCountries.length>10) {
      setNotify('Too many matches, specify another filter')
      setTemp(0)
    } else if (filteredCountries.length === 1) {
      setNotify('');
      setSearch(filteredCountries)
      setTemp(1)
    } else {
      setNotify('');
      setTemp(0);
      setSearch(filteredCountries);
    }
  }
  const handleShow = (event) => {
    setTemp(1);
    let countryDetails = search.reduce((clickedCountry, country) => {
      	if(country.name === event.target.value) {
          clickedCountry.push(country)
        }
        return clickedCountry
    },[])
    setSearch(countryDetails);
  }
  
  return (
    <div>
      find country <input onChange = {handlefilter} />
      {notify.length!==0 && <p>{notify}</p>}
      {notify === '' && temp === 0 && search.map(country => <p key = {country.name}>{country.name}<button value = {country.name} onClick = {handleShow}>show</button></p>)}
      {temp === 1 && <Details search = {search} />}
    </div>
    
  )
}
export default App;
