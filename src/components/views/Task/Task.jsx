
import './Task.styles.css'
import { useResize } from '../../../hooks/useResize'
import { Header } from '../../Header/Header'
import { cardsData } from './data'
import { Card } from '../../Card/Card'
import { TaskForm } from '../../TaskForm/TaskForm'

export const Task = () => {

  const { isPhone } = useResize();

  const limitString = (str) => {
    if (str.length > 370)
      return { string: str.slice(0, 250).concat("..."), addButton: true }
    return { string: str, addButton: false }
  }

  const renderAllCards = () => {
    return cardsData.map(card =>
      <Card key={card.id} card={card} />
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
            ? (
              <div className="list phone">
                {renderAllCards()}
              </div>
              )
            : (
              <div className="groupList">
                <div className="list">
                  <h4>Nuevas</h4>
                  <div className="card">
                    <div className="close">x</div>
                    <h3>Tarea 1</h3>
                    <h6>15/07/2022 16.40hs</h6>
                    <h5>Lisandro Mansilla</h5>
                    <button type="button">Nueva</button>
                    <button type="button">Baja</button>
                    <p>{limitString(`
                      Contrary to popular belief, Lorem Ipsum is not simply random text.
                      It has roots in a piece of classical Latin literature from 45 BC,
                      making it over 2000 years old. Richard McClintock, a Latin professor
                      at Hampden-Sydney College in Virginia, looked up one of the more obscure
                      Latin words, consectetur, from a Lorem Ipsum passage, and going through
                      the cites of the word in classical literature, discovered the 
                      undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 
                      1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good 
                      and Evil) by Cicero, written in 45 BC. This book is a treatise 
                      on the theory of ethics, very popular during the Renaissance.
                      The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", 
                      comes from a line in section 1.10.32.
                      The standard chunk of Lorem Ipsum used since the 1500s is reproduced 
                      below for those interested. Sections 1.10.32 and 1.10.33 from "de
                      Finibus Bonorum et Malorum" by Cicero are also reproduced in their
                      exact original form, accompanied by English versions from the 1914 
                      translation by H. Rackham.
                      `).string}
                    </p>
                  </div>
                </div>
                <div className="list">
                  <h4>En proceso</h4>
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
                <div className="list">
                  <h4>Finalizadas</h4>
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
              </div>
            )
          }
        </section>
      </main>
    </>
  )
}
