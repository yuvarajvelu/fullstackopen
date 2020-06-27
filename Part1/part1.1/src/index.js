import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) =>  (
    <button onClick = {handleClick}>{text}</button>
  )

const Result = ({text, value}) => {
  return(
    <>
      <td>{text}</td><td>{value}</td> 
    </>
  )
}



const Display = ({good,bad,neutral}) => {
  const all = good + bad + neutral;
  const difference = good - bad;
  const average = difference / all || 0;
  const positive = (good/all) * 100 || 0;
  if(all === 0) {
    return (<div><p>No feedback given</p></div>)
  }
  return (
  <>
    <table>
      <tbody>
        <tr><Result text = 'good' value = {good} /></tr>
        <tr><Result text = 'neutral' value = {neutral} /></tr>
        <tr><Result text = 'bad' value = {bad} /></tr>
        <tr><Result text = 'all' value = {all} /></tr>
        <tr><Result text = 'average' value = {average} /></tr>
        <tr><Result text = 'positive' value = {positive + ' %'} /></tr>
      </tbody>
    </table>  
  </>)
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  const handleGood = ()=>setGood(good+1);
  const handleNeutral = ()=>setNeutral(neutral+1);
  const handleBad = ()=>setBad(bad+1);

  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {handleGood} text = 'good'/>
      <Button handleClick = {handleNeutral} text = 'neutral'/>
      <Button handleClick = {handleBad} text = 'bad' />
      <h1>statistics</h1>
      <Display good = {good} bad = {bad} neutral = {neutral} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)