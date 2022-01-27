import {Default, Mobile} from "./components/layout/MediaQuery";
import GlobalStyles from "./components/layout/GlobalStyles";
import SinglePage from "./components/layout/MobileFrame/SinglePage/SinglePage";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Map from "./pages/Map"

function App() {
  return (
      <>
        <GlobalStyles/>
          <BrowserRouter>
            {/*<Mobile>*/}
              <SinglePage>
                <Routes>
                    {/*<Route exact path="/" element={<Home />}/>*/}
                    <Route exact path="/" element={<Map />}/>
                    <Route path="/map" element={<Map />}/>
                </Routes>
              </SinglePage>
            {/*</Mobile>*/}
            {/*<Default>*/}
            {/*    <SinglePage>*/}
            {/*        <Routes>*/}
            {/*            /!*<Route exact path="/" element={<Home />}/>*!/*/}
            {/*            <Route exact path="/" element={<Map />}/>*/}
            {/*            <Route path="/map" element={<Map />}/>*/}
            {/*        </Routes>*/}
            {/*    </SinglePage>*/}
            {/*</Default>*/}
          </BrowserRouter>
      </>
  );
}

export default App;
