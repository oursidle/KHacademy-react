import { useState } from "react";

const Exam07 = () => {

    //객체로 상태 변수를 정의
    const [member, setMember] = useState({
        memberId: "",
        memberPw: "",
        memberPwRe: ""
    });

    //객체의 상태를 한 번에 변경하는 함수를 구현
    const join = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col md-10 offset-md-1">
                    
                    <div className="row">
                        <div className="col text-center">
                            <h1>회원가입_1</h1>
                        </div>
                    </div>

                    <form autoComplete="off">
                        <div className="row">
                            <div className="col col-sm-10 offset-sm-1 col-md-8 offset-md-8 col-lg-6 offset-lg-3">
                                <label class="col-form-label mt-4">아이디</label>
                                <input className="form-control" type="text" name="memberId" value={member.memberId} onChange={join} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col col-sm-10 offset-sm-1 col-md-8 offset-md-8 col-lg-6 offset-lg-3">
                                <label class="col-form-label mt-4">비밀번호</label>
                                <input className="form-control" type="password" name="memberPw" value={member.memberPw} onChange={join} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col col-sm-10 offset-sm-1 col-md-8 offset-md-8 col-lg-6 offset-lg-3">
                                <label class="col-form-label mt-4">비밀번호 확인</label>
                                <input className="form-control" type="password" name="memberPwRe" value={member.memberPwRe} onChange={join} />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col col-sm-10 offset-sm-1 col-md-8 offset-md-8 col-lg-6 offset-lg-3 d-grid gap-2">
                                <button className="btn btn-primary" type="button">가입하기</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Exam07;