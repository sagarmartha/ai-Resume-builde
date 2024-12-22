
import React, { useContext, useEffect, useState } from 'react'

import { Input } from '../../../../../../components/ui/input'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '../../../../../../components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContest } from '../../../../../../context/ResumeinfoContext'
// import { data, data } from 'autoprefixer'
import GlobalApi from '../../../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {
  const [skillsList, setSkillsList] = useState([{
    name: '',
    rating:0
  }])

  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContest);

  useEffect(() => {
      resumeInfo&&setSkillsList(resumeInfo?.skills)
  }, [])
  
  const handleChange=(index,name,value) => {
    const newEntries = skillsList.slice();
    
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  }
  const AddNewSkills = () => {
    setSkillsList([...skillsList,
      {
        name: '',
        rating: 0
      }])
  }
  
  const RemoveSkills = () => {
    setSkillsList(
      skillsList=>skillsList.slice( 0,-1))
    }
  
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills:skillsList.map(({id, ...rest})=>rest)
      }
    }
    GlobalApi.UpdateResumeDetail(resumeId, data).then(resp => {
      console.log(resp);
      setLoading(false);
      toast('Dtails updated !')
    }, (error) => {
      setLoading(false);
      toast('Server Error,Try again');
    }
    )  
  }
    

useEffect(() => {
  setResumeInfo({
    ...resumeInfo,
    skills:skillsList
    })
  },[skillsList])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt=10 '>
      <h2 className='font-bold text-lg'>Skills </h2 >
        <p>Add Your top professional skills</p>
       
      <div>
        {skillsList.map((item, index) => (
          <div className='flex justify-between border mb-2 rounded-lg p-3   '>
            <div>
              <label className='test-xs'>Name</label>
              <Input className="w-full"
                defaultaValue={item.name}
                onChnage={(e) => handleChange(index, 'name ', e.target.value)} />
            </div>
            <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v)=>handleChange(index,'rating ', v)} />
          </div>

        ))}
        <div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
          <Button varient="outline"
              onClick={AddNewSkills} className="text-primary"> + Add More Skills</Button>
            <Button varient="outline"
              onClick={RemoveSkills} className="text-primary"> - Remove </Button>
          </div>
          
          <Button disabled={loading} onClick={()=>onSave()}>{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Skills 
