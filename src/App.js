import GlobalStyles from "./components/layout/GlobalStyles";
import SinglePage from "./components/layout/MobileFrame/SinglePage/SinglePage";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Map from "./pages/Map"
import {useEffect, useState} from "react";
import axios from "./utils/axios";
import {getAccessToken} from "./apis/AuthenticationApis";
import {Box, CircularProgress} from "@mui/material";
import RouteChangeTracker from "./utils/RouterChangeTracker"

function App() {

    const [isLoad, setIsLoad] = useState(false);

    useEffect(()=>{
        fnSetAuthenticationHeader();
    },[])

    useEffect(()=>{
    },()=>{
        axios.delAuthHeader();
    },[])

    const fnSetAuthenticationHeader = async () => {
        const result = await getAccessToken();
        axios.addAuthHeader(result);
        setIsLoad(true);
    }

    return (
        <>
            <GlobalStyles/>
            <BrowserRouter>s
                <RouteChangeTracker/>
                {
                    isLoad
                        ? <SinglePage>
                            <Routes>
                                <Route exact path="/" element={<Map/>}/>
                                <Route path="/map" element={<Map/>}/>
                            </Routes>
                        </SinglePage>
                        : <Box sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            margin: "0 auto",
                            position: "absolute",
                            top: "50%"
                        }}>
                            <CircularProgress
                                size={50}/>
                        </Box>
                }
            </BrowserRouter>
        </>
    );
}

export default App;