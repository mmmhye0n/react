import { useEffect } from 'react';

export default function Cartlistadd({ productbox, setProductbox, changeValue, selectItems, setstyleHidden }) {
    function handleSingleCheck(checked, id) {
        if (checked) {
            changeValue([...selectItems, id]);
        } else {
            changeValue(selectItems.filter((v) => v !== id));
        }
    };

    useEffect(() => {
        changeValue([]);
    }, [productbox]);

    function removeList(e) {
        if (window.confirm('해당 상품을 삭제하시겠습니까?')) {
            setProductbox(productbox.filter((v) => v.listNum !== +e.target.name));
            if ((productbox.length - 1) === 0) {
                setstyleHidden('shop_likeboxnone');
            }
        }
    }

    return (
        <>
            {productbox.map((v) =>
                <li className={`shop_likebox`} key={`list${v.listNum}`}>
                    <div className="shop_likeleft">
                        <input
                            type="checkbox"
                            onChange={(e) => handleSingleCheck(e.target.checked, v.listNum)}
                            checked={selectItems.includes(v.listNum) ? true : false}
                        />
                        <a href="#" className={`likelistimgbox`}>
                            <img src={v.listSrc} alt={v.listTitle} className="likelistimg" />
                        </a>
                        <a href="#" className={`likelisttextbox`}>
                            <strong>{v.listTitle}</strong>
                        </a>
                    </div>

                    <div className="shop_likeright">
                        <img
                            src="./img/delete.png"
                            alt="삭제버튼"
                            className="likedeleteIcon"
                            name={v.listNum}
                            onClick={(removeList)}
                        />
                    </div>
                </li>
            )}
        </>
    );
}