import React, {useState} from "react"
import {observer} from "mobx-react";
import style from "./ChulbongInput.module.css";
import validation from "../../../../utils/validation";
import store from "../../store/Store";



const ChulbongInput = observer((props) => {

    const {
        setSnackBarOpen,
        setSnackBarMsg,
    } = store ;

    const fnChangeChulbongCount = (event) => {
        const count = event.target.value;
        if(!validation.isNumeric(count)){
            setSnackBarMsg("숫자만 입력할 수 있습니다.");
            setSnackBarOpen(true);
            props.fnChangeChulbongCount(0)
        }else if(count > 20){
            setSnackBarMsg("입력수량을 확인해주세요.");
            setSnackBarOpen(true);
        }else{
            props.fnChangeChulbongCount(count);
        }
    }

    const fnChangePyeongCount = (event) => {
        const count = event.target.value;
        if(!validation.isNumeric(count)){
            setSnackBarMsg("숫자만 입력할 수 있습니다.");
            setSnackBarOpen(true);
            props.fnChangePyeongCount(0)
        }else if(count > 20){
            setSnackBarMsg("입력수량을 확인해주세요.");
            setSnackBarOpen(true);
        }else{
            props.fnChangePyeongCount(count);
        }
    }


    return (
        <div className={style.info}>
            <div className={style.chulbong}>
                <span className={style.name}>철봉</span>
                <input type="text"
                       className={style.count}
                       onChange={ (e) => fnChangeChulbongCount(e)}
                       value={props.chulbongCount || ""}
                       placeholder="0"/>
            </div>
            <div className={style.pyeong}>
                <span className={style.name}>평행봉</span>
                <input type="text"
                       className={style.count}
                       onChange={(e) => fnChangePyeongCount(e)}
                       value={props.pyeongCount || ""}
                       placeholder="0"/>
            </div>
        </div>
    )
});

export default ChulbongInput;