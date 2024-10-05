import React, { useState } from 'react'

const Login = ({onSubmit}) => {
    const[username, setUsername] = useState("");
  return (
    <div>
        <h5>Choose a username down there</h5>
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit(username);
        }}>
            <input type='text' value={username} placeholder='username' onChange={e => setUsername(e.target.value)}/>
            <input type='submit'/>
        </form>

    </div>
  )
}

export default Login;