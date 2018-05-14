/**
 * Global namespace
 */
var APP = APP || {};

APP.dataService = (() => {
    return {
        getFlights: (location = { lat: 33.433638, lng: -112.008113 }) => {
            return APP.util.ajax({
                type: 'GET',
                dataType: 'jsonp',
                url: APP.CONFIG.URLS.aircraftList,
                data: `lat=${location.lat}&lng=${location.lng}&fDstL=0&fDstU=100`
            })
        }
    }
})()