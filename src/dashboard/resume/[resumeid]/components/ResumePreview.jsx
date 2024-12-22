import React, { useContext } from 'react'
import { ResumeInfoContest } from '../../../../context/ResumeinfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillPreview from './preview/SkillPreview'

function ResumePreview() {

  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContest)

  console.log('log in resume ', resumeInfo);
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px] ' style={{
      borderColor:resumeInfo?.themeColor
    }}>
      {/* Personal Detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/*Summery */}
      <SummeryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo}/>
      {/* Education  */}
      <EducationalPreview resumeInfo={ resumeInfo} />
      {/* Skiless */}
        <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
