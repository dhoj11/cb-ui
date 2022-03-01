import React, {useState} from "react"
import style from "./CommentItem.module.css"
import {observer} from "mobx-react";

const CommentItem = observer((props) => {

    return (
        <div className={style.content}>
            <span className={style.text}>{props.content}</span>
            <span className={style.date}>{props.date}</span>
        </div>
    )
});

export default CommentItem;