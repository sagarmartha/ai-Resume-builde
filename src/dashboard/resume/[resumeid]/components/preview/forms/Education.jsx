import {  LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../../components/ui/input'
import { Textarea } from '../../../../../../components/ui/textarea'
import { Button } from '../../../../../../components/ui/button'
import { ResumeInfoContest } from '../../../../../../context/ResumeinfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContest)
  const params = useParams();
  const [educationList, setEducationList] = useState([
    {
      univercityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ])
  useEffect(() => {
    resumeInfo&&setEducationList(resumeInfo?.education)
  },[])

  const handleChange = (event, index) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    educationList(newEntries);
  }
  const AddNewEducation = () => {
    setEducationList([...educationList,
    {
      univercityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
     
      
    ])
  }
  const RemoveEducation = () => {
    setEducationList
    { educationList => educationList.slice(0, -1) }
  }
  const onSave = () => {
    const data = {
      data: {
        education:educationList.map(({id, ...rest})=>rest)
      }
    }
    GlobalApi.UpdateResumeDetail(params.reumeId, data).then(resp => {
      console.log(resp);
      setLoading(false);
      toast('Details updated !')
    }, (error) => {
      setLoading(false);
      toast('Server Error,Please try again!')
    }
  )
  }
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education:educationList
    })
  },[educationList])
  return (
    
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt=10 '>
      <h2 className='font-bold text-lg'>Education</h2 >
      <p>Add Your education details</p>

      <div>
        {educationList.map((item, index) => (
          <div>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg  '>
              <div className='col-span-2'>
                <label > Univercity Name</label>
                <Input name="univercityName" onChange={(e) => handleChange(e, index)}
                  defaultValue={ item?.univercityName} />
              </div>
              <div>
                <label > Degree</label>
                <Input name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={ item?.degree}/>
              </div>
              <div>
                <label >Major</label>
                <Input name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={ item?.major}/>
              </div>
              <div>
                <label >Start Date</label>
                <Input type="date" name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={ item?.startDate}/>
              </div>
              <div>
                <label >End Date</label>
                <Input type="date" name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={ item?.endDate}
                />
              </div>
              <div className='col-span-2'>
                <label >Description</label>
                <Textarea name="description" onChange={(e) => handleChange(e, index)}
                 defaultValue={ item?.description}/>
             </div>
            </div>
            
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
          <div className='flex gap-2'>
          <Button varient="outline"
              onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
            <Button varient="outline"
              onClick={RemoveEducation} className="text-primary"> - Remove </Button>
             
          </div>
          <Button disabled={loading} onClick={()=>onSave()}>{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
        </div>
    </div>
  )
}

export default Education
