import {Default, Mobile} from "./utils/layout/MediaQuery";
import GlobalStyles from "./utils/layout/GlobalStyles";
import SinglePage from "./utils/layout/MobileFrame/SinglePage/SinglePage";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Map from "./components/Map"


function App() {
  return (
      <>
        <GlobalStyles/>
          <BrowserRouter>
            <Mobile>
              <SinglePage>
                <Routes>
                    {/*<Route exact path="/" element={<Home />}/>*/}
                    <Route exact path="/" element={<Map />}/>
                    <Route path="/map" element={<Map />}/>
                </Routes>
              </SinglePage>
            </Mobile>
            <Default>
                <SinglePage>
                    <Routes>
                        {/*<Route exact path="/" element={<Home />}/>*/}
                        <Route exact path="/" element={<Map />}/>
                        <Route path="/map" element={<Map />}/>
                    </Routes>
                </SinglePage>
            </Default>
          </BrowserRouter>
      </>
  );
}

export default App;
