import React, { useState } from 'react'
import  { useFormik } from 'formik'
import '../Auth.styles.css'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

export const Register = () => {
  const initialValues = {
    userName: '',
    password: '',
    email: '',
    teamID: '',
    role: '',
    continent: '',
    region: '',
  }

  const required = ('* Required field...')

  const validationSchema = () => 
  Yup.object().shape({
    userName: Yup.string().min(4, 'Please enter at least 4 characters').required(required),
    password: Yup.string().required(required),
    email: Yup.string().email('Must to be a valid email address').required(required),
    teamID: Yup.string().required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  })

  const onSubmit = () => {
    // localStorage.setItem("logged", "yes")
    alert()
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  const {handleSubmit, handleChange, values, errors, touched, handleBlur} = formik
  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div>
          <label>Nombre de Usuario</label>
          <input name="userName" type="text" value={values.userName}
            onChange={handleChange}
            onBlur={ handleBlur }
            className={ errors.userName && touched.userName ? "error" : "" }/>
            {errors.userName && touched.userName && (
            <span className="errorMsg">{errors.userName}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" value={values.email}
            onChange={handleChange}
            onBlur={ handleBlur }
            className={ errors.email && touched.email ? "error" : "" }/>
            {errors.email && touched.email && (
            <span className="errorMsg">{errors.email}</span>
          )}
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={values.password} 
            onChange={handleChange}
            onBlur={ handleBlur } 
            className={ errors.password && touched.password ? "error" : "" }/>      
            {errors.password && touched.password && (
            <span className="errorMsg">{errors.password}</span>
          )}
        </div>
        <input type="hidden" name="teamID" value="9cdbd108-f924-4383-947d-8f06510dad" />

        <div>
          <label>Rol</label>
          <select name="role" value={values.role} 
            onChange={handleChange} 
            onBlur={ handleBlur } 
            className={ errors.role && touched.role ? "error" : "" }>
            <option value="">Select your Role</option>
            <option value="Team Leader">Team Leader</option>
            <option value="Team Member">Team Member</option>
          </select>     
          {errors.role && touched.role && (
            <span className="errorMsg">{errors.role}</span>
          )}
        </div>
        <div>
          <label>Continente</label>
          <select name="continent" value={values.continent}
              onChange={handleChange}
              onBlur={ handleBlur } 
              className={ errors.continent && touched.continent ? "error" : "" }>
            <option value="">Select Continent</option>
            <option value="America">América</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>     
          {errors.continent && touched.continent && (
            <span className="errorMsg">{errors.continent}</span>
          )}
        </div>
        <div>
          <label>Región</label>
          <select name="region" value={values.region} 
            onChange={handleChange} 
            className={ errors.region && touched.region ? "error" : "" }>
            <option value="">Select Region</option>
            <option value="Latam">Latam</option>
            <option value="Brasil">Brasil</option>
            <option value="America del Norte">América del Norte</option>
            <option value="Otro">Otro</option>
          </select>     
            {errors.region && touched.region && (
            <span className="errorMsg">{errors.region}</span>
          )}
        </div>
       
        <div> 
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/login">Log in!</Link>
        </div>
      </form>
    </div>
  )
}
