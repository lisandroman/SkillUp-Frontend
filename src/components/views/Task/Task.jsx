
import React, { useEffect, useState } from 'react'

import { useResize } from '../../../hooks/useResize'
import { Header } from '../../Header/Header'
import { Card } from '../../Card/Card'
import { TaskForm } from '../../TaskForm/TaskForm'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import debounce from "lodash.debounce"

import './Task.styles.css'

const { REACT_APP_API_ENDPOINT } = process.env


export const Task = () => {

  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasksFrom, setTasksFrom] = useState("ALL");
  const [search, setSearch] = useState("");
  const { isPhone } = useResize();

  useEffect(() => {
    setLoading(true);
    fetch(`https://goscrum-api.alkemy.org/task${tasksFrom === 'ME' ? "/me" : ""}`, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem('token'),
     },
    })
    .then( (response) => response.json() )
    .then( (data) => {
      setList(data.result)
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    } )
  },[tasksFrom])

  useEffect(() => {
   if(search) 
    setRenderList(list.filter(data=>data.title.startsWith(search)))
    else setRenderList(list)
  },[search])
  
  const limitString = (str) => {
    if (str.length > 370)
      return { string: str.slice(0, 250).concat("..."), addButton: true }
    return { string: str, addButton: false }
  }

  const renderAllCards = () => {
    return renderList?.map(data => <Card key={data._id} data={data} />)
  }

  const renderColumnCards = (text) => {
    return renderList?.filter((data) => data.status === text) 
    .map(data =>
      <Card key={data._id} data={data} />
    )
  }

  const handleChangeImportance = (event) => {
    if(event.currentTarget.value === "ALL") setRenderList(list)
    else
    setRenderList(list.filter((data) => data.importance === event.currentTarget.value))
  }
  const handleSearch = debounce((event) => {
    setSearch(event?.target?.value)
  }, 1000)

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className='wrapperList'>
          <div className="listHeader">
            <h2>My Tasks</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                onChange={ (event)=>{setTasksFrom(event.currentTarget.value)} }  
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="All"
                />
                  <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="My tasks"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input 
                type="text" 
                placeholder='Search by title...'
                onChange={handleSearch}
              />
            </div>
            <select name="importance" onChange={handleChangeImportance} >
              <option value="">Select a priority</option>
              <option value="ALL">ALL</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGHT">HIGHT</option>
            </select>
          </div>

          {isPhone
            ? !renderList?.length 
              ? ( <div>No task...</div> )
              : loading 
                ? (
                  <>
                    <Skeleton height={90}/> 
                    <Skeleton height={90}/> 
                    <Skeleton height={90}/> 
                  </>
                  )
                : ( <div className="list phone"> {renderAllCards()} </div> )
            : (
              <div className="groupList">
                {!renderList?.length
                  ? ( <div>No task...</div> )
                  : loading ? <Skeleton /> : (
                    <>
                      <div className="list">
                        <h4>News</h4>
                        {renderColumnCards("NEW")}
                      </div>

                      <div className="list">
                        <h4>In Progress</h4>
                        {renderColumnCards("IN PROGRESS")}
                      </div>
                      <div className="list">
                        <h4>Finished</h4>
                        {renderColumnCards("FINISHED")}
                      </div>
                    </>
                    )
                }
              </div>
            )
          }
        </section>
      </main>
    </>
  )
}

