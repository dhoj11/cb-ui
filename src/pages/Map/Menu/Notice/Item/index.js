import React, {useState} from "react"
import style from "./Item.module.css"
import {observer} from "mobx-react";
import store from "../../../store/Store";


const Item = observer((props) => {

    const {
        setSnackBarOpen,
        setSnackBarMsg
    } = store


    return (
        <div className={style.item}>
            아이템
        </div>
    )
});

export default Item;