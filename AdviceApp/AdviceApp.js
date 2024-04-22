import React, { useState } from 'react'
import '../AdviceApp/Advice.css';

// API integration

const AdviceApp = () => {

    const[advice, setadvice]= useState("Please Click Button to get Advice");
    const[count, setCount] =useState(0);

   async function HandleClick(){ // if we use api it will take delay , so we use async function.

    const res = await fetch("https://api.adviceslip.com/advice");// fetch url data from api and it store to res.
    
    const data = await res.json(); // store the res to data variable, and that res converted to json format.

    // console.log(res); in this statement explained response body{ readablestream}, then it's converted to json format like slip. in apiurl link : {"slip": { "id": 78, "advice": "Being kind is more rewarding than being right."}}

    setadvice(data.slip.advice);
    setCount((c) => c + 1);
        
    }
  return (
    <>
    
    <h1> {advice}</h1>
    <button className='getadvice-btn' onClick={HandleClick}>Get Advice</button>
    {/* <p>you have read {count} advice in a day</p> */}
    <Counter count={count}/>
    </>
  )
//  we used multiple component in this project. we can give "you have read" text below button tag.. 
// here we also used separate component.

  function Counter(props){

    return(
    <p>you have read {props.count} advice in a day</p>
    )
  }
}

export default AdviceApp