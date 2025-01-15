import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddTodo.css';
import axios from 'axios'
import toast from 'react-hot-toast';


const AddTodo = () => {


    const navigate= useNavigate();
    // State to store form data
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    // Handler to update state and log input changes
    const inputHandler = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event
        setFormData({
            ...formData, // Preserve other fields
            [name]: value, // Update the specific field
        });

    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post(https://todo-web-app-mskh.onrender.com/api/create", formData).then((response)=>{
            toast.success(response.data.message, {position:"top-right"})
            navigate('/')
        }).catch(error=>console.log(error))
    };

    return (
        <div className="add-todo-container">
            <h1 className="heading">Add Todo</h1>
            <form className="todo-form" onSubmit={handleSubmit}>
            <Link to="/" className="back-button">
                Back
            </Link>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={inputHandler}
                        placeholder="Enter todo title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={inputHandler}
                        placeholder="Enter todo description"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">
                    Add Todo
                </button>
            </form>
           
        </div>
    );
};

export default AddTodo;
