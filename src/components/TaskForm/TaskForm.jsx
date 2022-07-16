import React from 'react'
import './TaskForm.styles.css'
import  { useFormik } from 'formik'
import * as Yup from 'yup'

export const TaskForm = () => {

  const initialValues = {
    title: '',
    status: '',
    priority: '',
    description: '',
  }

  const onSubmit = () => {
    alert()
  }

  const required = ('* Required field...')

  const validationSchema = () => 
    Yup.object().shape({
      title: Yup.string()
        .min(6, "Please enter a title with more than 6 character")
        .required(required),
      status: Yup.string().required(required),
      priority: Yup.string().required(required)
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const {handleSubmit, handleChange, errors} = formik

  return (
    <section className="taskForm">
      <h2>Create Task</h2>
      <p>Create your task...</p>
      <form onSubmit={ handleSubmit }>
        <div>
          <div>
            <input name="title" placeholder='Title...'onChange={handleChange}/>
          </div>
          {errors.title && <span>{errors.title}</span>}

          <div>
            <select name="status" onChange={ handleChange }>
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="InProcess">In Process</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
          {errors.status && <span>{errors.status}</span>}
          <div>
            <select name="priority" onChange={ handleChange }>
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          {errors.priority && <span>{errors.priority}</span>}

        </div>
        <div>
          <textarea name="description" onChange={ handleChange } placeholder="Description..."/>
        </div>
        <button type="submit">Create!</button>
      </form>
    </section>
  )
}
