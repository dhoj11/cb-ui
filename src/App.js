import GlobalStyles from "./components/layout/GlobalStyles";
import SinglePage from "./components/layout/MobileFrame/SinglePage/SinglePage";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Map from "./pages/Map"

function App() {

  return (
      <>
        <GlobalStyles/>
          <BrowserRouter>
              <SinglePage>
                <Routes>
                    <Route exact path="/" element={<Map />}/>
                    <Route path="/map" element={<Map />}/>
                </Routes>
              </SinglePage>
          </BrowserRouter>
      </>
  );
}

export default App;
