import { useRef, useState } from 'react';
import Cartlistadd from './subModule/Cartlistadd';

function App() {
    const [productbox, setProductbox] = useState(
        [
            {
                listNum: 1,
                listSrc: "./img/photo_5.jpg",
                listTitle: '아르르 꿀잠 방석',
            },
            {
                listNum: 2,
                listSrc: "./img/payment_1.jpg",
                listTitle: '사르르 미니 캔',
            },
        ]),
        [selectItems, setselectItems] = useState([]),
        [styleHidden, setstyleHidden] = useState('shop_likeboxnone hidden');


    function changeValue(boolean) {
        setselectItems(boolean);
    }

    function removeSelect() {
        if (+selectItems !== 0) {
            if (window.confirm(`정말 삭제하시겠습니까?`)) {
                setProductbox(productbox.filter((v) => !selectItems.includes(v.listNum)));
                if ((productbox.length - 1) === 0 || selectItems.length === productbox.length) {
                    setstyleHidden('shop_likeboxnone');
                }
            }
        } else {
            alert('삭제할 상품을 선택해 주세요!');
        }
        setselectItems([]);
    }

    function removeAll() {
        if (window.confirm('보관함을 전부 삭제하시겠습니까?')) {
            setProductbox([]);
            setstyleHidden('shop_likeboxnone');
        }
    }

    return (
        <main>
            <h1>Wishlist</h1>
            <hr />
            <article className="shop_likelist">
                <ul>
                    <li className={styleHidden}>
                        <span>보관함이 비어 있습니다.</span>
                    </li>
                    <Cartlistadd
                        productbox={productbox}
                        setProductbox={setProductbox}
                        changeValue={changeValue}
                        selectItems={selectItems}
                        setstyleHidden={setstyleHidden}
                    />
                </ul>
            </article>

            <article className="shop_likeBtnlist">
                <div className="shop_likeBtnleft">
                    <a
                        href="#none"
                        className="likepayBtnw"
                        onClick={removeSelect}
                    >선택삭제</a>
                    <a
                        href="#none"
                        className="likepayBtnw"
                        onClick={removeAll}
                    >전체삭제</a>
                </div>

                <div className="shop_likeBtnright">
                    <a href="#none" className="likepayBtnw" onClick={() => {
                        if (+selectItems === 0) {
                            alert('장바구니에 담을 상품을 선택해 주세요!');
                        }
                    }}>장바구니 담기</a>
                    <a href="#none" className="likepayBtnb" onClick={() => {
                        if (+selectItems === 0) {
                            alert('주문할 상품을 선택해 주세요!');
                        }
                    }}>상품 주문하기</a>
                </div>
            </article>
        </main>
    );
}

export default App;