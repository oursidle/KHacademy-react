import { useEffect, useState } from "react";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

import "./Book.css";

const Book = (props) => {
    const [bookList, setBookList] = useState([]);

    //서버에서 book list를 불러와 state에 설정하는 코드
    const loadBook = () => {
        axios({
            url: "http://localhost:8080/book/",
            method: "get"
        })
            .then(response => {
                setBookList(response.data);
            })
            .catch(err => { });
    };
    useEffect(() => {
        loadBook();
    }, []);

    //도서 삭제
    //- state에서 삭제하는 것이 아니라 서버에 통신을 보낸 뒤 목록을 갱신
    const deleteBook = (book) => {
        const choice = window.confirm("삭제하시겠습니까?");
        if (choice === false) return;

        axios({
            url: `http://localhost:8080/book/${book.bookId}`,
            method: "delete"
        })
            .then(response => {
                loadBook();
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
                                        <FaRegEdit className="text-warning ms-1" />
                                        <FaXmark className="text-danger ms-1" onClick={e => deleteBook(book)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Book;