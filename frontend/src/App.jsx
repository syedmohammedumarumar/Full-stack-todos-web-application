import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GetTodo from './components/GetTodo/GetTodo'
import AddTodo from './components/AddTodo/AddTodo'
import UpdateTodo from './components/updateTodo/UpdateTodo'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GetTodo/>}/>
        <Route path='/add' element={<AddTodo/>}/>
        <Route path='/edit/:id' element={<UpdateTodo/>}/>
      </Routes>
    </div>
  )
}

export default App
