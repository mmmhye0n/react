import { useState } from 'react';
import Cartlistadd from '../../productcart/src/subModule/Cartlistadd';

function App() {
  const [productbox, setProductbox] = useState(
    [
      {
        listNum: 1,
        listSrc: "./img/photo_5.jpg",
        listTitle: '아르르 꿀잠 방석',
        listPrice: 29900,
        listOption: '[옵션: 캐시미어 블루 M]',
        listamount: 1,
      },
      {
        listNum: 2,
        listSrc: "./img/payment_1.jpg",
        listTitle: '사르르 미니 캔',
        listPrice: 9500,
        listOption: '[옵션: 치킨 & 치킨간 30g*6개입]',
        listamount: 1,
      },
    ]),
    [selectItems, setselectItems] = useState([1, 2]),
    [styleHidden, setstyleHidden] = useState('shop_cartboxnone hidden'),
    [totalPrice, setTotalprice] = useState(39400);

  let [urlChange, seturlChange] = useState('#');

  function changeValue(array) {
    setselectItems(array);
  }

  function removeSelect() {
    if (productbox.length !== 0) {
      if (window.confirm(`정말 삭제하시겠습니까?`)) {
        setProductbox(productbox.filter((v) => !selectItems.includes(v.listNum)));

        if ((productbox.length - 1) === 0 || selectItems.length === productbox.length) {
          setstyleHidden('shop_cartboxnone');
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
      setstyleHidden('shop_cartboxnone');
    }
  }

  function selectOrder() {
    if (productbox.length === 0) {
      if (productbox.length === 0) {
        alert('장바구니가 비어있습니다!');
      } else {
        alert('주문할 상품을 선택해 주세요!');
      }
    } else {
      seturlChange("./product_shopping_payment.html");
    }
  }

  return (
    <main>
      <h1>CART</h1>
      <hr />
      <article className="shop_cartlist">
        <ul>
          <li className={styleHidden}>
            <span>장바구니가 비어 있습니다.</span>
          </li>
          <Cartlistadd
            productbox={productbox}
            setProductbox={setProductbox}
            changeValue={changeValue}
            selectItems={selectItems}
            setstyleHidden={setstyleHidden}
            setTotalprice={setTotalprice}
          />
        </ul>
      </article>

      <article className="shop_Btnlist">
        <div className="shop_Btnleft">
          <a
            href="#none"
            className="payBtnw"
            onClick={removeSelect}
          >선택삭제</a>
          <a
            href="#none"
            className="payBtnw"
            onClick={removeAll}
          >전체삭제</a>
        </div>

        <div className="shop_Btnright">
          <a href={urlChange} className="payBtnw" onClick={selectOrder}>선택상품 주문</a>
          <a href={urlChange} className="payBtnb" onClick={() => {
            if (productbox.length === 0) {
              alert('장바구니가 비어있습니다!');
            } else {
              seturlChange("./product_shopping_payment.html");
            }
          }}>전체상품 주문</a>
        </div>
      </article>

      <article className="shoptotalpayBox">
        <div className="paydeliverybox">
          <div className="paybox">
            <strong>주문금액</strong>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="deliverybox">
            <strong>배송비</strong>
            <span>{totalPrice > 50000 || totalPrice === 0 ? 0 : (3000).toLocaleString()}원</span>
          </div>
        </div>

        <div className="totalbox">
          <strong className="importantTotal">합계</strong>
          <span>{(totalPrice + (totalPrice > 50000 || totalPrice === 0 ? 0 : 3000)).toLocaleString()}원</span>
        </div>
        <div className="tatalBtnall">
          <a href={urlChange} className="totalpayBtnb" onClick={selectOrder}>주문하기</a>
        </div>
      </article>
    </main>
  );
}

export default App;