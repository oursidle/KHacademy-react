import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap/dist/js/bootstrap.esm";
import Jumbotron from "./Jumbotron";

const Exam01 = () => {
    const [todoList, setTodoList] = useState([
        { todoListNo: 1, todoListTitle: "학원가기", todoListType: "공부" },
        { todoListNo: 2, todoListTitle: "영어단어외우기", todoListType: "공부" },
        { todoListNo: 3, todoListTitle: "헬스장가기", todoListType: "운동" },
        { todoListNo: 4, todoListTitle: "친구만나기", todoListType: "일상" }
    ]);
    const [backup, setBackup] = useState([]);
    const [data, setData] = useState({
        todoListTitle: "",
        todoListType: ""
    });

    //모달
    const bsModal = useRef();

    //초기 데이터("") 변경
    const changeData = e => {
        const newData = {
            ...data,
            [e.target.name] : e.target.value
        };
        setData(newData);
    };

    //backup
    useEffect(() => {
        setBackup(todoList.map(list => {
            const newList = { ...list };
            return newList;
        }));
    }, []);

    //줄을 수정 상태로 변경하는 함수
    const changeToEdit = (target) => {
        const newList = todoList.map(list => {
            if (list.todoListNo === target.todoListNo) {
                return {
                    ...list,
                    edit: true
                };
            }
            return list;
        });
        setTodoList(newList);
    };

    //줄의 데이터를 변경하는 함수
    const changeList = (target, e) => {
        const newList = todoList.map(list => {
            if (list.todoListNo === target.todoListNo) {
                return {
                    ...list,
                    [e.target.name]: e.target.value
                };
            }
            return list;
        });
        setTodoList(newList);
    };

    //수정 취소
    const cancelList = (target) => {
        const findResult = backup.filter(list => list.todoListNo === target.todoListNo);
        const newList = todoList.map(list => {
            if (list.todoListNo === target.todoListNo) {
                return {
                    ...findResult[0],
                    edit: false
                };
            }
            return list;
        });
        setTodoList(newList);
    };

    //수정
    const saveList = (target) => {
        //backup 데이터 표시
        const newBackup = backup.map(list => {
            if (list.todoListNo === target.todoListNo) {
                return {
                    ...target,
                    edit: false
                };
            }
            return list;
        });
        setBackup(newBackup);

        //변경
        const newList = todoList.map(list => {
            if (list.todoListNo === target.todoListNo) {
                return {
                    ...list,
                    edit: false
                };
            }
            return list;
        });
        setTodoList(newList);
    };

    //삭제
    const deleteList = (target) => {
        //리스트 삭제
        const newList = todoList.filter(list => list.todoListNo !== target.todoListNo);
        setTodoList(newList);

        //백업 삭제
        const newBackup = backup.filter(list => list.todoListNo !== target.todoListNo);
        setBackup(newBackup);
    };

    //등록
    const addList = e => {
        const listNo = todoList.length == 0 ? 1 : todoList[todoList.length - 1].todoListNo + 1;

        //리스트 추가
        const newList = [
            ...todoList,
            {
                ...data,
                edit : false,
                todoListNo : listNo
            }
        ];
        setTodoList(newList);

        //백업 추가
        const newBackup = [
            ...backup,
            {
                ...data,
                edit : false,
                todoListNo : listNo
            }
        ];
        setBackup(newBackup);

        //입력창 초기화
        setData({
            todoListTitle:"",
            todoListType:""
        });

        //모달 닫기
        closeModal();
    };

    //모달 창 취소 버튼
    const cancelAddList = () => {
        //입력창 초기화
        setData({
            todoListTitle:"",
            todoListType:""
        });

        //모달 닫기
        closeModal();
    };

    //모달 열기(등록)
    const openModal = () => {
        var modal = new Modal(bsModal.current);
        modal.show();
    };
    //모달 닫기
    const closeModal = () => {
        var modal = Modal.getInstance(bsModal.current);
        modal.hide();
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 offset-md-1">

                        {/* 점보트론을 만들면서 제목과 내용을 전달 */}
                        <Jumbotron title="To Do List" content="Toda's goal"/>

                        <div className="row mt-2">
                            <div className="col">
                                <button type="button" className="btn btn-info" onClick={openModal}>New</button>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">

                                <table className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="10%">NO</th>
                                            <th width="30%">TITLE</th>
                                            <th width="20%">TYPE</th>
                                            <th width="20%">MANAGE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todoList.map((list, index) => (
                                            list.edit ? (
                                                <tr key={list.todoListNo}>
                                                    <td>{list.todoListNo}</td>
                                                    <td>
                                                        <input className="form-control" type="text" value={list.todoListTitle} name="todoListTitle"
                                                            onChange={e => changeList(list, e)} />
                                                    </td>
                                                    <td>
                                                        <input className="form-control" type="text" value={list.todoListType} name="todoListType"
                                                            onChange={e => changeList(list, e)} />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-secondary" onClick={e => cancelList(list)}>취소</button>
                                                        <button className="btn btn-sm btn-primary ms-1" onClick={e => saveList(list)}>완료</button>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={list.todoListNo}>
                                                    <td>{list.todoListNo}</td>
                                                    <td>{list.todoListTitle}</td>
                                                    <td>{list.todoListType}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-warning" onClick={e => changeToEdit(list)}>수정</button>
                                                        <button className="btn btn-sm btn-danger ms-1" onClick={e => deleteList(list)}>삭제</button>
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Modal */}
                <div className="modal fade" ref={bsModal} id="exampleModal" tabindex="-1"
                    data-bs-backdrop="static" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add New List</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label">NO</label>
                                        <input className="form-control" name="todoListTitle" value={data.todoListTitle} onChange={changeData}/>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <label className="form-label">TYPE</label>
                                        <input className="form-control" name="todoListType" value={data.todoListType} onChange={changeData}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {/* 자동으로 닫히게 하는 버튼 */}
                                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">취소</button> */}

                                    {/* 수동으로 닫히게 하는 버튼 */}
                                    <button type="button" className="btn btn-secondaty mt-4" onClick={cancelAddList}>취소</button>

                                    <button type="button" className="btn btn-primary mt-4" onClick={addList}>등록</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Exam01;