import React, {useEffect, useState} from "react"
import style from "./NoticeList.module.css"
import {observer} from "mobx-react";
import store from "../../../store/Store";
import {getNoticeAll} from "../../../../../apis/NoticeApis.";
import NoticeItem from "../NoticeItem";


const NoticeList = observer((props) => {

    const {
        setSnackBarOpen,
        setSnackBarMsg
    } = store

    const [noticeList, setNoticeList] = useState([]);

    useEffect(()=>{
        callAPIgetNoticeAll();
    },[])

    const callAPIgetNoticeAll = async () => {
        const result = await getNoticeAll();
        if(result.resultCode === 200){
            const resultData = result.resultData;
            setNoticeList(resultData);
        }
        else if(result.resultCode === 500){
            setSnackBarMsg("서버오류입니다. 잠시 후 다시시도해주세요.");
            setSnackBarOpen(true);
        }
    }

    return (
        <div className={style.list}>
            {
                noticeList.length > 0
                 ? noticeList.map(item=> {
                    return (
                        <NoticeItem
                            noticeNo={item.notice_no}
                            title={item.title}
                            date={item.date}
                            fnChangeSelectArticle={props.fnChangeSelectArticle}
                        />
                        )
                    })
                : <div className={style.loading}/>
            }
        </div>
    )
});

export default NoticeList;