import React, { useState } from 'react'
import ReactDOM from 'react-dom'
let next = 0;

const MostVote = ({voteCount,anecdotes}) => {
  let maxVote = voteCount.reduce((a,b)=>Math.max(a,b));
  let maxVotedAnecdoteIndex = voteCount.indexOf(maxVote);
  if(maxVote === 0) {
    return (
      <>
        <h1>Anecdote with most votes</h1>
        <p>Not voted yet</p>
      </>
    )
  }
  return(
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotedAnecdoteIndex]}</p>
      <p>has {maxVote} votes</p>
    </>
  )
}
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState(Array(props.anecdotes.length).fill(0))
  
  
  const countArray = [...voteCount]
  const handleClick = () => {
    next = Math.floor(Math.random()* Math.floor(props.anecdotes.length))
    return (
      setSelected(next)
    )
  }
  const handleVote = () => {
    countArray[next] += 1;
    return (
      setVoteCount(countArray)
    )
  }
  
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {voteCount[next]} votes</p>
      <button onClick = {handleVote}>Vote</button>
      <button onClick = {handleClick}>Next anecdotes</button>
      <MostVote voteCount = {voteCount} anecdotes = {props.anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
