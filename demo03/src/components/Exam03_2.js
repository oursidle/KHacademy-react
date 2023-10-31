import { useState } from "react";

//function Exam03_2(){};
//const Exam03_2 = function(){};
const Exam03_2 = ()=>{
    const [money, setMoney] = useState(0);

    return (
        <>
            <h1>세 번째 예제_2</h1>
            <h3>
                출금 금액 : {money} 원
            </h3>
            <button className="btn btn-secondary" onClick={()=>setMoney(money + 100000)}>10만원</button>
            <button className="btn btn-secondary ms-2" onClick={()=>setMoney(money + 50000)}>5만원</button>
            <button className="btn btn-secondary ms-2" onClick={()=>setMoney(money + 10000)}>1만원</button>
            <button className="btn btn-danger ms-2" onClick={()=>setMoney(0)}>초기화</button>
            <br/>
            <input className="form-range" type="range" min="0" max="10000000" step="10000" value={money} onChange={e=>setMoney(parseInt(e.target.value))}/>
        </>
    );
};

export default Exam03_2;
