import React, {useEffect, useState} from "react"
import style from "./NoticeArticle.module.css"
import {observer} from "mobx-react";
import {getNoticeOne} from "../../../../../apis/NoticeApis.";
import Store from "../../../store/Store";

const NoticeArticle = observer((props) => {

    const {
        setSnackBarMsg,
        setSnackBarOpen,
    } = Store

    const selectArticle = props.selectArticle

    const [noticeArticle, setNoticeArticle] = useState();

    useEffect(()=>{
        callAPIgetNoticeOne();
    },[])

    const callAPIgetNoticeOne = async () => {

        const param = {
            notice_no : selectArticle
        }

        const result = await getNoticeOne(param);
        if(result.resultCode === 200){
            const resultData = result.resultData;
            setNoticeArticle(resultData);
        }
        else if(result.resultCode === 500){
            setSnackBarMsg("서버오류입니다. 잠시 후 다시시도해주세요.");
            setSnackBarOpen(true);
        }
    }

    return (
        <div className={style.article}>
            {
                noticeArticle
                    ? <div className={style.content}>
                            <span className={style.title}>{noticeArticle.title}</span>
                            <span className={style.date}>{noticeArticle.date}</span>
                            <span className={style.contentText}>{noticeArticle.content}</span>
                        </div>
                    : <div className={style.loading}/>

            }
        </div>
    )
});

export default NoticeArticle;