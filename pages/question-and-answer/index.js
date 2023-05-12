import Layout, { GradientBackground } from '../../components/Layout';

import React, { useEffect, useState } from 'react'
import QuestionCard from '../../components/QuestionCard';
import { Player } from '@lottiefiles/react-lottie-player';

export default function Index() {
  const [round,setRound] = useState(3)
  const [isDone,setIsDone] = useState(false)

  useEffect(()=>{
    setRound(localStorage.getItem('answer_round')??3)
    const answerRound = localStorage.getItem('answer_rounds')
    console.log(answerRound)
    if(answerRound && answerRound==true){
      setIsDone(true)
    }
    setIsDone(localStorage.getItem('is_done'??false))
  },[])

  if(round<=0){
    return  <div className='w-full h-screen flex items-center justify-center text-center'>
      <div>
      <Player
    autoplay
    loop
    className="z-50 -translate-x-20"
    src="/lottieFiles/playing-cat.json"
    style={{ height: '500px', width: '500px' }}
    />
    <h1 className='-mt-24'>Sorry you already tried 3 times</h1>
    </div>
    </div> 
  }
  return (
    <Layout>
      {isDone?
      <Player
      autoplay
      loop
      className="pt-20 z-50"
      src="/lottieFiles/congratulations1.json"
      style={{ height: '500px', width: '500px' }}
      />
    :
    <>
    <div className='absolute bg-gray-300 text-zinc-900 right-9 dark:text-zinc-200  dark:bg-gray-700 dark:bg-opacity-25 bg-opacity-25 rounded-full w-8 h-8 text-center  flex items-center justify-center top-5'>{round}</div>
      <div className="w-full min-h-screen flex items-center justify-center p-5 sm:p-0">
        <QuestionCard setRound={setRound} setIsDone={setIsDone}/>
        <h1>{isDone}</h1>
        <h1>{round}</h1>

      </div>
      </>
    }
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  )
}
