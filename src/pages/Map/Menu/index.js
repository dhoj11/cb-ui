import React, {useState} from "react"
import style from "./Menu.module.css"

import {faQuestion, faBullhorn} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


import {observer} from "mobx-react";
import Board from "./Board";
import Notice from "./Notice";


const Menu = observer((props) => {

    const [selectTab, setSelectTab] = useState(1);

    const onChangeSelectTab = (value) => {
        setSelectTab(value);
    }

    return (
        <div className={style.menu}>
            <div className={style.tab}>
                <div className={selectTab === 1 ? style.select : style.item} onClick={()=>onChangeSelectTab(1)}>
                    {/*<FontAwesomeIcon className={style.icon} icon={faQuestion}/>*/}
                    <span className={style.text}>요청사항</span>
                </div>
                <div className={selectTab === 2 ? style.select : style.item} onClick={()=>onChangeSelectTab(2)}>
                    {/*<FontAwesomeIcon className={style.icon} icon={faBullhorn}/>*/}
                    <span className={style.text}>공지사항</span>
                </div>
            </div>
            <div className={style.content}>
                { selectTab == 1 && <Board/> }
                { selectTab == 2 && <Notice/> }
            </div>
        </div>
    )
});

export default Menu;