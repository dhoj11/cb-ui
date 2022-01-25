import React, {useState} from "react"
import {Link} from "react-router-dom";
import style from "./Home.module.css"

const Home = () => {
    return (
        <div className={style.home}>
            <Link to="/map">지도</Link>
        </div>
    )
}

export default Home;