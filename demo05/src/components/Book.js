import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "bootstrap";

import "./Book.css";

const Book = (props) => {
    const [bookList, setBookList] = useState([]);

    //도서 조회
    //서버에서 book list를 불러와 state에 설정하는 코드
    // const loadBook = () => {
    //     axios({
    //         url: `${process.env.REACT_APP_REST_API_URL}/book/`,
    //         method: "get"
    //     })
    //         .then(response => {
    //             setBookList(response.data);
    //         })
    //         .catch(err => {"통신 오류 발생"});
    // };
    useEffect(() => {
        loadBook();
    }, []);
    const loadBook = async () => {
        const response = await axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/`,
            method: "get"
        })
        setBookList(response.data);
    };

    //도서 삭제
    //- state에서 삭제하는 것이 아니라 서버에 통신을 보낸 뒤 목록을 갱신
    const deleteBook = (book) => {
        const choice = window.confirm("삭제하시겠습니까?");
        if (choice === false) return;

        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method: "delete"
        })
            .then(response => {
                loadBook();
            })
            .catch(err => { })
    };

    //Modal
    const bsModal = useRef();
    const openModal = () => {
        const modal = new Modal(bsModal.current);
        modal.show();
    };
    const closeModal = () => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();

        clearBook();
    };

    //도서 등록 (state)
    const [book, setBook] = useState({
        bookTitle: "",
        bookAuthor: "",
        bookPublicationDate: "",
        bookPublisher: "",
        bookPrice: "",
        bookPageCount: "",
        bookGenre: ""
    });
    const changeBook = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    //등록 후 초기화
    const clearBook = () => {
        setBook({
            bookTitle: "",
            bookAuthor: "",
            bookPublicationDate: "",
            bookPublisher: "",
            bookPrice: "",
            bookPageCount: "",
            bookGenre: ""
        });
    };

    //도서 등록 후 목록 갱신
    // const saveBook = () => {
    //     axios({
    //         url: `${process.env.REACT_APP_REST_API_URL}/book/`,
    //         method: "post",
    //         data: book
    //     })
    //         .then(response => {
    //             loadBook();
    //             closeModal();
    //         })
    //         .catch(err => { })
    // };

    //saync 함수와 await 키워드를 사용한 간소화 작업이 가능
    //- 비동기 작업을 동기화된 코드로 작성할 수 잇음
    const saveBook = async () => {
        const response = await axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/`,
            method: "post",
            data: book
        });
        loadBook();
        closeModal();
    };

    //도서 수정 모달
    const editBook = (target) => {
        setBook({ ...target });
        openModal();
    };

    //도서 수정
    const updateBook = () => {

        const copyBook = {...book};
        delete copyBook.bookId;
        // const {
        //     bookId, bookTitle, bookAuthor, bookPublicationDate, bookPublisher,
        //     bookPrice, bookPageCount, bookGenre } = book;
        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method: "put",
            // data: {
            //     bookTitle: bookTitle,
            //     bookAuthor: bookAuthor,
            //     bookPublicationDate: bookPublicationDate,
            //     bookPublisher: bookPublisher,
            //     bookPrice: bookPrice,
            //     bookPageCount: bookPageCount,
            //     bookGenre: bookGenre
            // }
            data: copyBook
        })
            .then(response => {
                loadBook();
                closeModal();
            })
            .catch(err => { })
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>도서 관리 화면</h1>
                    <p>React CRUD 연습 예제</p>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <button className="btn btn-success" onClick={openModal}>
                        <AiOutlinePlus />추가
                    </button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th width="5%" className="pc-only">No</th>
                                <th width="20%">Title</th>
                                <th width="10%">Author</th>
                                <th width="15%" className="pc-only">PublicationDate</th>
                                <th width="10%">Publisher</th>
                                <th width="10%">Price</th>
                                <th width="10%" className="pc-only">PageCount</th>
                                <th width="10%" className="pc-only">Genre</th>
                                <th width="10%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map(book => (
                                <tr key={book.bookId}>
                                    <td className="pc-only">{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td>{book.bookPublicationDate}</td>
                                    <td className="pc-only">{book.bookPublisher}</td>
                                    <td>{book.bookPrice}</td>
                                    <td className="pc-only">{book.bookPageCount}</td>
                                    <td className="pc-only">{book.bookGenre}</td>
                                    <td>
                                        <FaRegEdit className="text-warning ms-1" onClick={e => editBook(book)} />
                                        <FaXmark className="text-danger ms-1" onClick={e => deleteBook(book)} />
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
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                {book.bookId === undefined ? '도서 등록' : `${book.bookId}번 도서 수정`}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Title</label>
                                    <input type="text" name="bookTitle" className="form-control" value={book.bookTitle} onChange={changeBook}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Author</label>
                                    <input type="text" name="bookAuthor" className="form-control" value={book.bookAuthor} onChange={changeBook}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">PublicationDate</label>
                                    <input type="text" name="bookPublicationDate" className="form-control" value={book.bookPublicationDate} onChange={changeBook}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Publisher</label>
                                    <input type="text" name="bookPublisher" className="form-control" value={book.bookPublisher} onChange={changeBook}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Price</label>
                                    <input type="text" name="bookPrice" className="form-control" value={book.bookPrice} onChange={changeBook}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">PageCount</label>
                                    <input type="text" name="bookPageCount" className="form-control" value={book.bookPageCount} onChange={changeBook}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Genre</label>
                                    <input type="text" name="bookGenre" className="form-control" value={book.bookGenre} onChange={changeBook}></input>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={closeModal}>Close</button>
                            {book.bookId === undefined ?
                                <button type="button" class="btn btn-success" onClick={saveBook}>Save</button>
                                :
                                <button type="button" class="btn btn-success" onClick={updateBook}>Update</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Book;