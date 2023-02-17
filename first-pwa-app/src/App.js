import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {withServiceWorkerUpdater,} from '@3m1/service-worker-updater'


const App =(props)=> {

  const {newServiceWorkerDetected, onLoadNewServiceWorkerAccept}=props

  const [newItem, setNewItem] = useState("");
  const [listaCompras, setListaCompras] = useState([])

  const handleChange=(e)=>{
    setNewItem(e.target.value);
  }

  const agregar = ()=>{
    setListaCompras([...listaCompras,newItem]);
    setNewItem("")
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Lista de la compra V9</h1>
      {newServiceWorkerDetected && (
      <div style={{backgroundColor: "red"}}>
        <h3>Nueva actualizacion!</h3>
        <button onClick={onLoadNewServiceWorkerAccept}>Actualizar!</button> 
      </div>
      )}
      <input type="text" onChange={(e)=>handleChange(e)} onKeyDown={(e)=>e.key === "Enter" && agregar()} value={newItem}></input>
      <button onClick={agregar} >Agregar</button>
      <ul>
      {listaCompras.map((element,index)=>
      (
        <li key={index}>{element}</li>
      ))}
        
      </ul>
      </header>
    </div>
  );
}

export default withServiceWorkerUpdater(App); //Se le agrega con los elementos de service workers updater
