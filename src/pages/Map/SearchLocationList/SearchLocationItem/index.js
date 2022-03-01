import React, {useEffect, useState} from "react"
import style from "./SearchLocationItem.module.css"
import {observer} from "mobx-react";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import store from "../../store/Store";

const SearchLocationItem = observer((props) => {

    const {
        setLatitude,
        setLongitude,
        setSearchedLocationName
    } = store

    const onClickLocationItem = () => {
        props.onCloseSearchListDialog();
        setLatitude(props.latitude)
        setLongitude(props.longitude);
        setSearchedLocationName(props.placeName)
    }

    return (
        <div className={style.searchitem} onClick={onClickLocationItem}>
            <div>
                <FontAwesomeIcon className={style.icon} icon={faMapMarkerAlt}/>
            </div>
            <div className={style.info}>
                <span className={style.placename}>{props.placeName}</span>
                <span className={style.addressname}>{props.addressName}</span>
            </div>
        </div>
    )
});

export default SearchLocationItem;
