import React, {useState} from "react"
import {addMapPositions} from "../../../apis/MapApis";
import {faGripLines, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import style from "./AddPositionsDrawer.module.css";
import validation from "../../../utils/validation";
import store from "../store/Store";
import {observer} from "mobx-react";
import ChulbongInput from "./ChulbongInput";
import ContentInput from "./ContentInput";

const AddPositionsDrawer = observer((props) => {
    const {
        setSnackBarOpen,
        setSnackBarMsg,
    } = store ;

    const [chulbongCount, setChulbongCount] = useState();
    const [pyeongCount, setPyeongCount] = useState();
    const [content, setContent] = useState();

    const fnChangeChulbongCount = (value) => {
        setChulbongCount(value)
    }

    const fnChangePyeongCount = (value) => {
        setPyeongCount(value);
    }

    const fnChangeContent = (event) => {
        setContent(event.target.value);
    }

    const fnCheckValidation = () => {
        if(validation.checkEmpty(chulbongCount) && validation.checkEmpty(pyeongCount)){
            setSnackBarMsg("철봉 혹은 평행봉 수량을 입력해주세요.");
            setSnackBarOpen(true);
            return
        }

        if(validation.checkEmpty(chulbongCount)){
            setChulbongCount(0);
        }

        if(validation.checkEmpty(pyeongCount)){
            setPyeongCount(0);
        }
    }

    const callAPIaddPositions = async () => {

        fnCheckValidation();

        const params = {
            chulbongCount : chulbongCount,
            pyeongCount : pyeongCount,
            latitude : props.latitude,
            longitude : props.longitude,
            content : content
        }

        const result = await addMapPositions(params);
        if(result.resultCode === 200){
            setSnackBarMsg("등록이 완료되었습니다.");
            setSnackBarOpen(true);
            props.callAPIgetMapPositionsAll();
            props.onClosePositionDrawer();
            props.drawPositions()
        }
    }

    return (
        <div className={style.drawer}>
            <span onClick={()=>props.onClosePositionDrawer()}>
                <FontAwesomeIcon
                className={style.baricon}
                icon={faChevronDown}
                />
            </span>
            <ChulbongInput
                chulbongCount = {chulbongCount}
                pyeongCount = {pyeongCount}
                fnChangeChulbongCount = {fnChangeChulbongCount}
                fnChangePyeongCount = {fnChangePyeongCount}
                />
            <ContentInput
                fnChangeContent={fnChangeContent}
                />
            <div className={style.addbtn}
                 onClick={callAPIaddPositions}>
                <span className={style.text}>
                    확인
                </span>
            </div>
        </div>
    )
});

export default AddPositionsDrawer;