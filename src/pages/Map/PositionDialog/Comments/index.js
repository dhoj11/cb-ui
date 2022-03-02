import React, { useState} from "react"
import style from "./Comments.module.css"
import {observer} from "mobx-react";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

const Comments = observer((props) => {

    const [updateComments, setUpdateComments] = useState(false);

    const fnUpdateComments = (value) => {
        setUpdateComments(value);
    }

    return (
        <>
            <CommentList
                selectedPositionId={props.selectedPositionId}
                updateComments={updateComments}
                fnUpdateComments={fnUpdateComments}
                />

            <CommentInput
                selectedPositionId={props.selectedPositionId}
                fnUpdateComments={fnUpdateComments}
                />
        </>
    )
});

export default Comments;