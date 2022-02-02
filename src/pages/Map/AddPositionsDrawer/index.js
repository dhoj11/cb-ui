import React, {useState} from "react"
import {addMapPositions} from "../../../apis/MapApis";
import {faGripLines, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import style from "./AddPositionsDrawer.module.css";
import validation from "../../../utils/validation";
import store from "../store/Store";
import {observer} from "mobx-react";

const AddPositionsDrawer = observer((props) => {
    const {
        setSnackBarOpen,
        setSnackBarMsg,
    } = store ;


    const [chulbongCount, setChulbongCount] = useState();
    const [pyeongCount, setPyeongCount] = useState();
    const [content, setContent] = useState();

    const fnChangeChulbongCount = (event) => {
        if(!validation.isNumeric(event.target.value)){
            setSnackBarMsg("숫자만 입력할 수 있습니다.");
            setSnackBarOpen(true);
            setChulbongCount(0)
        }else if(event.target.value > 20){
            setSnackBarMsg("입력수량을 확인해주세요.");
            setSnackBarOpen(true);
        }else{
            setChulbongCount(event.target.value)
        }
    }

    const fnChangePyeongCount = (event) => {
        if(!validation.isNumeric(event.target.value)){
            setSnackBarMsg("숫자만 입력할 수 있습니다.");
            setSnackBarOpen(true);
            setPyeongCount(0);
        }else if(event.target.value > 20){
            setSnackBarMsg("입력수량을 확인해주세요.");
            setSnackBarOpen(true);
        }else{
            setPyeongCount(event.target.value);
        }
    }

    const fnChangeContent = (event) => {
        setContent(event.target.value);
    }

    const callAPIaddPositions = async () => {

        let CCount = chulbongCount;
        let PCount = pyeongCount;


        if(validation.checkEmpty(CCount)){
            CCount = 0;
        }

        if(validation.checkEmpty(PCount)){
            PCount = 0;
        }

        const params = {
            chulbongCount : CCount,
            pyeongCount : PCount,
            latitude : props.latitude,
            longitude : props.longitude,
            content : content
        }

        const result = await addMapPositions(params);
        if(result.resultCode === 200){
            setSnackBarOpen(true);
            setSnackBarMsg("등록이 완료되었습니다.");
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
                /></span>
            <div className={style.info}>
                <div className={style.chulbong}>
                    <span className={style.name}>철봉</span>
                    <input type="text"
                           className={style.count}
                           onChange={fnChangeChulbongCount}
                           value={chulbongCount}
                           placeholder="0"/>
                </div>
                <div className={style.pyeong}>
                    <span className={style.name}>평행봉</span>
                    <input type="text"
                           className={style.count}
                           onChange={fnChangePyeongCount}
                           value={pyeongCount}
                           placeholder="0"/>
                </div>
            </div>
            <div className={style.inputwrapper}>
                <input type="text"
                       className={style.input}
                       onChange={fnChangeContent}
                       placeholder="설명을 입력해 주세요."
                        />
            </div>

            <div className={style.addbtn}
                 onClick={()=>{callAPIaddPositions()}}>
                <span className={style.text}>
                    확인
                    {/*<FontAwesomeIcon className={style.addicon} icon={faCheck}/>*/}
                </span>
            </div>
        </div>
    )
});

export default AddPositionsDrawer;