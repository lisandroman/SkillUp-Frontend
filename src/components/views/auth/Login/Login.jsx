import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import "../Auth.styles.css"
import Swal from 'sweetalert2'

const { REACT_APP_API_ENDPOINT } = process.env
export const Login = () => {

  const navigate = useNavigate()
  const initialValues = {
    userName: '',
    password: ''
  }

  const onSubmit = () => {
    const { userName, password } = values

    fetch(`https://goscrum-api.alkemy.org/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName, password
      }),
    })
      .then(response => response.json())
      .then(data => {
        if(data.status_code === 200) {
          localStorage.setItem("logged", data?.result?.token)
          navigate("/", { replace: true })
        } else {
          Swal.fire({
            title: "Credentials Error",
            text: "Enter valid credentials",
            confirmButtonText: "Accept",
            width: "400px",
            timer: 10000,
            timerProgressBar: true,
          })
        }
      })
  }

  const required = ('* Required field...')

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string().min(4, 'Please enter at least 4 characters').required(required),
      password: Yup.string().required(required),
    })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = formik

  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && <div>{errors.userName}</div>}
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/register">Sign up!</Link>
        </div>
      </form>
    </div>
  )
}
