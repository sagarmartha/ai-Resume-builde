import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import { ResumeInfoContest } from '../../../context/ResumeinfoContext';
import GlobalApi from '../../../../service/GlobalApi';

function EditResume() {
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    // console.log(params)
    GetResumeInfo()
  },[])
  
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      console.log(resp.data.data)
      setResumeInfo(resp.data.data)
    })
  }
 
  return (
    <ResumeInfoContest.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* Form Section*/}
      <FormSection />
      {/*Preview Section */}
      <ResumePreview/>
      </div>
      </ResumeInfoContest.Provider>
  )
}

export default EditResume
