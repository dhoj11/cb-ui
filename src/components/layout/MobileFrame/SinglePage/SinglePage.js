import React, {useEffect, useState} from "react"
import style from "./SinglePage.module.css"

const SinglePage = ({children}) => {

    const [isload, setIsLoad] = useState(false);

    const setScreenSize = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        setIsLoad(true);
    }

    useEffect(()=>{
        setScreenSize();
    },[]);

    return (
        isload &&
            <div className={style.frame}>
                <div className={style.content}>
                    {children}
                </div>
            </div>
    )
}

export default SinglePage;