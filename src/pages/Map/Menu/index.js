import React, {useState} from "react"
import style from "./Menu.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane, faExclamation, faComment, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import store from "../store/Store";
import Board from "./Board";


const Menu = observer((props) => {

    const {
        setSnackBarOpen,
        setSnackBarMsg
    } = store

    return (
        <div className={style.menu}>
            <div className={style.top}>
                <span className={style.title}>매일철봉</span>
            </div>
            <div className={style.content}>
                <Board/>
            </div>
            <div className={style.bottom}>
                <span className={style.donate}>
                    <a href="https://qr.kakaopay.com/Ej7pA45zG">
                        카카오페이 후원하기
                    </a>
                </span><br/>
                <span className={style.account}>
                    카카오뱅크 3333-01-1736199
                </span>
            </div>
        </div>
    )
});

export default Menu;