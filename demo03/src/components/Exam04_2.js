import { useState } from "react";

const Exam04_2 = ()=>{

    //const [필드명, 세터메소드명] = useState(초기값);
    const [content, setContent] = useState("");

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col md-10 offset-md-1">

                <div className="row">
                    <div className="col">
                        <h1>네 번째 예제_2</h1>
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
                        {content.length} / 1000
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
}

export default Exam04_2;
