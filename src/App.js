import GlobalStyles from "./components/layout/GlobalStyles";
import SinglePage from "./components/layout/MobileFrame/SinglePage/SinglePage";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Map from "./pages/Map"
import {useEffect, useState} from "react";
import axios from "./utils/axios";
import {getAccessToken} from "./apis/AuthenticationApis";

function App() {

    const [isLoad, setIsLoad] = useState(false)

    useEffect(()=>{
        fnSetAuthenticationHeader();
    },[])

    const fnSetAuthenticationHeader = async () => {
        const result = await getAccessToken();
        axios.addAuthHeader(result);
        setIsLoad(true);
    }

  return (
      <>
        <GlobalStyles/>
          <BrowserRouter>
              {
                  isLoad &&
                      <SinglePage>
                        <Routes>
                            <Route exact path="/" element={<Map />}/>
                            <Route path="/map" element={<Map />}/>
                        </Routes>
                      </SinglePage>
              }
          </BrowserRouter>
      </>
  );
}

export default App;
