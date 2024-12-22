import {  Loader2, LucideLoader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../../components/ui/button'
// import { Input } from 'postcss'
import { v4 as uuidv4 } from 'uuid';
import { Input } from '../../components/ui/input';
import GlobalApi from '../../../service/GlobalApi';
// import { data } from 'autoprefixer';
// import { title } from 'process';
// import { error } from 'console';
import { useNavigate } from 'react-router-dom';


function AddResuma() {
 
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle, setResumaTitle] = useState();
  const { user } = useState()
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate()
  
  const onCreate = () => {
    setOpenDialog(true)
    const uuid = uuidv4(); 
    // console.log(resumaTitle,uuid)

    const data = {
      data: {
        title: resumeTitle,
        resumeid: uuid,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName
        
        
      }
    }
    console.log(data);
 

    GlobalApi.CreateNewResume(data).then(resp => {
      console.log(resp)
      if (resp) {
        setLoading(false);
        navigation('/dashboard/resume/' + uuid + "/edit");
      }
    }, (error) => {
      setLoading(false);
    })
  }


   
  return (
    <div>
      <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h[250px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dotted'
      onClick={()=>setOpenDialog(true)}>
        <PlusSquare/>
      </div>
      <Dialog open={openDialog}>  
  
  <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input className="my-2" placeholder="Ex.full Stake resume " onChange={(e)=>setResumaTitle(e.target.value)}/>
        {/* <Input className="my-2" placeholder="Ex.full Stake resume " onChange={(e)=>setResumaTitle(e.target.value)} /> */}
            </DialogDescription> 
            <div className='flex justify-end gap-5'>
              <Button onClick={()=>setOpenDialog(false)} variant="ghost">Cancel</Button> 
               <Button
                disabled={!resumeTitle|| loading}
                onClick={() => onCreate()}>
                { loading? <LucideLoader2 className='animate-spin'/>: 'Create'}</Button>
            </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddResuma
