import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough,  BtnUnderline, Editor, EditorProvider, Separator } from 'react-simple-wysiwyg'
import { Button } from '../../../../components/ui/button'
import { Brain, LoaderCircle } from 'lucide-react'
import { ResumeInfoContest } from '../../../../context/ResumeinfoContext'
import { toast } from 'sonner'
import { AIchatSession } from '../../../../../service/AIModel'
const PROMPT='position titile: {positionTitle}, Depends on position title give me experience in resume, give me result in HTML format'
function RichTextEditor({onRichTextEditorChange,index,defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContest);
  const [loading, setLoading] = useState(false); 
  const GenerateSummeryFromAI = async () => {
    setLoading(true)
    if (!resumeInfo.experience[index].title) 
    { 
      toast('Please Add Position Title'); 
      return;    

    }
    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title)
    const result = await AIchatSession.sendMessage(PROMPT);
    console.log((result.response.text()));
    const resp=result.response.text()
    setValue(resp.replace('[','').replace(']',''));
    setLoading(false);
    
  }
  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm"
          onClick={GenerateSummeryFromAI}
          className="flex gap-2 border-primary text-primary  ">
          {loading ? <LoaderCircle className='animate-spin'/>:
            <>
              <Brain className='h-2 w-4' />Generater from AI
            </>
          }
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(onChange) => {
          setValue(e.target.value)
          onRichTextEditorChange(e)
        }}>
          <Toolbar>
          <BtnBold/>
            <BtnItalic/>
            <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          
          
        </Toolbar>
        </Editor>
        </EditorProvider>
    </div>
  ) 
}

export default RichTextEditor
