import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../../../../../components/ui/button'
import { Textarea } from '../../../../../../components/ui/textarea'
import { ResumeInfoContest } from '../../../../../../context/ResumeinfoContext'
import GlobalApi from '../../../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { Brain } from 'lucide-react'
import { AIchatSession } from '../../../../../../../service/AIModel'
import { toast } from 'sonner'

const prompt="job title: {jobTitle} , depends on job title give me summery for my resume within 4-5 lines"

function Summery({enabledNext}) {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContest)
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState()
  useEffect(
    ()=> {
      summery&&setResumeInfo({
        ...resumeInfo,
        summery: summery
    })
    }, [summery]) 
  
  const GenerateSummeryFromAI = async () => {
    setLoading(true)
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle)
    console.log(PROMPT);
    const result = await AIchatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    
    setAiGenerateSummeryList(JSON.parse([result.response.text]))
    setLoading(false); 
  }
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true)
    
    const data = {
      data: {
        summery: summery
      }
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
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt=10 '>
      <h2 className='font-bold text-lg'>Summery </h2 >
      <p>Add Summery for your job title </p>

      <form className='mt-7' onSubmit={onSave}>
        <div className='flex justify-between items-end'>
          <label> Add Summery</label>
          <Button variant="outline" onClick={()=>GenerateSummeryFromAI()} type="button" size="sm" className="border-primary text-primary flex gap-2"> <Brain className='h4 w-4' /> Generate from AI</Button>
        </div>

        <Textarea className="mt-5" required onChange={(e) => setSummery(e.target.value)} />
        
        <div className="mt-2 flex justify-end">
        <Button type="submit"
            disabled={loading}>
          {loading?<LoaderCircle className='animate-spins'/>:'Save'}</Button>
        </div>
      </form>
      </div>
    
      { aiGeneratedSummeryList&&<div>
        <h2 className='font-bold text-lg'>Suggestions</h2>
        {aiGeneratedSummeryList.map((item, index) => {
          <div>
            <h2 className='font-bold my-1'>
              Level: {item?.exprienceLevel}
            </h2>
            <p>{ item?.summery}</p>
          </div>
        })}
      </div>}
    </div>
  )
} 

export default Summery
