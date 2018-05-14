/**
 * Global namespace
 */
var APP = APP || {};

APP.helpers = {
    getUserLocation: () => {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                userPos = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
                
                resolve(userPos)
            }, function (err) {
                APP.helpers.errorMessage('Error, location is required')

                reject(err)
            });
        })
    },

    errorMessage: (message = 'Error, please try again later') => {
        new Noty({
            type: 'error',
            text: message,
            timeout: 5000
        }).show();
    }
}