import { useCallback, useEffect, useRef, useState } from 'react'
import { toJpeg } from 'html-to-image';
import { useRouter } from 'next/router';
import { verify } from 'jsonwebtoken';
export default function Download() {
    const ref = useRef(null)
    const {query,push} = useRouter()
    const [name,setName] = useState('')
    const [id,setId] = useState('')

    const decodeToken = ()=>{
        console.log(query.token)
        if(!query.token)return
        const obj = verify(String(query.token),'not_really_important_secret')
        setName(obj.name)
        setId(obj.id)
    }

    useEffect(()=>{
       decodeToken()
    },[query])

    const saveImage = useCallback(() => {

        if (ref.current === null) return


        toJpeg(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${id}_${new Date().getMilliseconds()}.jpeg`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    if (!query.token)return null

    return (
        <div className='w-full relative bg-white text-huge font-arabic h-screen flex items-center justify-center'>
            <div className=''>
                <div ref={ref} className="text-center w-[800px] h-[800px] text-6xl text-transparent text-blue-800 flex items-center justify-center p-5">
                    {name}
                </div>
                <button onClick={saveImage} className=' absolute top-24 left-1/2 -translate-x-1/2 text-sm bg-black p-3 rounded-md text-white font-sans hover:scale-105'>download</button>
            </div>
        </div>
    )
}