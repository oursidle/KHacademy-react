import { useState } from "react";

const Exam04 = ()=>{
    const [text, setText] = useState(0);

    return (
        <>
            <h1>네 번째 예제</h1>
            <textarea min="0" maxLength="1000" rows="10" cols="60" onChange={e=>setText(e.target.textLength)}/>
            <span>
                {text} / 1000
            </span>
        </>
    );
}

export default Exam04;