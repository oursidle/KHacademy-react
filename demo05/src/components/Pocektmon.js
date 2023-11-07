import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import {AiFillDelete, AiOutlinePlus} from "react-icons/ai";
import { Modal } from "bootstrap";

const Pocketmon = (props) => {
    const [pocketmonList, setPocketmonList] = useState([]);

    //서버에서 pocketmon list를 불러와 state에 설정하는 코드
    const loadPocketmon = () => {
        axios({
            url: "http://localhost:8080/pocketmon/",
            method: "get"
        })
            .then(response => {
                //console.log(response);
                setPocketmonList(response.data);
            })
            .catch(err => { });
    };
    useEffect(() => {
        loadPocketmon();
    }, []);

    //포켓몬스터 삭제
    //- state에서 삭제하는 것이 아니라 서버에 통신을 보낸 뒤 목록을 갱신
    const deletePocketmon = (pocketmon) => {
        const choice = window.confirm("삭제하시겠습니까?");
        if (choice === false) return;

        //axios({옵션}).then(성공 시 실행할 함수).catch(실패 시 실행할 함수)
        axios({
            url: `http://localhost:8080/pocketmon/${pocketmon.no}`,
            method: "delete"
        })
            .then(response => {
                loadPocketmon();//목록 갱신
            })
            .catch(err => { })
    };

    //modal 관련된 처리
    const bsModal = useRef();
    const openModal = () => {
        const modal = new Modal(bsModal.current);
        modal.show();
    };
    const closeModal = () => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();

        clearPocketmon();
    };

    //등록과 관련된 state
    const [pocketmon, setPocketmon] = useState({name:"", type:""});
    const changePocketmon = (e)=> {
        setPocketmon({
            ...pocketmon,
            [e.target.name] : e.target.value
        });
    };

    const clearPocketmon = () => {
        setPocketmon({name: "", type: ""});
    };

    //axios로 서버에 등록 요청을 보낸 후 등록 성공 시 목록을 갱신하도록 처리
    const savePocketmon = ()=> {
        axios ({
            url: "http://localhost:8080/pocketmon/",
            method: "post",
            data: pocketmon
        })
        .then(response => {//성공했다면
            loadPocketmon();//목록 갱신 후
            closeModal();//모달 닫기
        })
        .catch(err => {})
    };

    //포켓몬스터 수정 창 열기
    //- target은 수정 버튼을 누른 행의 포켓몬스터 정보
    //- target의 정보를 pocketmon으로 복제 후 모달 열기
    const editPocketmon = (target)=> {
        setPocketmon({...target});
        openModal();
    };

    //포켓몬스터 수정 처리
    const updatePocketmon = ()=> {
        //검사 후 차단 처리

        const {no, name, type} = pocketmon;
        axios({
            url: `http://localhost:8080/pocketmon/${no}`,
            method: "put",
            data: {
                name : name,
                type : type
            }
        })
        .then(response => {
            loadPocketmon();
            closeModal();
        })
        .catch(err => {})
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>포켓몬스터 관리</h1>
                    <p>React CRUD 연습 예제</p>
                </div>
            </div>

            {/* 추가 버튼 */}
            <div className="row mt-4">
                <div className="col">
                    <button className="btn btn-success" onClick={openModal}>
                        <AiOutlinePlus/>
                        추가
                    </button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>속성</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pocketmonList.map(pocketmon => (
                                <tr key={pocketmon.no}>
                                    <td>{pocketmon.no}</td>
                                    <td>{pocketmon.name}</td>
                                    <td>{pocketmon.type}</td>
                                    <td>
                                        <FaRegEdit className="text-warning ms-1" onClick={e => editPocketmon(pocketmon)}/>
                                        <FaXmark className="text-danger ms-1" onClick={e => deletePocketmon(pocketmon)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" ref={bsModal} id="exampleModal"
                data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {pocketmon.no === undefined ? '신규 몬스터 등록' : `${pocketmon.no}번 몬스터 수정`}
                                {/* none : css
                                empty : 배열
                                undefined : 값 존재 X
                                null : 항목 존재 X */}
                            </h5>
                            <button type="button" className="btn-close" onClick={closeModal} data-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">이름</label>
                                    <input type="text" name="name"className="form-control"
                                                value={pocketmon.name} onChange={changePocketmon}/>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label className="form-label">속성</label>
                                    <input type="text" name="type"className="form-control"
                                                value={pocketmon.type} onChange={changePocketmon}/>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>닫기</button>
                                {pocketmon.no === undefined ? 
                                    <button className="btn btn-success" onClick={savePocketmon}>저장</button>
                                    : 
                                    <button className="btn btn-success" onClick={updatePocketmon}>수정</button>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pocketmon;