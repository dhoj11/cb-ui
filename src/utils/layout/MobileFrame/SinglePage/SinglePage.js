import React from "react"
import Header from "../Header/Header";
import style from "./SinglePage.module.css"

const SinglePage = ({children}) => {
    return (
        <div className={style.frame}>
            {/*<div className={style.header}>*/}
            {/*    <Header/>*/}
            {/*</div>*/}
            <div className={style.content}>
                {children}
            </div>

        </div>
    )
}

export default SinglePage;