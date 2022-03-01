import React, {useState} from "react"
import style from "./Menu.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane, faExclamation, faComment, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import store from "../store/Store";
import Board from "./Board";
import Notice from "./Notice";


const Menu = observer((props) => {

    return (
        <div className={style.menu}>
            <div className={style.top}>
                <span className={style.title}>매일철봉</span>
            </div>
            <div className={style.content}>
                <Board/>
            </div>
        </div>
    )
});

export default Menu;