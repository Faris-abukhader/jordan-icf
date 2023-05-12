import React, { useEffect, useState } from 'react'
import questionList from '../utils/questions'
export default function QuestionCard({setRound,setIsDone}) {
    const [question,setQuestion] = useState(null)
    const [showError,setShowError] = useState(true)

    useEffect(()=>{
       setQuestion(questionList())
       if(showError){
        setTimeout(()=>{
            setShowError(false)
        },2000)
       }
    },[showError])

    const handleAnswer = (answer)=>{
        const answerRound = localStorage.getItem('answer_round')
        console.log(answerRound)
        setRound(answerRound-1)
        localStorage.setItem('answer_round',Number(answerRound)-1)
       
        if(answer.correct){
            console.log('correct')
            localStorage.setItem('is_done',true)
            setIsDone(true)
        }else{
            console.log('wrong')
            setShowError(true)
        }
    }
  return (
    <div className='border border-zinc-200 dark:border-zinc-500 bg-gray-50 bg-opacity-10 shadow-md w-full py-20  h-fit rounded-2xl text-center'>
        <h1>{question?.question}</h1>
        <ul className='grid grid-cols-2 gap-4 justify-between p-2 py-7'>
            {question && question.answers && question.answers.map((answer,index)=>(
               <button onClick={()=>handleAnswer(answer)} key={index} className=' bg-pink-400 hover:scale-105 hover:font-bold shadow-sm text-zinc-900 dark:hover:scale-105 dark:text-gray-50 dark:shadow-md dark:bg-opacity-20 dark:bg-purple-600  bg-opacity-10  p-2 rounded-lg'>{answer.answer}</button>
            ))}
        </ul>
        {showError && <p className='text-sm text-red-600'>your answer is not correct 你的答案不对。</p>}
    </div>
  )
}
