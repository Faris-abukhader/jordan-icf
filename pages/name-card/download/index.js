import { useCallback, useEffect, useRef, useState,createRef } from 'react'
import { toBlob } from 'html-to-image';
import { useRouter } from 'next/router';
import { verify } from 'jsonwebtoken';
import { saveAs } from 'file-saver';
import { useScreenshot } from 'use-react-screenshot'

export default function Download() {
    // const ref = useRef(null)
    const { query,isReady } = useRouter()
    const [name, setName] = useState('name')
    const [id, setId] = useState('')
    const ref = createRef(null)
    const [image, takeScreenshot] = useScreenshot()
    const getImage = () => {

        const link = document.createElement('a')
        link.download = `${id}_${new Date().getMilliseconds()}.jpeg`
        link.href = image
        link.click()

        takeScreenshot(ref.current)
    }

  


    const decodeToken = () => {

        const queryParams = new URLSearchParams(window.location.search)
        const token = queryParams.get("token")

        console.log(token)

        const decoded = verify(token,'PXi5d+qZ+MHggf6L2N8GOAeH+eAdrGz5FfZxx0fxCo8=');

        console.log(decoded)

        verify(token, 'PXi5d+qZ+MHggf6L2N8GOAeH+eAdrGz5FfZxx0fxCo8=', function (err, decoded) {

            console.log(decoded)
            if (!err) {
                setName(decoded.name)
                setId(decoded.id)
            }
        });

    }

    useEffect(() => {
        if(isReady){
            decodeToken()
        }
    }, [isReady])

    const saveImage = useCallback(() => {

        if (ref.current === null) return


        getImage()

        


        // toJpeg(ref.current, { cacheBust: true, })
        //     .then((dataUrl) => {
        //         const link = document.createElement('a')
        //         link.download = `${id}_${new Date().getMilliseconds()}.jpeg`
        //         link.href = dataUrl
        //         link.click()
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })


        // toBlob(ref.current)
        //     .then(function (blob) {
        //         if (window.saveAs) {
        //             window.saveAs(blob, `${id}_${new Date().getMilliseconds()}.jpeg`);
        //         } else {
        //             saveAs(blob, `${id}_${new Date().getMilliseconds()}.jpeg`);
        //         }
        //     });


    }, [ref])

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