import React from "react"
import style from "./NoticeItem.module.css"
import {observer} from "mobx-react";

const NoticeItem = observer((props) => {

    const fnChangeSelectArticle = (noticeNo) => {
        props.fnChangeSelectArticle(noticeNo);
    }

    return (
        <div className={style.article} onClick={ () => fnChangeSelectArticle(props.noticeNo) } >
            <span className={style.title}>{props.title}</span>
            <span className={style.date}>{props.date}</span>
        </div>
    )
});

export default NoticeItem;