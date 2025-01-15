import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './GetTodo.css'
import axios from 'axios'
import toast from 'react-hot-toast'
const GetTodo = () => {

    const [todoData, setTodoData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/read');
                setTodoData(response.data.reverse()); // Correct usage of response.data
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchData();
    }, []); // Add dependency array to ensure this runs only once

    const deleteTodo = async(todoId) => {
        await axios.delete(`http://localhost:8000/api/delete/${todoId}`).then((response)=>{
            setTodoData((prevTodo)=>prevTodo.filter((todoData)=>todoData._id!==todoId))
            toast.success(response.data.message,{position:"top-right"})
        }).catch((error)=> console.log(error));
    }


    return (
        <div>
            <div className="container">
                <h1 className='heading'>Todo list</h1>
                <Link to={'/add'}>Add Todo <i className="ri-add-line"></i></Link>
                {
                    todoData.map((todo, index) => {
                        return (
                            <div className="todo-container" key={todo._id}>
                                <div className="title-container">
                                    <h3>{todo.title}</h3>
                                    <div className="btns">
                                        <h4><Link to={`/edit/`+todo._id}><i className="ri-edit-line"></i></Link></h4>
                                        <h4 onClick={()=>deleteTodo(todo._id)}><i className="ri-delete-bin-line"></i></h4>
                                    </div>
                                </div>
                                <hr />
                                <p>{todo.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GetTodo
