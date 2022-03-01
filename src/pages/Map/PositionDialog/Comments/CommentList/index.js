import React, {useEffect, useState} from "react"
import style from "./CommentList.module.css"
import {observer} from "mobx-react";
import validation from "../../../../../utils/validation";
import {getMapPositionsBoards} from "../../../../../apis/MapApis";
import CommentItem from "../CommentItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";

const CommentList = observer((props) => {

    const selectedPositionId = props.selectedPositionId

    const [comments, setComments] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(()=>{
        callAPIgetPositionsBoards();
    }, [props.selectedPositionId, props.updateComments]);

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
                props.fnUpdateComments(false);
                setIsLoad(true);
            }
        }
    }

    return (
        isLoad
            ? comments.length > 0
                ? <div className={style.comments}>
                    {
                        comments.map(item=>{
                            return (
                                <CommentItem
                                    content = {item.content}
                                    date = {item.date}
                                    />
                            )
                        })
                    }
                    </div>
                : <div className={style.empty}>
                    <FontAwesomeIcon className={style.icon} icon={faExclamation}/>
                    <span>코멘트가 없습니다.</span>
                </div>
            : <div className={style.loading}>
                {""}
            </div>
    )
});

export default CommentList;