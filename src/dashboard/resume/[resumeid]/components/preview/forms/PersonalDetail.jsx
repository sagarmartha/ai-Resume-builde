import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContest } from '../../../../../../context/ResumeinfoContext'
// import { Input } from 'postcss'
import { Input } from '../../../../../../components/ui/input'
import { Button } from '../../../../../../components/ui/button'
import {  useParams } from 'react-router-dom'
import GlobalApi from '../../../../../../../service/GlobalApi'

import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
 
function PersonalDetail(enabledNext) {

  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContest)
  const [formData, setFromData] = useContext(ResumeInfoContest)
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    console.log(params)
  }, [])
  
 
  const handleInputChange = (e) => {
    enabledNext(false)
    const { name, value } = e.target;

    setFromData({ 
      ...formData,
      [name]: value 

    })
    setResumeInfo({ ...resumeInfo, [name]: value });
  }
  const onSave = (e) => { 
    e.preventDefault();
    setLoading(true)
    
    const data = {
      data:formData
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp => {
      console.log(resp);
      enabledNext(true);
      setLoading(false);
      toast("Details updated")

    }, (error) => {
      setLoading(false);
    })
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt=10 '>
      <h2 className='font-bold text-lg'>Personal Detail </h2 >
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}> 
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='test-sm'>First Name</label>
            <Input name="firstName"
              defaultValue={resumeInfo?.firstName}
              required onChange={handleInputChange} />
          </div>
          <div>
            <label className='test-sm'>Last Name</label>
            <Input name="lastName "
              defaultValue={resumeInfo?.lastName}
              required onChange={handleInputChange} />
          </div>
          <div>
            <label className='col-span-2'>Job Title</label>
            <Input name="jobTitle"
              defaultValue={resumeInfo?.jobTitle}
              required onChange={handleInputChange} />
          </div>
          <div>
            <label className='test-sm'>Address</label>
            <Input name="address "
              defaultValue={resumeInfo?.address}
              required onChange={handleInputChange} />
          </div>
          <div>
            <label className='test-sm'>Phone</label>
            <Input name="phone "
              defaultValue={resumeInfo?.phone}
              required onChange={handleInputChange} />
          </div>
          <div>
            <label className='test-sm'>Email</label>
            <Input name="email "
              defaultValue={resumeInfo?.email}
              required onChange={handleInputChange} />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type="submit"
            disabled={loading}>
          {loading?<LoaderCircle className='animate-spins'/>:'Save'}</Button>
        </div>
      </form>
    </div>
  ) 
}

export default PersonalDetail
