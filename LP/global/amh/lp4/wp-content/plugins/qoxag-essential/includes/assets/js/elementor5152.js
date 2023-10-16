(function ($, elementor) {
	"use strict";
	

	var QOXAG = {
		init: function () {
			var widgets = {
                'elementskit-popup-modal.default': QOXAG.PopupModal,
			};

			$.each(widgets, function (widget, callback) {
				elementor.hooks.addAction('frontend/element_ready/' + widget, callback);
			});
		},

		ShowModal: function( $modal, $content, hasCookie ) {
			if ( hasCookie ) {
				return;
			}

			let openModals = $.find( '.ekit-popup-modal.show' );
			openModals.forEach( m => $( m ).removeClass( 'show' ) );

			let animation = $content.data( 'animation' );

			$modal.addClass( 'show' );
			animation && $content.addClass( animation );
		},

        PopupModal: function( $scope ) {
			var widgetId = $scope.data( 'id' ),
				settings = $scope.data( 'settings' ),
				isCookie = settings && ( 'enable_cookie_consent' in settings ), // Cookie shouldn't work on editor page.
				hasCookie = isCookie && document.cookie.match( 'popup_cookie_' + widgetId );

			var $modal = $scope.find( '.ekit-popup-modal' );
			var $content = $scope.find( '.ekit-popup__content' );

			var toggleType = $modal.data( 'toggletype' );
			var toggleAfter = $modal.data( 'toggleafter' );

			if ( ( toggleType === 'time' ) && ( toggleAfter > 0 ) ) {
				setTimeout( () => {
					QOXAG.ShowModal( $modal, $content, hasCookie );
				}, toggleAfter * 1000 );
			}

			var togglers = $scope.find( '.ekit-popup-modal__toggler-wrapper button, .ekit-popup-modal__toggler-wrapper img' );
			var closses = $scope.find( '.ekit-popup__close, .ekit-popup-modal__close, .ekit-popup-footer__close' );

			togglers.on( 'click', function( e ) {
				e.preventDefault();
				QOXAG.ShowModal( $modal, $content );
			} );

			closses.on( 'click', function( e ) {
				e.preventDefault();
				$modal.addClass( 'closing' );

				setTimeout( () => {
					$modal.removeClass( 'show' );
					$modal.removeClass( 'closing' );
				}, 450 );

				if ( isCookie ) {
					document.cookie = 'popup_cookie_' + widgetId + '=1; path=/';
				}
			} );
		},
	
	};
	$(window).on('elementor/frontend/init', QOXAG.init);
}(jQuery, window.elementorFrontend));
