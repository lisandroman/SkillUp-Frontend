import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'

import './TaskForm.styles.css'
import 'react-toastify/dist/ReactToastify.css'

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export const TaskForm = () => {

  const initialValues = {
    title: '',
    status: '',
    importance: '',
    description: '',
  }

  const onSubmit = () => {
    // fetch(`${API_ENDPOINT}task`, {
    fetch('https://goscrum-api.alkemy.org/task', {
      method: 'POST',
      headers: { 'Content-Type':'application/json',
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({task: values}),
    })
    .then(response => response.json())
    .then(data => {
      resetForm()
      toast("Task created successfully!")

    })
  }

  const required = ('* Required field...')

  const validationSchema = () =>
    Yup.object().shape({
      title: Yup.string()
        .min(6, "Please enter a title with more than 6 character")
        .required(required),
      status: Yup.string().required(required),
      importance: Yup.string().required(required)
    })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const { handleSubmit, handleChange, errors, touched, handleBlur, values, resetForm } = formik

  return (
    <section className="taskForm">
      <h2>Create Task</h2>
      <p>Create your task...</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              className={ errors .title ? "error" : ""}
              name="title"
              onChange={ handleChange }
              onBlur={ handleBlur }
              placeholder='Title...'
            />
            { errors.title && touched.title && <span className='errorMsg'>{errors.title}</span> }
          </div>

          <div>
            <select 
              name="status" 
              onChange={ handleChange } 
              onBlur={ handleBlur } 
              className={ errors.status ? "error" : "" }>
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="InProcess">In Process</option>
              <option value="Finished">Finished</option>
            </select>
            {errors.status && touched.status && <span className='errorMsg'>{errors.status}</span>}
          </div>
          <div>
            <select 
              name="importance" 
              onChange={ handleChange } 
              onBlur={ handleBlur } 
              className={ errors.importance ? "error" : "" }>
              <option value="">Select importance</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.importance && touched.importance && <span className='errorMsg'>{errors.importance}</span>}
          </div>

        </div>
        <div>
          <textarea 
            name="description" 
            onChange={ handleChange } 
            placeholder="Description..."
          />
        </div>
        <button type="submit">Create!</button>
      </form>
      <ToastContainer />
    </section>
  )
}
