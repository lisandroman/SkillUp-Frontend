import React, { useState } from 'react'
import  { useFormik } from 'formik'
import {useNavigate} from 'react-router-dom'
import "./Login.styles.css"

export const Login = () => {
  const navigate = useNavigate()
  const initialValues = {
    email: '',
    password: ''
  }

  const validate = (values) => {
    const errors = {};
    if(!values.email) {
      errors.email = "Email es requerido"
    }
    if(!values.password) {
      errors.password = "Contraseña es requerida"
    }
    return errors;
  }

  const onSubmit = () => {
    localStorage.setItem("logged", "yes")
    navigate("/", {replace:true})
  }

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit
  })

  const {handleSubmit, handleChange, values, errors} = formik
  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
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
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  )
}
