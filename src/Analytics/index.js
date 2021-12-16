import {getAnalytics, setUserId, setUserProperties, setCurrentScreen} from 'firebase/analytics';

class Analytics {


    setUser(id, pageName, props) {
        setUserId(getAnalytics(), id);
        setUserProperties(getAnalytics(), props);
        setCurrentScreen(getAnalytics(), 'authenticate')
    }
	//
    // page(screen: string, props?: { [key: string]: any }) {
	//
    //     setCurrentScreen(getAnalytics(), screen);
	//
    // }
	//
    // track(event: string, props?: { [key: string]: any }) {
	//
    //     logEvent(getAnalytics(), event, props);
	//
	//
    // }

    reset() {
    }
}

export default new Analytics();
