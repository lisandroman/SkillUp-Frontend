import React from 'react'
import './TaskForm.styles.css'
import  { useFormik } from 'formik'

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

  const formik = useFormik({
    initialValues,
    onSubmit
  })

  const {handleSubmit, handleChange} = formik

  return (
    <section className="taskForm">
      <h2>Create Task</h2>
      <p>Create your task...</p>
      <form onSubmit={ handleSubmit }>
        <div>
          <div>
            <input name="title" type="text" placeholder='Title...'/>
          </div>

          <div>
            <select name="status" onChange={ handleChange }>
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="InProcess">In Process</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
          <div>
            <select name="Priority" onChange={ handleChange }>
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

        </div>
        <div>
          <textarea name="description" onChange={ handleChange } placeholder="Description..."/>
        </div>
        <button type="submit">Create!</button>
      </form>
    </section>
  )
}
