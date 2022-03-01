import React from "react"
import {observer} from "mobx-react";
import style from "./Loading.module.css";


const Loading = observer((props) => {

    return(
        <div className="card ball-bouncing">
            <div className="ball"></div>
        </div>
    )


});

export default Loading


