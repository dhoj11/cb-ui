import React, {useEffect, useState} from "react"
import style from "./Map.module.css"
import SearchInputBox from "./SearchInputBox";
import {observer} from "mobx-react";
import store from "./store/Store";
import SearchLocationList from "./SearchLocationList";
import {GetMapPositionsAll} from "../../apis/MapApis";
import validation from "../../utils/validation";
import {Modal, Snackbar, SwipeableDrawer} from "@mui/material";
import PositionDialog from "./PositionDialog";
import AddPositionsDrawer from "./AddPositionsDrawer";
import point from "../../utils/img/point.png"
import addflag from "../../utils/img/flag.png"

const Bar = React.forwardRef((props, ref) => (
    <span {...props} ref={ref}>
        {props.children}
    </span>
));

/*global kakao*/
const Map = observer(() => {

    const {
        onFocusInputBox,
        latitude,
        longitude,
        positions,
        map,
        snackbarOpen,
        snackBarMsg,
        setSnackBarOpen,
        setSnackBarMsg,
        setMap,
        setPositions,
    } = store

    const [selectedPosition, setSelectedPosition] = useState();
    const [positionDialogOpen, setPositionDialogOpen] = useState(false);
    const [addPositionDrawerOpen, setAddPositionDrawerOpen] = useState(false);

    const [selectLat, setSelectLat] = useState();
    const [selectLon, setSelectLon] = useState();

    useEffect( ()=>{
        fnInitMap();
        callAPIgetMapPositionsAll();
        console.log("test_6");
    },[])


    useEffect(()=>{
        fnMovePositions();
    },[latitude, longitude])

    useEffect(()=>{
        drawPositions();
    },[positions]);

    const fnMovePositions = () => {
        const moveLatLng = new kakao.maps.LatLng(latitude, longitude);
        if(!validation.checkEmpty(map)){
            map.panTo(moveLatLng);
            map.setLevel(3);
        } else {
            console.log("map obj error...!")
        }
    }

    /*
    map 객체를 생성하고 초기화 합니다.
    생성된 객체를 상태에 저장합니다.
     */
    const fnInitMap = () => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 4
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
    상태에 저장된 위치정보를 화면에 그려줍니다.
    이벤트 리스너를 등록합니다.
     */
    const drawPositions = () => {
        const icon = new kakao.maps.MarkerImage(addflag, new kakao.maps.Size(31, 35));
        const marker = new kakao.maps.Marker({image: icon});

        for (let i = 0; i < positions.length; i++) {
            const imageSize = new kakao.maps.Size(31, 31);
            const markerImage = new kakao.maps.MarkerImage(point, imageSize);

            let marker = new kakao.maps.Marker({
                map: map,
                position: positions[i].latlng,
                image: markerImage,
            });


            kakao.maps.event.addListener(marker, 'click', function () {
                setSelectedPosition(positions[i].positionId)
                setPositionDialogOpen(true);
            })
        }

        if(!validation.checkEmpty(map)) {
            kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                const latlng = mouseEvent.latLng;
                marker.setPosition(latlng);
                marker.setMap(map);
                setSelectLat(latlng.Ma);
                setSelectLon(latlng.La);
                setAddPositionDrawerOpen(true);
            });
        }
    }

    const onClosePositionDialog = () => {
        setPositionDialogOpen(false);
    }

    const onClosePositionDrawer = () => {
        setAddPositionDrawerOpen(false);
    }

    const onOpenPositionDrawer = () => {
        setAddPositionDrawerOpen(true);
    }

    const onCloseSnackBar = () => {
        setSnackBarOpen(false);
        setSnackBarMsg("");
    }

    return (
        <div className={style.container}>
            <div className={style.searchwrapper}>
                <SearchInputBox/>
            </div>
                <div id='map' className={style.map}/>
                {
                    onFocusInputBox &&
                        <div className={style.searchlist}>
                            <SearchLocationList/>
                        </div>
                }

            <Modal
                open={positionDialogOpen}
                onClose={onClosePositionDialog}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Bar>
                    <PositionDialog
                        selectedPositionId = {selectedPosition}
                    />
                </Bar>
            </Modal>

            <SwipeableDrawer
                PaperProps={{sx: { height: "30%",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20, },}}
                style={{borderRadius: "20px"}}
                anchor='bottom'
                open={addPositionDrawerOpen}
                onClose={() => onClosePositionDrawer()}
                onOpen={() => onOpenPositionDrawer()}
                >
                <AddPositionsDrawer
                    latitude={selectLat}
                    longitude={selectLon}
                    callAPIgetMapPositionsAll={callAPIgetMapPositionsAll}
                    drawPositions={drawPositions}
                    onClosePositionDrawer={onClosePositionDrawer}
                    />
            </SwipeableDrawer>

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