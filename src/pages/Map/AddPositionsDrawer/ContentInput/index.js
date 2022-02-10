import React from "react"
import {observer} from "mobx-react";
import style from "./ContentInput.module.css";


const ContentInput = observer((props) => {

   return(
       <div className={style.inputwrapper}>
          <input type="text"
                 className={style.input}
                 onChange={props.fnChangeContent}
                 placeholder="설명을 입력해 주세요."
          />
       </div>
   )


});

export default ContentInput


