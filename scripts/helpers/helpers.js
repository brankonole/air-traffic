/**
 * Global namespace
 */
var APP = APP || {};

APP.helpers = {
    getUserLocation: () => {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                resolve(pos)
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