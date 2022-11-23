import { useRef, useEffect, useState } from 'react';

export default function Cartlistadd({ productbox, setProductbox, changeValue, selectItems, setstyleHidden, setTotalprice }) {
    const rpm = useRef(1),
        [checkedlist, setcheckedlist] = useState(productbox),
        [tmp, setTmp] = useState(false);

    useEffect(() => {
        const totalPrice = productbox.reduce((acc, obj) => {
            return (acc += obj.listPrice * obj.listamount);
        }, 0);
        setTotalprice(totalPrice);
    }, [productbox]);

    useEffect(() => {
        const totalPrice = checkedlist.reduce((acc, obj) => {
            return (acc += obj.listPrice * obj.listamount);
        }, 0);
        setTotalprice(totalPrice);
    }, [checkedlist]);
    // 상품이 삭제되었을 때 장바구니 금액 변경

    useEffect(() => {
        setcheckedlist(productbox.filter((v) => selectItems.includes(v.listNum)));
        setTmp(false);
    }, [selectItems]);
    // 체크된 상품만 금액 합산

    function handleSingleCheck(checked, id) {
        if (checked) {
            changeValue([...selectItems, id]);
        } else {
            changeValue(selectItems.filter((v) => v !== id));
        }
        ++rpm.current;
    };

    function removeList(e) {
        if (window.confirm('이 상품을 삭제하시겠습니까?')) {
            setTmp(true);
            changeValue([...selectItems, (+e.target.name + 1 % productbox.length)]);
            setProductbox(productbox.filter((v) => v.listNum !== +e.target.name));
            if ((productbox.length - 1) === 0) {
                setstyleHidden('shop_cartboxnone');
            }
        }
    }

    function onChangeProps(id, value) {
        setProductbox(productbox => {
            return productbox.map(v => {
                if (v.listNum === id) {
                    return { ...v, listamount: value };
                } else {
                    return { ...v };
                }
            });
        });
    };

    return (
        <>
            {productbox.map((v, i) =>
                <li className="shop_cartbox1" key={`list${i}`}>
                    <div className="shop_cartleft">
                        <div className="agreeAll checkBox">
                            <input type="checkbox" name={`agreeCheck${v.listNum}`} id={`agreeCheck${v.listNum}`}
                                onChange={(e) => handleSingleCheck(e.target.checked, v.listNum)}
                                checked={selectItems.includes(v.listNum) || (rpm.current) === 1 || !!tmp ? true : false} />
                            <label htmlFor={`agreeCheck${v.listNum}`} id={`agreeCheck${v.listNum}`}></label>
                        </div>
                        <a href="./product_shopping_details.html" className="cartlistimgbox1">
                            <img src={v.listSrc} alt="아르르 꿀잠 방석" className="cartlistimg" />
                        </a>
                        <a href="./product_shopping_details.html" className="cartlisttextbox1">
                            <strong>{v.listTitle}</strong>
                            <span className="cartpayspan">{v.listPrice.toLocaleString()}원</span>
                            <span>{v.listOption}</span>
                        </a>
                    </div>

                    <div className="shop_cartright">
                        <div className="product_checkNum">
                            <a href="#" className="downCheckbtn" onClick={() => {
                                if (v.listamount > 1 && selectItems.includes(v.listNum)) {
                                    onChangeProps(v.listNum, v.listamount - 1);
                                }
                            }} >
                                <img src="./img/minus.png" alt="다운버튼" className="cartIcon" onClick={() => {
                                    if (v.listamount > 1 && selectItems.includes(v.listNum)) {
                                        onChangeProps(v.listNum, v.listamount - 1);
                                    }
                                }} />
                            </a>
                            <input type="text" value={v.listamount} readOnly />
                            <a href="#" className="UpCheckbtn" onClick={() => {
                                if (v.listamount < 10 && selectItems.includes(v.listNum)) {
                                    onChangeProps(v.listNum, v.listamount + 1);
                                }
                            }} >
                                <img src="./img/plus.png" alt="업버튼" className="cartIcon" onClick={() => {
                                    if (v.listamount < 10 && selectItems.includes(v.listNum)) {
                                        onChangeProps(v.listNum, v.listamount + 1);
                                    }
                                }} />
                            </a>
                        </div>

                        <img
                            src="./img/delete.png"
                            alt="삭제버튼"
                            className="cartdeleteIcon"
                            name={v.listNum}
                            onClick={(removeList)}
                        />
                    </div>
                </li>
            )}
        </>
    );
}