const questionList = [
    {
        question:"What is the capital of jordan?",
        answers:[
            {
                answer:'amman',
                correct:true
            },
            {
                answer:'irbid',
                correct:false
            },
            {
                answer:'jerash',
                correct:false
            },
            {
                answer:'aqaba',
                correct:false
            },
        ]
    },
    {
        question:"What is the capital of Lebanon?",
        answers:[
            {
                answer:'Faraya',
                correct:false
            },
            {
                answer:'Jerash',
                correct:false
            },
            {
                answer:'Beirut',
                correct:true
            },
            {
                answer:'Aqaba',
                correct:false
            },
        ]
    }
]

const getRandomQuestion = ()=>{
    const index = Math.floor(Math.random() * (questionList.length));
    console.log(index)
    return questionList[index]
}

export default getRandomQuestion;