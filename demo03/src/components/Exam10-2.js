import React from "react";

const Exam10_2 = () => { 
    const foods = [
        { itemNo: 1, itemName: "포켓몬스터빵", itemPrice: 500, itemType: "식품" },
        { itemNo: 2, itemName: "허니버터칩", itemPrice: 1300, itemType: "식품" },
        { itemNo: 3, itemName: "참이슬후레시", itemPrice: 2200, itemType: "주류" },
        { itemNo: 4, itemName: "카스", itemPrice: 2500, itemType: "주류" },
        { itemNo: 5, itemName: "테라", itemPrice: 1300, itemType: "주류" },
        { itemNo: 6, itemName: "켈리", itemPrice: 1400, itemType: "주류" },
        { itemNo: 7, itemName: "처음처럼", itemPrice: 2000, itemType: "주류" },
        { itemNo: 8, itemName: "오징어땅콩", itemPrice: 3500, itemType: "식품" },
        { itemNo: 9, itemName: "신라면", itemPrice: 1500, itemType: "식품" },
        { itemNo: 10, itemName: "하리보젤리", itemPrice: 5500, itemType: "식품" },
    ];

    return (                                                                                                                                                                                                            
        <div>
            <h1>메뉴판</h1>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>번호</th>
                        <th style={tableHeaderStyle}>이름</th>
                        <th style={tableHeaderStyle}>가격</th>
                        <th style={tableHeaderStyle}>종류</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food, index) => (
                        <tr key={food.itemNo} style={tableRowStyle}>
                            <td style={tableCellStyle}>{index}</td>
                            <td style={tableCellStyle}>{food.itemName}</td>
                            <td style={tableCellStyle}>{food.itemPrice}</td>
                            <td style={tableCellStyle}>{food.itemType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const tableHeaderStyle = {
    border: "1px solid #000",
    padding: "8px",
};

const tableRowStyle = {
    border: "1px solid #000",
};

const tableCellStyle = {
    border: "1px solid #000",
    padding: "8px",
};

export default Exam10_2;