import React, {useState} from "react"
import style from "./SearchInpubBox.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import store from "../store/Store"
import validation from "../../../utils/validation";

const SearchInputBox = observer(() => {
    const {
        searchedLocation,
        setSearchedLocation,
        setOnFocusInputBox
    } = store

    const onChangeSearchedLocation = (event) => {
        const location = event.target.value;
        if(!validation.checkEmpty(location)) {
            setSearchedLocation(location);
        }
    }

    const onFocusInputBox = () => {
        setOnFocusInputBox(true)
    }

    const onBlurInputBox = () => {
       // setOnFocusInputBox(false);
    }

    return (
        <div className={style.inputboxwrapper}>
            <span> </span>
            <input type="text"
                   className={style.inputbox}
                   placeholder="위치 · 장소를 입력하세요."
                   onChange={onChangeSearchedLocation}
                   onFocus={onFocusInputBox}
                   onBlur={onBlurInputBox}
                   />
        </div>
    )
});

export default SearchInputBox;