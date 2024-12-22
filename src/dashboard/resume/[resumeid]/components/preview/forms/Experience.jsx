import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../../components/ui/input'
import { Button } from '../../../../../../components/ui/button'
import RichTextEditor from '../../RichTextEditor'
import { ResumeInfoContest } from '../../../../../../context/ResumeinfoContext'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../../../service/GlobalApi'
import { toast } from 'sonner'



const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '', 
  workSummery:''
}
function Experience() {
  const [experienceList, setExperiencList] = useState([
    formField
  ]);   
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo&&setExperiencList(resumeInfo.Experience)
  },[resumeInfo])
  
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContest)
  
  

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperiencList(newEntries);
  }
  const AddNewExperience = () => {
    setExperiencList([
      ...experienceList,
      formField
    ])
  }  
  const RemoveExperience = () => {
    setExperiencList(
      experienceList=>experienceList.slice(0,-1)
      
    )
  }
  const handleRichTextEditor = (e,name,index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperiencList(newEntries);
    
  }
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience:experienceList

    })
  }, [experienceList]);
  
  const onSave = () => {
    setLoading(true) 
    const data = {
      data: {
        Experience:experienceList.map(({id, ...rest})=>rest)
      }
    }
  }
  GlobalApi.UpdateResumeDetail( params?.resumeId, data ).then(res => {
    console.log(res);
    setLoading(false);
    toast('Details updated !')
  }, (error) => {
    setLoading(false);
  })
  
  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt=10 '>
      <h2 className='font-bold text-lg'>Personal Detail </h2 >
        <p>Add our previous job experience</p>
        <div>
          {experienceList.map((itam, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg ' >
                <div>
                  <label className=''>Position Title</label>
                  <Input name="title" onChange={(event) => handleChange(index, event)}
                    defaultValue={item.title} /> 
                </div>
                <div>
                  <label className=''>Company Name</label>
                  <Input name="companyName" onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.companyName}/>
                </div>
                <div>
                  <label className=''>City</label>
                  <Input name="city" onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.city}/>
                </div>
                <div>
                  <label className=''>State</label>
                  <Input name="state" onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.state}/>
                </div>
                <div>
                  <label className=''>Start Date</label> 
                  <Input type="startDate" name="title" onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.startDate}/>
                </div>
                <div>
                  <label className=''>End Date</label>
                  <Input type="endDate" name="title" onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.endDate}/>
                </div>
               

                <div className='col-span-2'>
                  {/*work Summery*/}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
          <Button varient="outline"
              onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button varient="outline"
              onClick={RemoveExperience} className="text-primary"> - Remove </Button>
          </div>
          
          <Button disabled={loading} onClick={()=>onSave()}>{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
        </div>
      </div>
    </div>
  ) 
}

export default Experience  
 