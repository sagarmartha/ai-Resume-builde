import { PlusSquare } from 'lucide-react'
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

function AddResuma() {
 
  const [openDialog, setOpenDialog] = useState(false)
  const [resumaTitle, setResumaTitle] = useState();

  const onCreate = () => {
    const uuid = uuidv4(); 
    // console.log(resumaTitle,uuid)
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
              <Button onClick={()=>setOpenDialog(false)} vairant="ghost">Cancel</Button> 
               <Button
                disabled={!resumaTitle}
                onClick={() =>onCreate()}>Create</Button>
            </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddResuma
