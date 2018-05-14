/**
 * Global namespace
 */
var APP = APP || {};

(function () {
    const $pages = $('.js-page')
    
    APP.router
        .add(/details\/(.*)/, (id) => {
            $pages.hide().filter('.js-details-page').show()
            APP.detailsPage(id)
        })
        .add('', () => {
            $pages.hide().filter('.js-home-page').show()
            APP.homePage()
        }).listen()

    APP.router.check()

    document.addEventListener('ajax-error', () => {
        APP.helpers.errorMessage();
    })
}());