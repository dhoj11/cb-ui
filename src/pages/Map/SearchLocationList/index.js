import React, {useEffect, useState} from "react"
import style from "./SearchLocationList.module.css"
import {observer} from "mobx-react";
import store from "../store/Store";
import SearchLocationItem from "./SearchLocationItem/";
import Empty from "./Empty";

/*global kakao*/
const SearchLocationList = observer((props) => {

    const {
        onFocusInputBox,
        searchedLocation
    } = store


    const [searchedLocationList, setSearchedLocationList] = useState([]);

    useEffect(()=>{
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchedLocation, placesSearchCB, {size: 10});
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
                            onCloseSearchListDialog={props.onCloseSearchListDialog}
                        />
                    )
                    : <Empty/>
            }
        </div>
    )
});

export default SearchLocationList;