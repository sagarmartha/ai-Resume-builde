import React, { useEffect, useState } from 'react'
import AddResuma from './components/AddResuma'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi';
import ResumeCardltem from './components/ResumeCardltem';

function Dashboard() {

  const { user } = useUser();
  const [resumeList, setResumelist] = useState([]); 
  useEffect(() => {
    user&&GetResumeList()
  }, [user])
  

  /**
   * user to Get Users Resumelist
   */
  const GetResumeList = () => {
    GlobalApi.GetUserReumes(user?.primaryEmailAddress?.emailAddress).then(resp => {
      // console.log(resp.data);
      setResumelist(resp.data.data)

    })
  }
  return (
    <div>
      <div className='p-10 md:px-20 lg:px-32'> 
        <h2 className='font-bold text-3xl'>My Resuma</h2>
        <p>Start Creating AI resume to your next job role</p>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
          <AddResuma />
          {resumeList.length > 0 ? resumeList.map((resume, index) => (

            <ResumeCardltem resume={resume} key={index} refreshData={GetResumeList } />
          )):
            [1, 2, 3, 4].map((item, index) => (
          <div className='h-[200px] rounded-lg bg-slate-200 animate-pulse' key={index}></div>
          ))
          
          }
        </div>
      </div>
    </div>
  )
}
export default Dashboard