import React, {useEffect, useRef, useState} from "react"
import style from "./SearchInpubBox.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import store from "../store/Store"
import validation from "../../../utils/validation";

const SearchInputBox = observer((props) => {
    const {
        searchedLocationName,
        setSearchedLocation,
    } = store

    const inputRef = useRef(null);

    useEffect(()=>{
        inputRef.current.value = searchedLocationName;
    },[searchedLocationName])

    const onChangeSearchedLocation = (event) => {
        const location = event.target.value;
        if(!validation.checkEmpty(location)) {
            setSearchedLocation(location);
        }
    }

    const onFocusInput = () => {
        props.onOpenSearchListDialog()
    }

    const onCloseSearchList = () => {
        props.onCloseSearchListDialog();
    }

    const onClickMenu = () => {
        props.onOpenMenuDialog();
    }

    return (
        <div className={style.search}>
            <div className={style.btn}>
                {
                    props.searchListDialogOpen
                    ? <div className={style.closeBtn} onClick={onCloseSearchList}>
                        <span><FontAwesomeIcon className={style.icon} icon={faChevronLeft}/></span>
                      </div>
                    : <div className={style.menuBtn}>
                        <span><FontAwesomeIcon className={style.icon} icon={faMagnifyingGlass} /></span>
                    </div>

                }
            </div>
            <div className={style.input}>
                <input type="text"
                       ref={inputRef}
                       className={style.inputText}
                       placeholder="위치 · 장소를 입력하세요."
                       onChange={onChangeSearchedLocation}
                       onFocus={onFocusInput}
                       />
            </div>
        </div>
    )
});

export default SearchInputBox;