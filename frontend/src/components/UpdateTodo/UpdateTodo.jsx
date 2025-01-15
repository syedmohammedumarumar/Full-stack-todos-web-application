import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'


const UpdateTodo = () => {
    const navigate=useNavigate();

    const todos={
        title:"",
        description:""
    }
    const {id}= useParams()
    const [todoData, setTodoData] = useState(todos)

    const inputHandler = (e) => {
        const {name,value}=e.target;
        setTodoData({...todoData, [name]:value})
        
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/readone/${id}`);
                setTodoData(response.data);
            } catch (error) {
                console.error("Error fetching todo:", error);
            }
        };
    
        fetchData();
    }, [id]);
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`, todoData).then((response)=>{
            toast.success(response.data.message, {position:"top-right"})
            navigate('/')
        }).catch(error=>console.log(error))
    };

  return (
    <div className="add-todo-container">
    <h1 className="heading">Edit Todo</h1>
    <form className="todo-form" onSubmit={handleSubmit} >
    <Link to={'/'}>Back</Link>

        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                name='title'
                value={todoData.title}
                onChange={inputHandler}
                placeholder="Enter todo title" 
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name='description'
                onChange={inputHandler}
                placeholder="Enter todo description"
                value={todoData.description}
                rows="4"
                required
            ></textarea>
        </div>
        <button type="submit" className="submit-button">Update Todo</button>
    </form>
</div>
  )
}

export default UpdateTodo
