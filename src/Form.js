import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const Form = ({ type }) => {
  const initialData = {
    username: '',
    password: '', 
    firstName: '',
    lastName: '',
    email: ''
  }
  
  const [formData, setFormData] = useState(initialData);
  const isSignup = type === 'signup' ? true : false;
  const { signup, login } = useOutletContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({...data, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
        if (Object.values(formData).every((val) => val)) {
          signup(formData);
        }
    } else {
      if (formData.username && formData.password){
        login(formData)
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input 
          id='username'
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password:</label>
        <input 
          id='password'
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
        />
        {isSignup && <>
          <label htmlFor='firstName'>First name:</label>
          <input 
            id='firstName'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            />
          <label htmlFor='lastName'>Last name:</label>
          <input 
            id='lastName'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            />
          <label htmlFor='email'>Email:</label>
          <input 
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            />
        </>}
        <button>{isSignup ? 'Register' : "Login"}</button>
      </form>
    </div>
  )
}

export default Form;