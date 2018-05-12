/**
 * Global namespace
 */
var APP = APP || {};


APP.util = (function () {
	return {
		/**
		 * Function for showing and hiding loader
		 * @param  { String } 	option    Show or hide
		 */
		loader: function (option) {
			window.loader = window.loader || document.getElementById('loader');

			if (option === 'show') {
				window.loader.velocity('fadeIn', 100);
			} else if (option === 'hide') {
				window.loader.velocity('fadeOut', 100);
			}
		},

		/**
		 * Ajax with loader and some default settings
		 * @param  { Object }   options   Ajax options
		 * @return { Promise }            Ajax promise
		 */
		ajax: function (options) {
			const loaderTimeout = setTimeout(function () {
				APP.util.loader('show')
			}, 200);

			const ajaxOpts = $.extend(true, {}, {
				type: 'POST',
				dataType: 'json',
				error: (XMLHttpRequest, textStatus, errorThrown) => {
					document.dispatchEvent(new CustomEvent('ajax-error', {
						detail: { textStatus, errorThrown }
					}))
					console.error(textStatus)
				},
				complete: () => {
					// Hide loader
					clearTimeout(loaderTimeout);
					APP.util.loader('hide');
				}
			}, options)

			return $.ajax(ajaxOpts)
		}
	}
}());