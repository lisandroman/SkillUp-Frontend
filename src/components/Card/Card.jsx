import React from 'react'

export const Card = ({ data: {title, createdAt, status, user:{ userName}, description, type, importance} }) => { 
  return (
    <div>
      <div className="card">
        <div className="close">x</div>
        <h3>{ title }</h3>
        <h6>{ createdAt }</h6>
        <h5>{ userName }</h5>
        <button type="button">{ status.toLowerCase() }</button>
        <button type="button">{ importance.toLowerCase() }</button>
        <p>{ description }</p>
      </div>
    </div>
  )
}


