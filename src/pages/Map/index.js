import React, {useEffect, useState} from "react"
import style from "./Map.module.css"
import SearchInputBox from "./SearchInputBox";
import {observer} from "mobx-react";
import store from "./store/Store";
import SearchLocationList from "./SearchLocationList";
import {GetMapPositionsAll} from "../../apis/MapApis";
import validation from "../../utils/validation";
import {Drawer, Modal, Snackbar} from "@mui/material";
import PositionDialog from "./PositionDialog";
import AddPositionsDrawer from "./AddPositionsDrawer";
import point from "../../utils/img/point.png"
import addflag from "../../utils/img/flag.png"
import {faLocationArrow, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Menu from "./Menu";

/*global kakao*/
const Map = observer(() => {

    const {
        map,                // 카카오맵 객체
        positions,          // 등록된 위치정보
        latitude,           // 선택된 위도
        longitude,          // 선택된 경도
        snackbarOpen,       // 스낵바 활성화
        snackBarMsg,        // 스낵바 메세지

        setMap,
        setPositions,
        setLatitude,
        setLongitude,
        setSnackBarOpen,
        setSnackBarMsg,

    } = store

    const [selectedPosition, setSelectedPosition] = useState();
    const [selectLat, setSelectLat] = useState();
    const [selectLon, setSelectLon] = useState();

    const [addDrawerOpen, setAddDrawerOpen] = useState(false);

    const [positionDialogOpen, setPositionDialogOpen] = useState(false);

    const [searchListDialogOpen, setSearchListDialogOpen] = useState(false);

    const [menuDialogOpen, setMenuDialogOpen] = useState(false);


    useEffect( ()=>{
        fnInitMap();
        callAPIgetMapPositionsAll();
    },[])

    /*
    선택한 위치가 변경될 때마다 지도의 중심을 변경시킵니다.
     */
    useEffect(()=>{
        if( !validation.checkEmpty(latitude) && !validation.checkEmpty(longitude) ){
            fnMovePositions();
        }
    },[latitude, longitude])

    /*
    마커를 화면에 표시합니다.
     */
    useEffect(()=>{
        drawPositions();
    },[positions]);

    /*
    map 객체를 생성하고 초기화 합니다.
    생성된 객체를 스토어 상태에 저장합니다.
     */
    const fnInitMap = () => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 6
        };
        setMap(new kakao.maps.Map(container, options));
    }

    /*
    철봉 위치를 요청 API를 호출 합니다.
    위치 정보를 상태에 저장합니다.
     */
    const callAPIgetMapPositionsAll = async () => {
        const result = await GetMapPositionsAll();
        if(result.resultCode === 200){
            const resultData = result.resultData;
            const positionList = resultData.map( item => {
                return {
                    content : item.content,
                    latlng : new kakao.maps.LatLng(item.latitude, item.longitude),
                    positionId : item.position_id
                }
            })
            setPositions(positionList);
        }
    }

    /*
    선택한 위치로 지도의 중심을 이동합니다.
     */
    const fnMovePositions = () => {
        const moveLatLng = new kakao.maps.LatLng(latitude, longitude);
        if(!validation.checkEmpty(map)){
            map.panTo(moveLatLng);
            map.setLevel(3);
        }
    }

    /*
    현재위치정보 가져오기
    Geolocation
     */
    const fnGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setLatitude(lat);
                setLongitude(lon);

                fnMovePositions();
            });
        } else{
            setSnackBarMsg("현재 위치정보를 가져올 수 없습니다.");
            setSnackBarOpen(true);
        }
    }

    /*
    상태에 저장된 위치정보를 화면에 그려줍니다.
    이벤트 리스너를 등록합니다.
     */
    const drawPositions = () => {
        const icon = new kakao.maps.MarkerImage(addflag, new kakao.maps.Size(25, 25));
        const marker = new kakao.maps.Marker({image: icon});

        for (let i = 0; i < positions.length; i++) {
            const imageSize = new kakao.maps.Size(25, 25);
            const markerImage = new kakao.maps.MarkerImage(point, imageSize);

            let marker = new kakao.maps.Marker({
                map: map,
                position: positions[i].latlng,
                image: markerImage,
            });


            kakao.maps.event.addListener(marker, 'click', function () {
                setSelectedPosition(positions[i].positionId);
                onOpenPositionDialog();
            },  {passive: true})
        }

        if(!validation.checkEmpty(map)) {
            kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
                const latlng = mouseEvent.latLng;
                marker.setPosition(latlng);
                marker.setMap(map);
                setSelectLat(latlng.Ma);
                setSelectLon(latlng.La);
                onOpenAddDrawer();
            });
        }
    }

    const onOpenAddDrawer = () => {
        setAddDrawerOpen(true);
    }

    const onCloseAddDrawer = () => {
        setAddDrawerOpen(false);
    }

    const onOpenPositionDialog = () => {
        setPositionDialogOpen(true);
    }

    const onClosePositionDialog = () => {
        setPositionDialogOpen(false);
    }

    const onOpenMenuDialog = () => {
        setMenuDialogOpen(true);
    }

    const onCloseMenuDialog = () => {
        setMenuDialogOpen(false);
    }

    const onOpenSearchListDialog = () => {
        setSearchListDialogOpen(true);
    }

    const onCloseSearchListDialog = () => {
        setSearchListDialogOpen(false);
    }

    const onCloseSnackBar = () => {
        setSnackBarOpen(false);
        setSnackBarMsg("");
    }

    return (
        <div className={style.container}>
            <div className={style.search}>
                <SearchInputBox
                    searchListDialogOpen={searchListDialogOpen}
                    onOpenMenuDialog={onOpenMenuDialog}
                    onOpenSearchListDialog={onOpenSearchListDialog}
                    onCloseSearchListDialog={onCloseSearchListDialog}
                />
            </div>
            <div id='map' className={style.map}>
                <div className={style.geoLocationIcon}
                     onClick={fnGetLocation}>
                    <FontAwesomeIcon className={style.icon} icon={faLocationArrow}/>
                </div>
                <div className={style.questionIcon}
                     onClick={onOpenMenuDialog}>
                        <FontAwesomeIcon className={style.icon} icon={faPaperPlane}/>
                </div>
            </div>

            {/*위치추가 드로어블*/}
            <Drawer
                    PaperProps={{sx: {
                                    maxWidth: "400px",
                                    width: "100%",
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    margin: "auto"},
                                }}

                    style={{
                            borderRadius: "20px",
                            position: 'absolute',
                            maxWidth: "400px",
                            width: "100%",
                            }}
                    anchor='bottom'
                    variant="temporary"
                    open={addDrawerOpen}
                    >
                    <AddPositionsDrawer
                        latitude={selectLat}
                        longitude={selectLon}
                        callAPIgetMapPositionsAll={callAPIgetMapPositionsAll}
                        drawPositions={drawPositions}
                        onCloseAddDrawer={onCloseAddDrawer}
                    />
            </Drawer>

            {/*위치검색 다이얼로그*/}
            <Modal
                open={searchListDialogOpen}
                onClose={onCloseSearchListDialog}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableAutoFocus={true}
                disableRestoreFocus={true}
                style={{zIndex:50}}
            >
                <SearchLocationList
                    onCloseSearchListDialog={onCloseSearchListDialog}/>

            </Modal>

            {/*마커정보 다이얼로그*/}
            <Modal
                open={positionDialogOpen}
                onClose={onClosePositionDialog}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <PositionDialog
                        selectedPositionId = {selectedPosition}
                    />

            </Modal>

            {/*메뉴 다이얼로그*/}
            <Modal
                open={menuDialogOpen}
                onClose={onCloseMenuDialog}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Menu/>
            </Modal>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                onClose={onCloseSnackBar}
                message={snackBarMsg}
                autoHideDuration={3000}
                />
        </div>
    )
});


export default Map;