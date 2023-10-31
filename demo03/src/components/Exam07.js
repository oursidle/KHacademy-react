import { useState } from "react";

const Exam07 = ()=>{

    const [member, setMember] = useState({
        memberId : "",
        memberPw : "",
        memberPwRe : ""
    });

    const join = e=>{
        setMember({
            ...member,
            [e.target.name] : e.target.value,
        });
    };

    return (
        <>
            아이디 <input type="text" name="memberId" value={member.memberId} onChange={join}/> <br/><br/>
            비밀번호 <input type="password" name="memberPw" value={member.memberPw} onChange={join}/> <br/><br/>
            비밀번호 확인 <input type="password" name="memberPwRe" value={member.memberPwRe} onChange={join}/> <br/><br/>

            <button type="button">가입하기</button>
        </>
    );
};

export default Exam07;