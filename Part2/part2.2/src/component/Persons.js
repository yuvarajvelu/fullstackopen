import React from 'react' 

const Persons = ({newFilter, newNotMatched, persons, handleDelete}) => {
    return(
        <div>
            {newFilter.length === 0 && newNotMatched.length === 0
                && persons.map(person=><p key={person.name}>{person.name} {person.number}<button onClick = {()=>handleDelete(person)}>delete</button></p>)}
            {newFilter.length !== 0 && newFilter.map(person=><p key={person.name}>{person.name} {person.number}<button onClick = {()=>handleDelete(person)}>delete</button></p>)}
        </div>
    )
}

export default Persons