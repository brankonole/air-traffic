/**
 * Global namespace
 */
var APP = APP || {};

APP.detailsPage = (id) => {
    const $details = $('.js-details')
    
    function initDetails(data) {
        const d = data.acList[id]

        if (!d) {
            new Noty({
                type: 'error',
                text: 'Error, the data for this flight doesn\'t exists',
                timeout: 5000
            }).show()

            return
        }

        $details.html(`<div class="container">
                        <h3 class="details-title">Flight details <span class="icon icon-info-with-circle"></span></h3>
                        <div class="media details-content">
                            <img class="align-self-center mr-3 js-flight-img-placeholder" src="http://via.placeholder.com/250x150" alt="Placeholder image">
                            <img class="align-self-center mr-3 js-flight-img" src="https://logo.clearbit.com/${d.Man}.com?s=300" alt="${d.Man} image" style="display: none">
                            <div class="media-body">
                                <h5 class="mt-0 details-subheading">${d.Mdl || 'n/a'}</h5>
                                <p class="mt-0">
                                    <span class="details-strong">From:</span> ${d.From || 'n/a'}
                                </p>
                                <p class="mt-0">
                                    <span class="details-strong">To:</span> ${data.To || 'n/a'}
                                </p>
                            </div>
                        </div>
                    </div>`);

        $details.find('.js-flight-img').on('load', function() {
            $details.find('.js-flight-img-placeholder').hide()
            $(this).show()
        })
    }

    APP.helpers.getUserLocation().then((location) => {
        if (APP.flightsData) {
            initDetails(APP.flightsData)
        } else {
            APP.dataService.getFlights().then((response) => {
                initDetails(response)
                APP.flightsData = response
            })
        }
    })
}