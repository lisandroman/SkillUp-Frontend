import React from 'react'
import { Header } from '../../Header/Header'
import './Task.styles.css'

export const Task = () => {
  return (
    <>
      <Header />
      <main id="tasks">
        <section className='wrapperList'>
          <div className="listHeader">
            <h2>Mis Tareas</h2>
          </div>
          <div className="list">
            <div className="card">
              <div className="close">x</div>
              <h3>Tarea 1</h3>
              <h6>15/07/2022 16.40hs</h6>
              <h5>Lisandro Mansilla</h5>
              <button type="button">Nueva</button>
              <button type="button">Baja</button>
              <p>Descripción Fake...</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
