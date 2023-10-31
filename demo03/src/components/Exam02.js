import { useState } from 'react';
import apeachImage from '../assets/images/apeach.gif';

function Exam02() {
    //이 화면의 상태는(state)는 한 개
    const [size, setSize] = useState(300);

    // function small(){
    //     //size = 100;//React 사용 불가
    //     setSize(100);//React 사용 가능
    // }
    // function normal(){
    //     setSize(300);
    // }
    // function big(){
    //     setSize(500);
    // }

    return (
        <>
            <h1>두 번째 예제</h1>
            <button className='btn btn-primary' onClick={()=>setSize(100)}>작게</button>
            <button className='btn btn-info ms-2' onClick={()=>setSize(300)}>기본</button>
            <button className='btn btn-success ms-2' onClick={()=>setSize(500)}>크게</button>
            <br/>
            <img src={apeachImage} width={size} height={size}/>
        </>
    );
}

export default Exam02;
