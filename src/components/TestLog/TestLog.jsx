import React from 'react';
import { useFormik } from 'formik';

const TestLog = () => {
  
  const initialValues = ({
    email : '',
    password : '',
  }) 
  
  const validate = (values) => {
    const errors = {};
    if(!values.email) errors.email = 'Email is required';
    if(!values.password) errors.password = 'Password is required';
    
    return errors
  }
  
  const onSubmit = () => {
    localStorage.setItem("Logged", "OK!")
  }
  
  const formik = useFormik({
    initialValues, validate, onSubmit
  })

  const {handleSubmit, handleChange, values, errors} = formik

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>User Login</h1>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={values.email} onChange={handleChange}/>
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={values.password} onChange={handleChange}/>
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  )
}

export default TestLog