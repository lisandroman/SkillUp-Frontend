import React from 'react'
import { useParams } from 'react-router-dom'

export const Registered = () => {
  const { teamID } = useParams();
  return (
    <div className="container">El Team ID de tu equipo es:</div>
  )
}
