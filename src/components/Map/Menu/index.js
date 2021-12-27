import React, {useState} from "react"
import style from "./Menu.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faExclamation, faComment} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";


const Menu = observer((props) => {

    return (
        <div className={style.menu}>
            <span><FontAwesomeIcon className={style.icon} icon={faExclamation}/></span>
            <p className={style.notice}>
                현재 서비스 개편 진행중입니다.<br/>
                서비스가 불안정 할 수 있습니다.<br/>
                당분간 문의는 카카오톡 오픈채팅을 이용해주세요.
            </p>
            <div>
                <a href="https://open.kakao.com/o/gU0WMaPc">
                    <span><FontAwesomeIcon className={style.talk} icon={faComment}/></span>
                </a>
            </div>
            <span className={style.author}>매일철봉 v2.0</span>
        </div>
    )
});

export default Menu;