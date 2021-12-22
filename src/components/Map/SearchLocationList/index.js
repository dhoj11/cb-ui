import React, {useEffect, useState} from "react"
import style from "./SearchLocationList.module.css"
import {observer} from "mobx-react";
import store from "../store/Store";
import SearchLocationItem from "./SearchLocationItem/";
import zIndex from "@mui/material/styles/zIndex";

/*global kakao*/
const SearchLocationList = observer((props) => {

    const {
        onFocusInputBox,
        searchedLocation
    } = store


    const [searchedLocationList, setSearchedLocationList] = useState([]);

    useEffect(()=>{
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchedLocation, placesSearchCB);
    },[searchedLocation])

    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            setSearchedLocationList(data);
        }
    }

    return (
        <div className={style.listwrapper}>
            {
                searchedLocationList.length > 0
                    ? searchedLocationList.map( (item) =>
                        <SearchLocationItem
                            item={item}
                            addressName={item.road_address_name}
                            placeName={item.place_name}
                            latitude={item.y}
                            longitude={item.x}
                        />
                    )
                    : <div>검색결과가 없습니다.</div>
            }
        </div>
    )
});

export default SearchLocationList;