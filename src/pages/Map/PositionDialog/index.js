import React, {useEffect, useState} from "react"
import style from "./PositionDialog.module.css"
import {addMapComment, getMapPositionsBoards, GetMapPositionsOne} from "../../../apis/MapApis"
import {observer} from "mobx-react";
import {faArrowUp, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import store from "../store/Store";
import validation from "../../../utils/validation";

const PositionDialog = observer ((props) => {

    const {
        setSnackBarOpen,
        setSnackBarMsg
    } = store

    const [selectedPositionId, setSelectedPositionId] = useState();

    const [positionInfo, setPositionInfo] = useState();
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState();


    useEffect(()=>{
        setSelectedPositionId(props.selectedPositionId)
    },[props.selectedPositionId])

    useEffect(()=>{
        callAPIgetPositionsOne();
        callAPIgetPositionsBoards();
    }, [selectedPositionId]);

    /*
    선탁한 위치의 정보를 불러옵니다.
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

    /*
    선택한 위치의 코멘트 정보를 불러옵니다.
     */
    const callAPIgetPositionsBoards = async () => {

        const params = {
            position_id : selectedPositionId
        }

        if(!validation.checkEmpty(selectedPositionId) ) {
            const result = await getMapPositionsBoards(params);
            if (result.resultCode === 200) {
                const resultData = result.resultData;
                setComments(resultData);
            }
        }
    }

    /*
    선택한 위치의 코멘트를 등록합니다.
     */
    const callAPIAddCommnet = async () => {

        if(validation.checkEmpty(content)){
            setSnackBarOpen(true);
            setSnackBarMsg("내용을 입력해주세요.");

        }else{

            const params = {
                positionId : selectedPositionId,
                content : content
            }

            const result = await addMapComment(params);
            if(result.resultCode === 200){
                setContent("");
                callAPIgetPositionsBoards();
                setSnackBarOpen(true);
                setSnackBarMsg("코멘트 등록이 완료되었습니다.");
                setContent("");
            }
        }
    }

    const fnChangeContent = (event) => {
        setContent(event.target.value)
    }

    return (
        <div className={style.dialog}>
            <div className={style.container}>
                {
                    positionInfo &&
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
                }
                {
                    comments.length > 0 &&
                        <div className={style.comments}>
                            {
                                comments.map(item=>{
                                    return (
                                        <div className={style.content}>
                                            <span className={style.text}>{item.content}</span>
                                            <span className={style.date}>{item.date}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }

                <div className={style.input}>
                    <input type="text"
                           value={content}
                           className={style.inputContent}
                           onChange={fnChangeContent}
                            />
                    <div className={style.button}
                        onClick={callAPIAddCommnet}>
                        <FontAwesomeIcon className={style.icon} icon={faArrowUp} />
                    </div>
                </div>
            </div>
        </div>
    )
});

export default PositionDialog;

