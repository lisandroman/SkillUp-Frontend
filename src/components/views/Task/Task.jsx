
import { useEffect, useState } from 'react'

import { useResize } from '../../../hooks/useResize'
import { Header } from '../../Header/Header'
import { Card } from '../../Card/Card'
import { TaskForm } from '../../TaskForm/TaskForm'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './Task.styles.css'

const { REACT_APP_API_ENDPOINT } = process.env

export const Task = () => {

  const { isPhone } = useResize();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch(`${REACT_APP_API_ENDPOINT}task`, {
      headers: { 'Content-Type':'application/json',
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    })
    .then(response => response.json())
    .then(data => {
      setList(data.result)
      setLoading(false)
    })
  }, [])
  

  const limitString = (str) => {
    if (str.length > 370)
      return { string: str.slice(0, 250).concat("..."), addButton: true }
    return { string: str, addButton: false }
  }

  const renderAllCards = () => {
    return list?.map(card =>
      <Card key={card._id} card={card} />
    )
  }
  const renderNewCards = () => {
    return list?.filter((data) => data.status === "NEW") 
    .map(card =>
      <Card key={card._id} card={card} />
    )
  }

  const renderInProgressCards = () => {
    return list?.filter((data) => data.status === "IN PROGRESS") 
    .map(card =>
      <Card key={card._id} card={card} />
    )
  }

  const renderFinishedCards = () => {
    return list?.filter((data) => data.status === "FINISHED") 
    .map(card =>
      <Card key={card._id} card={card} />
    )
  }

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className='wrapperList'>
          <div className="listHeader">
            <h2>My Tasks</h2>
          </div>
          {isPhone
            ? !list?.length 
              ? ( <div>No task...</div> )
              : loading ? <Skeleton /> : ( <div className="list phone"> {renderAllCards()} </div> )
            : (
              <div className="groupList">
                {!list?.length
                  ? ( <div>No task...</div> )
                  : loading ? <Skeleton /> : (
                    <>
                      <div className="list">
                        <h4>Nuevas</h4>
                        {renderNewCards()}
                      </div>

                      <div className="list">
                        <h4>En proceso</h4>
                        {renderInProgressCards()}
                      </div>
                      <div className="list">
                        <h4>Finalizadas</h4>
                        {renderFinishedCards()}
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
