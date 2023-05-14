import { useCallback, useEffect, useState,createRef } from 'react'
import { verify } from 'jsonwebtoken';
import { useScreenshot } from 'use-react-screenshot'
import {Player} from '@lottiefiles/react-lottie-player'

export default function Download() {
    const [name, setName] = useState('name');
    const [id, setId] = useState('');
    const ref = createRef(null);
    const [image, takeScreenshot] = useScreenshot();
    const [showLoading, setShowLoading] = useState(true);
  
    const getImage = useCallback(() => {
      takeScreenshot(ref.current).then((image) => {
        const link = document.createElement('a');
        link.download = `${id}_${new Date().getMilliseconds()}.jpeg`;
        link.href = image;
        link.click();
      });
    }, [takeScreenshot, id]);
  
    const decodeToken = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
  
      console.log(token);
      verify(token, 'PXi5d+qZ+MHggf6L2N8GOAeH+eAdrGz5FfZxx0fxCo8=', function (err, decoded) {
        console.log(decoded);
        console.log(err);
        if (!err) {
          setName(decoded.name);
          setId(decoded.id);
        }
      });
    };
  
    useEffect(() => {
      setTimeout(() => {
        decodeToken();
        setShowLoading(false);
      }, 3000);
    }, []);
  
    return (
      <>
        {showLoading ? (
          <Player
            autoplay
            loop
            className="absolute left-1/2 -translate-x-1/2 top-1/3"
            src="https://lottiefiles.com/116545-loading-cat"
            style={{ height: '300px', width: '300px' }}
          />
        ) : (
          <div
            className={`w-full ${
              showLoading ? 'hidden' : ''
            } relative font-arabic min-h-screen flex items-center justify-center`}
          >
            <div className="">
              <div
                ref={ref}
                className="text-center w-[800px] min-h-[800px] text-[100px] leading-[100px] line-clamp-2 text-green-800 flex items-center justify-center px-3"
              >
                {name}
              </div>
              <button
                onClick={getImage}
                className="absolute top-24 left-1/2 -translate-x-1/2 text-sm bg-black p-3 rounded-md text-white font-sans hover:scale-105"
              >
                download
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
  