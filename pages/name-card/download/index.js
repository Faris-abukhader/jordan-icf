import { useCallback, useEffect, useRef, useState } from 'react'
import { toJpeg } from 'html-to-image';
import { useRouter } from 'next/router';
import { verify } from 'jsonwebtoken';
export default function Download() {
    const ref = useRef(null)
    const { query } = useRouter()
    const [name, setName] = useState('name')
    const [id, setId] = useState('')

    const decodeToken = () => {

        const queryParams = new URLSearchParams(window.location.search)
        const token = queryParams.get("token")
        console.log(token) //pizza

        verify(token, '1234', function (err, decoded) {

            if (!err) {
                console.log(decoded)
                setName(decoded.name)
                setId(decoded.id)
            }
        });

    }

    useEffect(() => {
        decodeToken()
    }, [query])

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

    useEffect(()=>{
      console.log(name)
    },[name])

    return (
        <div className='w-full relative font-arabic h-screen flex items-center justify-center'>
            <div className=''>
                <div ref={ref} className="text-center w-[800px] h-[800px] text-6xl text-blue-800 flex items-center justify-center p-5">
                    {name}
                </div>
                <button onClick={saveImage} className=' absolute top-24 left-1/2 -translate-x-1/2 text-sm bg-black p-3 rounded-md text-white font-sans hover:scale-105'>download</button>
            </div>
        </div>
    )
}