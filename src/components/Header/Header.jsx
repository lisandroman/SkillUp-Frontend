import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Header.styles.css"

export const Header = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("logged")
    localStorage.removeItem("userName")
    navigate("/login", {replace:true})
  }

  return (
    <header>
      <span>Go Scrum!</span>
      <div className="wrapperRightHeader">
        <div>{localStorage.getItem("userName")}</div>
      <div onClick={handleLogout}>X</div>
      </div>
    </header>
  )
}
