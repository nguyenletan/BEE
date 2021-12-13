import {getAnalytics, setUserId} from 'firebase/analytics';

class Analytics {


    setUser(id) {
        setUserId(getAnalytics(), id);
        //setUserProperties(getAnalytics(), props);
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
