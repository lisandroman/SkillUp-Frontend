import React, { useEffect, useState } from 'react'
import  { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import {v4 as uuidv4} from 'uuid'

import { FormControlLabel, Switch } from '@mui/material'
import '../Auth.styles.css'

const { REACT_APP_API_ENDPOINT } = process.env
export const Register = () => {

  const [data, setData] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://goscrum-api.alkemy.org/auth/data`)
      .then(response => response.json())
      .then(data => setData(data.result))
  },[])

  console.log({data})

  const initialValues = {
    userName: '',
    password: '',
    email: '',
    teamID: '',
    role: '',
    continent: '',
    region: '',
    switch: false,
  }

  const required = ('* Required field...')

  const validationSchema = () => 
  Yup.object().shape({
    userName: Yup.string().min(4, 'Please enter at least 4 characters').required(required),
    password: Yup.string().required(required),
    email: Yup.string().email('Must to be a valid email address').required(required),
    // teamID: Yup.string().required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  })

  const handleChangeContinent = (value) => {
    setFieldValue('continent', value)
    if(value !== 'America') setFieldValue('region', 'Otro')
  }

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID

    fetch('https://goscrum-api.alkemy.org/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user : {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region : values.region,
        },
      }),
    })
    .then(response => response.json())
    .then(data => navigate("/registered/" + data?.result?.user?.teamID, {
      replace: true,
    }))
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  const {handleSubmit, handleChange, values, errors, touched, handleBlur, setFieldValue} = formik
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
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={()=> formik.setFieldValue("switch",!formik.values.switch)}
              name="switch"
              color="secondary"
            />
          }
          label="Perteneces a un equipo ya creado"
        />
        {values.switch && (
          <div>
            <label>Enter your Team ID</label>
            <input 
              type="text" 
              name="teamID" 
              value={values.teamID}
              onChange={handleChange}/>
          </div>
        )}

        <div>
          <label>Role</label>
          <select name="role" value={values.role} 
            onChange={handleChange} 
            onBlur={ handleBlur } 
            className={ errors.role && touched.role ? "error" : "" }>
            <option value="">Select your Role</option>
             {data?.Rol?.map(option => (
              <option value={option} key={option}>{option}</option>
             ))} 
          </select>     
          {errors.role && touched.role && (
            <span className="errorMsg">{errors.role}</span>
          )}
        </div>
        <div>
          <label>Continente</label>
          <select name="continent" value={values.continent}
              onChange={event => handleChangeContinent(event.currentTarget.value)}
              onBlur={ handleBlur } 
              className={ errors.continent && touched.continent ? "error" : "" }>
            <option value="">Select Continent</option>
            {data?.continente?.map(option => (
              <option value={option} key={option}>{option}</option>
             ))} 
          </select>     
          {errors.continent && touched.continent && (
            <span className="errorMsg">{errors.continent}</span>
          )}
        </div>
          {values.continent === "America" && (
            <div>
              <label>Región</label>
              <select name="region" value={values.region} 
                onChange={handleChange} 
                className={ errors.region && touched.region ? "error" : "" }>
                <option value="">Select Region</option>
                {data?.region?.map(option => (
                  <option value={option} key={option}>{option}</option>
                  ))} 
              </select>     
                {errors.region && touched.region && (
                  <span className="errorMsg">{errors.region}</span>
              )}
            </div>
          )}
       
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
