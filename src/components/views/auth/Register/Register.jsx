import React, { useState } from 'react'
import  { useFormik } from 'formik'
import '../Auth.styles.css'
import { Link } from 'react-router-dom'

export const Register = () => {
  const initialValues = {
    email: '',
    password: ''
  }


  const onSubmit = () => {
    // localStorage.setItem("logged", "yes")
    alert()
  }

  const formik = useFormik({
    initialValues,
    onSubmit
  })

  const {handleSubmit, handleChange, values, errors} = formik
  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre de Usuario</label>
          <input name="userName" type="text" value={values.userName} onChange={handleChange}/>
          {formik.errors.userName && <div>{formik.errors.userName}</div>}
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" value={values.email} onChange={handleChange}/>
          {formik.errors.email && <div>{formik.errors.email}</div>}
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={values.password} onChange={handleChange}/>      
          {errors.password && <div>{errors.password}</div>}
        </div>
        <input type="hidden" name="teamID" value="9cdbd108-f924-4383-947d-8f06510dad" />

        <div>
          <label>Rol</label>
          <select name="role" value={values.role} onChange={handleChange}>
            <option value="Team Leader">Team Leader</option>
            <option value="Team Member">Team Member</option>
          </select>     
          {errors.role && <div>{errors.role}</div>}
        </div>
        <div>
          <label>Continente</label>
          <select name="continent" value={values.continent} onChange={handleChange}>
            <option value="America">América</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>     
          {errors.continent && <div>{errors.continent}</div>}
        </div>
        <div>
          <label>Región</label>
          <select name="region" value={values.region} onChange={handleChange}>
            <option value="Latam">Latam</option>
            <option value="Brasil">Brasil</option>
            <option value="America del Norte">América del Norte</option>
            <option value="Otro">Otro</option>
          </select>     
          {errors.region && <div>{errors.region}</div>}
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
