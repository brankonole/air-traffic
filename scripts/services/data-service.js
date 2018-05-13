/**
 * Global namespace
 */
var APP = APP || {};

APP.dataService = (() => {
    return {
        getFlights: (location = { lat: 0, lng: 0 }) => {
            return APP.util.ajax({
                type: 'GET',
                dataType: 'jsonp',
                url: APP.CONFIG.URLS.aircraftList,
                data: `lat=${location.lat}&lng=${location.lng}&fDstL=0&fDstU=100`
            })
        }
    }
})()