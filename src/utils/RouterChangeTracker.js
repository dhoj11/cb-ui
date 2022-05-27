import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const RouteChangeTracker = () => {

    const pathName = window.location.pathname;
    useEffect(() => {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
        ReactGA.set({page: pathName});
        ReactGA.pageview(pathName);
    }, [pathName]);

    return <></>;
}

export default RouteChangeTracker;