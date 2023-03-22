import React from 'react'
import Users from '../user/admin/Users'

const Dashboard = ({notify}) => {
  return (
    <>
    <Users notify={notify}/>
    </>
  )
}

export default Dashboard