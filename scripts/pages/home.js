/**
 * Global namespace
 */
var APP = APP || {};

APP.homePage = () => {
    if (APP.homepageInited) {
        return
    }

    APP.homepageInited = true
    
    // Flights table
    const $tableWrapper = $('.js-table-wrapper')
    const $table = $('.js-table')
    const $details = $('.js-details')

    function formatDataForDT(data) {
        const newData = []

        for (let i = 0; i < data.acList.length; i++) {
            const item = data.acList[i]
            const row = {
                id: i + 1,
                angle: item.Trak || 'n/a',
                altitude: item.Alt || Number.MIN_VALUE,
                flightId: item.Id || 'n/a'
            }

            newData.push(row)
        }

        return newData
    }

    // DataTable initialising
    function initTable(data) {
        // Destroy existing DT
        if ($.fn.DataTable.isDataTable($table)) {
            $table.DataTable().destroy();
        }
        
        $table.dataTable({
            data: data,
            order: [[2, 'desc']],
            columns: [
                { data: 'id' },
                {
                    data: 'angle',
                    render: (data) => {
                        if (data >= 0 && data < 180) {
                            return `<span class="icon-airplane airplane-icon"></span>`
                        } else {
                            return `<span class="icon-airplane airplane-icon transformed"></span>`
                        }
                    }
                },
                {
                    data: 'altitude',
                    render: (data, type) => {
                        if (type === 'display' && data === Number.MIN_VALUE) {
                            return 'n/a'
                        }

                        return data
                    }
                },
                { data: 'flightId' }
            ],
            createdRow: function (row, data, index) {
                $(row).addClass('js-flight-row').attr('data-id', data.id);
            },
            pagingType: 'full_numbers',
            initComplete: () => {
                $tableWrapper.fadeIn()
            }
        })
    }

    $(document).on('click', '.js-flight-row', function() {
        let flightId = $(this).data('id')
        APP.router.navigate(`/details/${flightId}`)
    })

    APP.helpers.getUserLocation().then((location) => {
        if (APP.flightsData) {
            initTable(formatDataForDT(APP.flightsData))
        } else {
            const getFlights = () => {
                APP.dataService.getFlights().then((response) => {
                    initTable(formatDataForDT(response))
                    APP.flightsData = response
                })
            }

            getFlights()
            setInterval(getFlights, 6000)
        }  
    })
}