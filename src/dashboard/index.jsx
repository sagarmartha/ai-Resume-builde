import React from 'react'
import AddResuma from './components/AddResuma'

function Dashboard() {
  return (
    <div>
      <div className='p-10 md:px-20 lg:px-32'> 
        <h2 className='font-bold text-3xl'>My Resuma</h2>
        <p>Start Creating AI resume to your next job role</p>

        <div className='grid- grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10'> <AddResuma/> </div>
      </div>
    </div>
  )
}
export default Dashboard