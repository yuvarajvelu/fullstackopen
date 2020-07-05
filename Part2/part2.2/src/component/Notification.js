import React from 'react'

const Notification = ({message}) => {
    const notificationOkStyle = {
        color: 'green',
        borderStyle : 'solid',
        borderRadius : 5,
        padding : 10,
        fontSize : 20,
        background: 'lightgrey'
    }
    const notificationDeleteStyle = {
        color: 'red',
        borderStyle : 'solid',
        borderRadius : 5,
        padding : 10,
        fontSize : 20,
        background: 'lightgrey'
    }
    if(message === null) {
        return null;
    } else {
        return (
            <div style = {message.search(/deleted/)>=0 ?notificationDeleteStyle: notificationOkStyle}>
                {message}
            </div>
        )
    }
}

export default Notification