import React from "react"
import style from "./Empty.module.css"
import {faExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Empty = (props) => {

    return (
        <div className={style.empty}>
            <span><FontAwesomeIcon className={style.icon} icon={faExclamation}/></span>
            <span className={style.text}>검색결과가 없습니다.</span>
        </div>
    )
};

export default Empty
