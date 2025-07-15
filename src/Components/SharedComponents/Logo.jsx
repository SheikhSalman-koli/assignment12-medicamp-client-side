import React from 'react'
import logo from '../../assets/logo.jpg'

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={logo}
        alt="CareBridge Logo"
        className="w-10 h-10 rounded-full shadow-lg border-2"
      />
      <span className="text-xl font-bold text-primary">MediCamp</span>
    </div>
  )
}

export default Logo
