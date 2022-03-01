import React from "react"
import style from "./PositionDialog.module.css"
import {observer} from "mobx-react";
import Information from "./Information";
import Comments from "./Comments";

const PositionDialog = observer ((props) => {

    return (
        <div className={style.dialog}>
            <div className={style.container}>
                <Information
                    selectedPositionId={props.selectedPositionId}
                    />

                <Comments
                    selectedPositionId={props.selectedPositionId}
                    />
            </div>
        </div>
    )
});

export default PositionDialog;

