import React, {useEffect, useState} from "react"
import style from "./CommentInput.module.css"
import {observer} from "mobx-react";
import store from "../../../store/Store";
import validation from "../../../../../utils/validation";
import {addMapComment, getMapPositionsBoards} from "../../../../../apis/MapApis";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";

const CommentInput = observer((props) => {

    const {
        setSnackBarOpen,
        setSnackBarMsg
    } = store

    const selectedPositionId = props.selectedPositionId

    const [content, setContent] = useState();

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
                props.fnUpdateComments(true);
                setSnackBarOpen(true);
                setSnackBarMsg("코멘트 등록이 완료되었습니다.");
                setContent("");
            }
            else if(result.resultCode === 500){
                setSnackBarMsg("서버오류입니다. 잠시 후 다시시도해주세요.");
                setSnackBarOpen(true);
            }
        }
    }

    const fnChangeContent = (event) => {
        setContent(event.target.value)
    }


    return (
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
    )
});

export default CommentInput;