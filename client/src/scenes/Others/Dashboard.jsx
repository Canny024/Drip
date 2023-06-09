import React from 'react'
import Topbar from '../Globals/Topbar'
import SideBar from '../Globals/SideBar'

export default function Dashboard() {
  return (
    <>
      <SideBar  /> 
          <main className="content">
            <Topbar  />
            
          </main>
    </>
  )
}
