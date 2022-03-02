import React, {useEffect, useState} from "react"
import style from "./Notice.module.css"
import {observer} from "mobx-react";
import NoticeArticle from "./NoticeArticle";
import NoticeList from "./NoticeList";

const Notice = observer((props) => {

    const [selectArticle, setSelectArticle] = useState(false);

    const fnChangeSelectArticle = (noticeNo) => {
        setSelectArticle(noticeNo)
    }

    return (
        selectArticle
            ? <NoticeArticle
                selectArticle={selectArticle}
                fnChangeSelectArticle={fnChangeSelectArticle}
                />
            : <NoticeList
                fnChangeSelectArticle={fnChangeSelectArticle}
                />

    )
});

export default Notice;