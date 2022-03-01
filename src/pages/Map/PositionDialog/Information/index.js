import React, {useEffect, useState} from "react"
import style from "./Information.module.css"
import {observer} from "mobx-react";
import validation from "../../../../utils/validation";
import {GetMapPositionsOne} from "../../../../apis/MapApis";

const Information = observer((props) => {

    const selectedPositionId = props.selectedPositionId;

    const [positionInfo, setPositionInfo] = useState();

    useEffect(()=>{
        callAPIgetPositionsOne();
    }, [props.selectedPositionId]);

    /*
    선택한 위치의 정보를 불러옵니다.
     */
    const callAPIgetPositionsOne = async () => {

        const params = {
            position_id : selectedPositionId
        }

        if(!validation.checkEmpty(selectedPositionId)) {
            const result = await GetMapPositionsOne(params);
            if (result.resultCode === 200) {
                const resultData = result.resultData;
                setPositionInfo(resultData);
            }
        }
    }

    return (
        positionInfo ?
            <div className={style.count}>
                <div className={style.item}>
                    <span className={style.name}>철봉</span>
                    <span className={style.number}>{positionInfo.chulbong_count}</span>
                </div>
                <div className={style.item}>
                    <span className={style.name}>평행봉</span>
                    <span className={style.number}>{positionInfo.pyeong_count}</span>
                </div>
            </div>
            : <div className={style.loading}>
                {" "}
            </div>
    )
});

export default Information;