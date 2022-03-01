import React, {useState} from "react"
import style from "./SearchInpubBox.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import store from "../store/Store"
import validation from "../../../utils/validation";

const SearchInputBox = observer((props) => {
    const {
        setSearchedLocation,
    } = store

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
                    : null
                    // <div className={style.menuBtn} onClick={onClickMenu}>
                    //     <span><FontAwesomeIcon className={style.icon} icon={faBars}/></span>
                    //   </div>
                }
            </div>
            <div className={style.input}>
                <input type="text"
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