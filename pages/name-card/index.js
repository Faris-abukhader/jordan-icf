import { useState } from 'react'
import QRCode from "react-qr-code";
import { sign } from 'jsonwebtoken';
import { uid } from 'uid';
export default function Id() {
  const [name, setName] = useState('')
  const [show,setShow] = useState(false)
  const [value,setValue] = useState('')
  const url = 'https://faris-abukhader.github.io/jordan-icf/name-card/download?token='
  //'https://faris-abukhader.github.io/jordan-icf/name-card/download?token='
  //'http://localhost:3000/name-card/download?token='

  const createCard = ()=>{
    const token = sign({name:name,id:uid(16)},'1234')
    setValue(url+token)
    setShow(true)
    console.log('url'+token)
  }
  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
     <div className='w-full sm:w-1/2'>
      {!show &&<div className='w-full flex justify-center gap-3 p-10 sm:p-20'>
      <input value={name} onChange={(e)=>setName(e.target.value)} className={"flex h-10 w-full  sm:max-w-2xl rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-black"} />
      <button onClick={createCard} className='bg-black text-white hover:bg-primary/90 h-10 py-2 px-4 rounded-md'>confirm</button>
      </div>}
      {show && <div className='w-full flex justify-center'><QRCode onDoubleClick={()=>setShow(false)} value={value} /></div> }
      </div>
    </div>
  )
}