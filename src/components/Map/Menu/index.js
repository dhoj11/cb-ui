import React, {useState} from "react"
import style from "./Menu.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane, faExclamation, faComment, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react";
import store from "../store/Store";
import Board from "./Board";


const Menu = observer((props) => {

    const {
    setSnackBarOpen,
        setSnackBarMsg
    } = store

    const [openBoard, setOpenBoard] = useState(false);

    const onClickNotice = () => {
        setSnackBarOpen(true);
        setSnackBarMsg("준비중입니다.");
    }

    const onClickBoard = () => {
        setOpenBoard(true);
    }

    const onCloseBoard = () => {
        setOpenBoard(false);
    }

    return (
        <div className={style.menu}>
            <div className={style.top}>
                <div className={style.title}>
                    <span className={style.title1}>매일</span>
                    <span className={style.title2}>철봉</span>
                </div>
                <div className={style.desc}>
                    <span className={style.sub}>함께 만드는 철봉지도</span>
                </div>
            </div>
            {
                openBoard
                &&<div className={style.close}>
                    <FontAwesomeIcon className={style.closeicon}
                                     icon={faChevronLeft}
                                     onClick={onCloseBoard}/></div>
            }
            <div className={style.content}>
                {
                    openBoard
                        ? <Board
                            onCloseBoard={onCloseBoard}/>
                        : <div className={style.menulist}>
                            <div className={style.menuitem}
                                 onClick={onClickNotice}>
                                <span><FontAwesomeIcon className={style.menuicon} icon={faPaperPlane}/></span>
                                <span className={style.menutitle}>공지사항</span>
                            </div>

                            <div className={style.menuitem}
                                 onClick={onClickBoard}>
                                <span><FontAwesomeIcon className={style.menuicon} icon={faPaperPlane}/></span>
                                <span className={style.menutitle}>문의하기</span>
                            </div>
                        </div>
                }



            </div>


            <div className={style.bottom}>
                {/*<span><FontAwesomeIcon className={style.icon} icon={faExclamation}/></span>*/}
                {/*<p className={style.notice}>*/}
                {/*    현재 서비스 개편 진행중입니다.<br/>*/}
                {/*    서비스가 불안정 할 수 있습니다.<br/>*/}
                {/*</p>*/}
                {/*<div>*/}
                {/*    <a href="https://open.kakao.com/o/gU0WMaPc">*/}
                {/*        <span><FontAwesomeIcon className={style.talk} icon={faComment}/></span>*/}
                {/*    </a>*/}
                {/*</div>*/}
                <span className={style.author}>매일철봉 v2.0</span>
            </div>
        </div>
    )
});

export default Menu;