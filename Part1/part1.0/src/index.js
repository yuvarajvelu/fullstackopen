import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Parts part = {props.course.parts[0].name} exercise = {props.course.parts[0].exercises} />
      <Parts part = {props.course.parts[1].name} exercise = {props.course.parts[1].exercises} />
      <Parts part = {props.course.parts[2].name} exercise = {props.course.parts[2].exercises} />
    </div>
  )
}
const Parts = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}
const Footer = (props) => {
  return (
    <>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course = {course} />
      <Content course = {course}/>
      <Footer course = {course} />
    </>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

