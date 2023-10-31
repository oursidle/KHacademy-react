import { useState } from "react";

function Exam03(){
    const [price, setPrice] = useState(0);

    return(
        <>
            <h1>세 번째 예제</h1>
            <h3>
                출금 금액 : {price} 원
            </h3>
            <button className="btn btn-secondary" onClick={()=>setPrice(price + 100000)}>10만원</button>
            <button className="btn btn-secondary ms-2" onClick={()=>setPrice(price + 50000)}>5만원</button>
            <button className="btn btn-secondary ms-2" onClick={()=>setPrice(price + 10000)}>1만원</button>
            <button className="btn btn-danger ms-2" onClick={()=>setPrice(0)}>초기화</button>
        </>
    );
}

export default Exam03;
