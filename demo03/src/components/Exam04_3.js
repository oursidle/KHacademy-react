import { useEffect, useState } from "react";

const Exam04_3 = ()=>{

    //const [필드명, 세터메소드명] = useState(초기값);
    const [content, setContent] = useState("");
    const [length, setLength] = useState(0);

    //state끼리 의존성이 생기는 경우가 있음
    //- content가 변하면 length가 변해야 함
    //- 수동아 아닌 자동으로 변하도록 설정할 수 있음
    //- useEffect 훅 사용
    //- usetEffect(함수, [감지항목]);
    useEffect(()=>{
        setLength(content.length);
    }, [content]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col md-10 offset-md-1">

                <div className="row">
                    <div className="col">
                        <h1>네 번째 예제_3</h1>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <h3>(Q) 주말에 뭐 하세요?</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <textarea name="content" className="form-control" 
                                rows="6" value={content} onChange={e=>setContent(e.target.value)}></textarea>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col text-end">
                        {length} / 1000
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
}

export default Exam04_3;