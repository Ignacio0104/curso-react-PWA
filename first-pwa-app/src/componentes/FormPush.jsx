import axios from 'axios'
import React, { useState } from 'react'

const FormPush = () => {

    const [notification, setNotification] = useState({})

    const handleChangeText =(name,e)=>{
        setNotification({...notification,[name]: e.target.value})
    }

    const handleSubmit = async (e)=>{ 
        e.preventDefault();
        console.log(notification)
        await axios.post("http://localhost:8000/customNotification",notification)
    }

  return (
    <form>
        <input type="text" placeholder='ingrese el titulo' onChange={(e)=>handleChangeText("title",e)}></input>
        <input type="text" placeholder='ingrese el mensaje'onChange={(e)=>handleChangeText("message",e)}></input>
        <button type='submit' onClick={(e)=>handleSubmit(e)}>Enviar</button>
    </form>
  )
}

export default FormPush
