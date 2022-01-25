import React, {useState} from "react"
import style from "./Header.module.css"
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
    return (
        <div className={style.header}>
            <div className={style.title}>
                <Link to="/">
                    <span className={style.title1}>매일</span>
                    <span className={style.title2}>철봉</span>
                </Link>
            </div>
            <div className={style.menu}>
                <FontAwesomeIcon className={style.icon} icon={faBars} />
            </div>
        </div>
    )
}

export default Header;