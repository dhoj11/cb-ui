import React, {useEffect, useState} from "react"
import style from "./Board.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane, faExclamation, faComment} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import store from "../../store/Store";
import {addBoard} from "../../../../apis/BoardApis";
import validation from "../../../../utils/validation";

const Board = observer((props) => {

    const {
        setSnackBarOpen,
        setSnackBarMsg,
    } = store;

    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const onChangeContent = (event) => {
        setContent(event.target.value);
    }

    const callAPIaddBoard = async  () => {

        if( validation.checkEmpty(title) || validation.checkEmpty(content)){
            setSnackBarOpen(true);
            setSnackBarMsg("항목을 채워주세요.");
        }else {
            const params = {
                title: title,
                content: content
            }

            const result = await addBoard(params);
            if (result.resultCode === 200) {
                setSnackBarOpen(true);
                setSnackBarMsg("등록이 완료되었습니다.");
                setTitle("");
                setContent("");
            }
        }
    }


    return (
        <div className={style.board}>
            <div className={style.container}>
                <div className={style.title}>
                    <input type="text"
                           value={title|| ''}
                           onChange={onChangeTitle}
                           className={style.inputtitle}
                           placeholder="제목"/>

                </div>
                <div className={style.content}>
                    <input type="text"
                           onChange={onChangeContent}
                           value={content|| ''}
                           className={style.inputcontent}
                           placeholder="문의내용"/>
                </div>
            </div>
            <div className={style.btn}
                 onClick={callAPIaddBoard}>
                <span className={style.text}>작성완료</span>
            </div>
            <div className={style.desc}>
                    <span className={style.desctext}>
                        dev.chulbong@gmail.com
                    </span>
            </div>
        </div>
    )
});

export default Board;