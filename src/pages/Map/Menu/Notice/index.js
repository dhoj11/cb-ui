import React, {useState} from "react"
import style from "./Notice.module.css"
import {observer} from "mobx-react";
import store from "../../store/Store";
import List from "./List";


const Notice = observer((props) => {

    const {
        setSnackBarOpen,
        setSnackBarMsg
    } = store


    return (
        <div className={style.notice}>
            <List/>
        </div>
    )
});

export default Notice;