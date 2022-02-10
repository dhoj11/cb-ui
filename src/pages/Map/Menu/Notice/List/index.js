import React, {useState} from "react"
import style from "./List.module.css"
import {observer} from "mobx-react";
import store from "../../../store/Store";


const List = observer((props) => {

    const {
        setSnackBarOpen,
        setSnackBarMsg
    } = store


    return (
        <div className={style.list}>
            리스트
        </div>
    )
});

export default List;