import React, { useState, useContext } from 'react'
import PersonalDetail from './preview/forms/PersonalDetail'
import { Button } from '../../../../components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './preview/forms/Summery'


import Education from './preview/forms/Education'
import Skills from './preview/forms/Skills'
import Experience from './preview/forms/Experience'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from './preview/ThemeColor'



function FormSection() {
  const [activeFoemIndex, setActiveFoemIndex] = useContext(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeId } = useParams();
  return (
    <div>

      <div className=' flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
        <Button><Home/></Button> </Link>
          <ThemeColor/>
          </div>
        <div className='flex gap-2'>
          {activeFoemIndex > 1
            && <Button size="sm"
              onClick={() => setActiveFoemIndex(activeFoemIndex - 1)}> <ArrowLeft /></Button>}
          <Button
            disabled={ !enableNext}
            className="flex gap-2 " size="sm"
            onClick={() => setActiveFoemIndex(activeFoemIndex + 1)}>Next <ArrowRight /></Button></div>
      </div>
      {/* Personal Detail */}
      {activeFoemIndex == 1 ?
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
        :activeFoemIndex == 2 ?
          <Summery enableNext={(v) => setEnableNext(v)} />
          : activeFoemIndex == 3 ?
            
            <Experience/>
            : activeFoemIndex == 4 ?
              <Education />
              : activeFoemIndex == 5 ?
                <Skills /> 
                : activeFoemIndex == 6 ?
                  <Navigate to={'/my-resume/'+resumeId+"/view"}/>
            
            : null}
       

      {/* Experience */}

      {/* Educational Detail */}

      {/* Skill */}
    </div>
  )
} 

export default FormSection  
