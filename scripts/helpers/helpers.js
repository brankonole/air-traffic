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
                new Noty({
                    type: 'error',
                    text: 'Error, location is required',
                    timeout: 5000
                }).show()

                reject(err)
            });
        })
    }
}