import React, {useState} from "react"
import style from "./SearchInpubBox.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import store from "../store/Store"
import validation from "../../../utils/validation";

const SearchInputBox = observer(() => {
    const {
        onFocusInputBox,
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

    const onFocusInput = () => {
        setOnFocusInputBox(true)
    }

    const onCloseSearchList = () => {
        setOnFocusInputBox(false)
    }

    const onBlurInputBox = () => {
       // setOnFocusInputBox(false);
    }

    const onClickMenu = () => {

    }

    return (
        <div className={style.inputboxwrapper}>
            <div className={style.icon}>
                {
                    onFocusInputBox
                    ? <div className={style.closebtn} onClick={onCloseSearchList}>
                        <span><FontAwesomeIcon className={style.btn} icon={faChevronLeft}/></span>
                      </div>
                    : <div className={style.menubtn} onClick={onClickMenu}>
                        <span><FontAwesomeIcon className={style.btn} icon={faBars}/></span>
                      </div>
                }
            </div>
            <div className={style.input}>
                <input type="text"
                       className={style.inputbox}
                       placeholder="위치 · 장소를 입력하세요."
                       onChange={onChangeSearchedLocation}
                       onFocus={onFocusInput}
                       onBlur={onBlurInputBox}
                       />
            </div>
        </div>
    )
});

export default SearchInputBox;