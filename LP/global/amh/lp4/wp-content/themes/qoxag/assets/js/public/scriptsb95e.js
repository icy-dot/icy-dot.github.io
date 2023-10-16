/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 197:
/***/ (() => {

jQuery( function( $ ) {
	if ( $( '.sub-menu-toggle' ).length ) {
		$( '.sub-menu-toggle' ).on( 'click', function() {
			if ( $( window ).width() > 991 ) {
				return;
			}
			if ( $( this ).attr( 'aria-expanded' ) === 'false' ) {
				$( this ).attr( 'aria-expanded', 'true' );
			} else {
				$( this ).attr( 'aria-expanded', 'false' );
			}
			$( this ).siblings( '.sub-menu' ).slideToggle( 500 );
		} );
	}
	function menu_toggle( current ) {
		let target = current.attr( 'aria-controls' );
		if ( $( '#' + target ).hasClass( 'nav_menu_open' ) ) {
			$( '#' + target ).removeClass( 'nav_menu_open' );
		} else {
			$( '#' + target ).addClass( 'nav_menu_open' );
		}
		if ( ! current.hasClass( 'toggle' ) ) {
			current.addClass( 'toggle' );
		}
	}
	if ( $( '.nav-menu-toggle' ).length ) {
		$( '.nav-menu-toggle, .nav-menu-backdrop' ).on( 'click', function() {
			if ( $( '.nav-menu-toggle' ).hasClass( 'toggle' ) ) {
				$( '.nav-menu-toggle' ).removeClass( 'toggle' );
			}
			menu_toggle( $( this ) );
		} );
	}

	/* Font Zomm Effect */

	let size = '';

	function getSize() {
		size = $( '.entry-content > p' ).css( 'font-size' );
		size = parseInt( size, 10 );
	}

	getSize();

	$( '.zoomin' ).on( 'click', function() {
		if ( ( size + 2 ) <= 50 ) {
			$( '.entry-content > p' ).css( 'font-size', '+=2' );
		}
	} );

	$( '.zoomout' ).on( 'click', function() {
		if ( ( size - 2 ) >= 14 ) {
			$( '.entry-content > p' ).css( 'font-size', '-=2' );
		}
	} );

	/*
		Qoxag Post Tab widget
	*/
	$( document ).on( 'click', '.qoxag-tab-a', function( event ) {
		event.preventDefault();

		let parentSelector = $( this ).parents( '.qoxag-wrapper' );
		parentSelector.find( '.tab-pane' ).removeClass( ' show active' );
		parentSelector.find( ".tab-pane[data-id='" + $( this ).attr( 'data-id' ) + "']" ).addClass( ' active ' );
		parentSelector.find( '.qoxag-tab-a' ).removeClass( 'active' );
		$( this ).parent().find( '.qoxag-tab-a' ).addClass( 'active' );
	} );

	/**
	 *  Dark/Light Mode
	 */
	$( document ).on( 'click', '.change-mode', function() {
		var defaultSkin = $( 'html' ).data( 'skin' ),
			siteSkin = 'light';

		if ( $( 'html' ).hasClass( 'dark-mode' ) ) {
			siteSkin = 'dark';
		}

		var switchTo = ( siteSkin === 'dark' ) ? 'light' : 'dark';

		if ( 'undefined' !== typeof localStorage ) {
			localStorage.setItem( 'digi-skin', switchTo );
		}

		if ( defaultSkin === switchTo ) {
			$( 'html' ).removeClass( 'digi-skin-switch' );
		} else {
			$( 'html' ).addClass( 'digi-skin-switch' );
		}

		if ( switchTo === 'dark' ) {
			$( 'html' ).addClass( 'dark-mode' );
		} else {
			$( 'html' ).removeClass( 'dark-mode' );
		}
	} );

	/*
		sidebar sticky
	*/
	//eslint-disable-next-line
	if ( qoxag_ajax.blog_sticky_sidebar === 'yes' ) {
		$( '.main-container .row > .col-lg-4' ).theiaStickySidebar( {
			additionalMarginTop: 30,
		} );
	}

	/*
		Qoxag Preloader
	*/

	$( window ).on( 'load', function() {
		setTimeout( () => {
			$( '#preloader' ).addClass( 'loaded' );
		}, 1000 );
	} );

	// preloader close
	$( '.preloader-cancel-btn' ).on( 'click', function( e ) {
		e.preventDefault();
		if ( ! ( $( '#preloader' ).hasClass( 'loaded' ) ) ) {
			$( '#preloader' ).addClass( 'loaded' );
		}
	} );

	/*
		Qoxag Progressbar
	*/

	window.onscroll = function() {
		reading_progressbar();
	};
	function reading_progressbar() {
		var qoxag_winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		var qoxag_height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		var qoxag_scrolled = ( qoxag_winScroll / qoxag_height ) * 100;
		if ( document.getElementById( 'readingProgressbar' ) ) {
			document.getElementById( 'readingProgressbar' ).style.width = qoxag_scrolled + '%';
		}
	}

	reading_progress_bar_post();

	function reading_progress_bar_post() {
		var progressWrap = $( '.qoxag_progress_container' );
		var entry_top = $( '.entry-content' );

		if ( entry_top.length > 0 ) {
			if ( progressWrap.length > 0 ) {
				var didScroll = false,
					windowWrap = $( window ),

					contentWrap = $( '.entry-content' ),
					contentHeight = contentWrap.height(),
					windowHeight = windowWrap.height() * .85;

				$( window ).scroll( function() {
					didScroll = true;
				} );

				$( window ).on( 'resize', function() {
					windowHeight = windowWrap.height() * .85;
					progressReading();
				} );

				setInterval( function() {
					if ( didScroll ) {
						didScroll = false;
						progressReading();
					}
				}, 150 );

				var progressReading = function() {
					var windowScroll = windowWrap.scrollTop(),
						contentOffset = contentWrap.offset().top,
						contentScroll = ( windowHeight - contentOffset ) + windowScroll,
						progress = 0;

					if ( windowHeight > contentHeight + contentOffset ) {
						progressWrap.find( '.progress-bar' ).width( 0 );
					} else {
						if ( contentScroll > contentHeight ) {
							progress = 100;
						} else if ( contentScroll > 0 ) {
							progress = ( contentScroll / contentHeight ) * 100;
						}

						progressWrap.find( '.progress-bar' ).width( progress + '%' );
					}
				};
			}
		} else {
			return false;
		}
	}

	$.fn.isInViewport = function() {
		let elementTop = $( this ).offset().top;
		let elementBottom = elementTop + $( this ).outerHeight();

		let viewportTop = $( window ).scrollTop();
		let viewportBottom = viewportTop + $( window ).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	$( window ).on( 'scroll', function() {
		$( '.ajax-loader-current-url' ).each( function() {
			if ( $( this ).isInViewport() ) {
				var current_url = $( this ).data( 'current-url' );
				if ( window.location.href !== current_url ) {
					window.history.pushState( 'html', 'title', current_url );
				}
			}
		} );

		$( '.blog-ajax-load-more-trigger' ).each( function( index ) {
			if ( $( this ).isInViewport() ) {
				var current_post = index + 1;
				var _this = $( this );
				var next_post_url = $( this ).data( 'next-post-url' );
				var max_posts = $( this ).data( 'max-posts' );
				var content_loaded = $( this ).data( 'content-loaded' );

				if ( current_post >= max_posts ) {
					_this.fadeOut( 2000 );
					return;
				}

				if ( content_loaded === 'no' ) {
					$.ajax( {
						type: 'GET',
						url: next_post_url,
						success: function( content ) {
							var content1 = $( content ).find( '#blog-ajax-load-more-container' ).html();
							_this.after( content1 );
						},
					} );
				}
				_this.fadeOut( 2000 );
				_this.data( 'content-loaded', 'yes' );
			}
		} );
	} );
	/*--------------scroll end---------*/
	add_book_mark();

	function add_book_mark() {
		var self = this;
		$( '.read-it-later' ).off( 'click' ).on( 'click', function( e ) {
			e.preventDefault();
			e.stopPropagation();
			var target = $( this );
			var postID = target.data( 'bookmarkid' );
			if ( ! postID ) {
				return;
			}
			var dataBookMark = $.cookie( 'RBBookmarkData' );
			if ( dataBookMark ) {
				dataBookMark = JSON.parse( dataBookMark );
			}
			if ( typeof dataBookMark !== 'object' || null === dataBookMark || ! dataBookMark ) {
				dataBookMark = [];
			}
			dataBookMark = self.toggleArrayItem( target, dataBookMark, postID );
			$.cookie( 'RBBookmarkData', JSON.stringify( dataBookMark ), { expires: 30, path: '/' } );
			$( window ).trigger( 'RB:CountBookmark' );
		} );
	}

	//eslint-disable-next-line
	if ( fontList ) {
		//eslint-disable-next-line
		const observeFontList = fontList.map( ( fontName ) => {
			//eslint-disable-next-line
			const observer = new FontFaceObserver( fontName );
			return observer.load();
		} );

		Promise.all( observeFontList ).then( function() {
			document.documentElement.className += ' fonts-loaded';
		} );
	} else {
		//eslint-disable-next-line
		const interObserver = new FontFaceObserver( 'Inter' );
		//eslint-disable-next-line
		const zillaSlabObserver = new FontFaceObserver( 'Zilla Slab' );
		//eslint-disable-next-line
		const robotoSlabObserver = new FontFaceObserver( 'Roboto' );
		Promise.all( [
			interObserver.load(),
			zillaSlabObserver.load(),
			robotoSlabObserver.load(),
		] ).then( function() {
			document.documentElement.className += ' fonts-loaded';
		} );
	}
} );


/***/ }),

/***/ 875:
/***/ (() => {

( function( $, elementor ) {
	'use strict';

	var Qoxag = {
		init: function() {
			var widgets = {
				'back-to-top.default': Qoxag.BackToTop,
				'post-slider.default': Qoxag.PostSlider,
				'main-slider.default': Qoxag.MainSlider,
				'news-ticker.default': Qoxag.NewsTicker,
				'post-videotab.default': Qoxag.VideoPopup,
				'post-loadmore.default': Qoxag.Qoxag_Loadmore,
				'post-masonary.default': Qoxag.Qoxag_GallerySlider,
				'products-slider.default': Qoxag.Product_Slider,
				'audio-slider.default': Qoxag.Qoxag_AudioSlider,
				'post-grid.default': Qoxag.Qoxag_GallerySlider,
				'products-tab.default': Qoxag.Qoxag_ProductsTab,
			};
			$.each( widgets, function( widget, callback ) {
				elementor.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			} );
		},

		BackToTop: function( $scope ) {
			let $el = $scope.find( '.qoxag-back-top' );

			if ( $el.length > 0 ) {
				$( window ).on( 'scroll', function() {
					var scrolltop = $( window ).scrollTop(),
						docHeight = $( document ).height() / 2;

					if ( scrolltop > docHeight ) {
						$( $el ).fadeIn( 'slow' );
					} else {
						$( $el ).fadeOut( 'slow' );
					}
				} );
				$( $el ).click( function() {
					$( 'html, body' ).animate( { scrollTop: 0 }, 800 );
				} );
			}
		},

		// PostSlider
		PostSlider: function( $scope ) {
			let $container = $scope.find( '.qoxag-post-slider' );
			let controls = $container.data( 'controls' );

			let slides_to_show = controls.slides_to_show;
			let slide_loop = Boolean( controls.slide_loop );
			let slide_autoplay = Boolean( controls.slide_autoplay );
			let slide_autoplay_delay = parseInt( controls.slide_autoplay_delay );
			let slider_space_between = parseInt( controls.slider_space_between );
			let slides_per_group = controls.slides_per_group;
			let widget_id = controls.widget_id;

			if ( $container.length > 0 ) {
				// eslint-disable-next-line
				$($container).each(function (index, element) {
					let $element = $( element ).find( '.swiper-container' );
					new Swiper( $element, {
						slidesPerView: parseInt( slides_to_show.desktop ),
						centeredSlides: false,
						spaceBetween: slider_space_between,
						loop: slide_loop,
						slidesPerGroup: slides_per_group.desktop,
						wrapperClass: 'swiper-wrapper',
						slideClass: 'swiper-slide',
						grabCursor: false,
						allowTouchMove: true,
						speed: 1200, //slider transition speed
						parallax: true,
						autoplay: slide_autoplay ? { delay: slide_autoplay_delay } : false,
						effect: 'slide',
						mousewheelControl: 1,
						pagination: {
							el: '.swiper-pagination',
							type: 'bullets',
							dynamicBullets: true,
							clickable: true,
						},
						navigation: {
							nextEl: `.swiper-next-${widget_id}`,
							prevEl: `.swiper-prev-${widget_id}`,
						},
						breakpoints: {
							0: {
								slidesPerView: parseInt( slides_to_show.mobile ),
								slidesPerGroup: parseInt( slides_per_group.mobile ),
							},
							767: {
								slidesPerView: parseInt( slides_to_show.tablet ),
								slidesPerGroup: parseInt( slides_per_group.tablet ),
							},
							1024: {
								slidesPerView: parseInt( slides_to_show.desktop ),
								slidesPerGroup: parseInt( slides_per_group.desktop ),
							},
						},
					} );
				} );
			}
		},

		// MainSlider
		MainSlider: function( $scope ) {
			let $container = $scope.find( '.qoxag-main-slider' );
			let controls = $container.data( 'controls' );

			let slides_to_show = controls.slides_to_show;
			let slide_loop = Boolean( controls.slide_loop );
			// let slide_autoplay = Boolean( controls.slide_autoplay );
			// let slide_autoplay_delay = parseInt( controls.slide_autoplay_delay );
			let slider_space_between = parseInt( controls.slider_space_between );

			if ( $container.length > 0 ) {
				// eslint-disable-next-line
				var galleryTop = new Swiper(".qoxag-main-slider-container", {
					loop: slide_loop,
					loopedSlides: 5, //looped slides should be the same
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					thumbs: {
						swiper: new Swiper( '.qoxag-thumb-slider-container', {
							spaceBetween: slider_space_between,
							slidesPerView: slides_to_show.desktop,
							loop: slide_loop,
							freeMode: true,
							loopedSlides: 5, //looped slides should be the same
							watchSlidesVisibility: true,
							watchSlidesProgress: true,
							breakpoints: {
								0: {
									slidesPerView: parseInt( slides_to_show.mobile ),
								},
								767: {
									slidesPerView: parseInt( slides_to_show.tablet ),
								},
								1024: {
									slidesPerView: parseInt( slides_to_show.desktop ),
								},
							},
						} ),
					},
				} );

				$( '.xts-play_icon' ).magnificPopup( {
					type: 'iframe',
					mainClass: 'mfp-with-zoom',
					zoom: {
						enabled: true, // By default it's false, so don't forget to enable it

						duration: 300, // duration of the effect, in milliseconds
						easing: 'ease-in-out', // CSS transition easing function

						opener: function( openerElement ) {
							return openerElement.is( 'img' ) ? openerElement : openerElement.find( 'img' );
						},
					},
				} );
			}
		},
		VideoPopup: function( $scope ) {
			let $container = $scope.find( '.xts-play_icon' );
			if ( $container.length > 0 ) {
				$( '.xts-play_icon' ).magnificPopup( {
					type: 'iframe',
					mainClass: 'mfp-with-zoom',
					zoom: {
						enabled: true, // By default it's false, so don't forget to enable it

						duration: 300, // duration of the effect, in milliseconds
						easing: 'ease-in-out', // CSS transition easing function

						opener: function( openerElement ) {
							return openerElement.is( 'img' ) ? openerElement : openerElement.find( 'img' );
						},
					},
				} );
			}
		},

		/* ----------------------------------------------------------- */
		/*  news ticker
      	/* ----------------------------------------------------------- */
		NewsTicker: function( $scope ) {
			let $container = $scope.find( '.trending-slide .slider-container .swiper-container ' );

			if ( $container.length > 0 ) {
				// eslint-disable-next-line
				new Swiper($container, {
					slidesPerView: 1,
					centeredSlides: false,
					loop: true,
					wrapperClass: 'swiper-wrapper',
					slideClass: 'swiper-slide',
					grabCursor: false,
					allowTouchMove: true,
					speed: 1500, //slider transition speed
					parallax: true,
					autoplay:  true ? { delay: 4000 } : 0, //delay between two slides
					effect: 'slide',
					mousewheelControl: 1,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				} );
			}
		},

		/* ----------------------------------------------------------- */
		/*   Post grid ajax load
		/* ----------------------------------------------------------- */

		Qoxag_Loadmore: function( $scope ) {
			var $container = $scope.find( '.post-grid-loadmore' );
			if ( $container.length > 0 ) {
				$container.on( 'click', function( event ) {
					event.preventDefault();

					var $that = $( this );
					var ajaxjsondata = $that.data( 'json_grid_meta' );
					var qoxag_json_data = Object( ajaxjsondata );

					var contentwrap = $scope.find( '.grid-loadmore-content' ), // item contentwrap
						postperpage = parseInt( qoxag_json_data.query_posts_per_page ), // post per page number
						showallposts = parseInt( qoxag_json_data.total_post ); // total posts count

					var items = contentwrap.find( '.grid-item' ),
						totalpostnumber = parseInt( items.length ),
						paged = parseInt( totalpostnumber / postperpage ) + 1; // paged number

					$.ajax( {
						// eslint-disable-next-line
						url: qoxag_ajax.ajax_url,
						type: 'POST',
						data: { action: 'qoxag_post_ajax_loading', ajax_json_data: ajaxjsondata, paged: paged },
						beforeSend: function() {
							$( '<i class="fa fa-spinner fa-spin" style="margin-left:10px"></i>' ).appendTo( '#post-grid-loadmore' ).fadeIn( 100 );
						},
						complete: function() {
							$scope.find( '.post-grid-loadmore .fa-spinner ' ).remove();
						},
					} )

						.done( function( data ) {
							var $pstitems = $( data );
							$scope.find( '.grid-loadmore-content' ).append( $pstitems );
							var newLenght = contentwrap.find( '.grid-item' ).length;

							if ( showallposts <= newLenght ) {
								$scope.find( '.post-grid-loadmore' ).fadeOut( 300, function() {
									$scope.find( '.post-grid-loadmore' ).remove();
								} );
							}
						} )

						.fail( function() {
							$scope.find( '.post-grid-loadmore' ).remove();
						} );
				} );
			}
		},

		// Product Slider
		Product_Slider: function( $scope ) {
			let $container = $scope.find( '.products-slider' );
			let controls = $container.data( 'controls' );

			let slides_to_show = controls.post_count;
			let slide_autoplay = Boolean( controls.auto_play );
			let slide_autoplay_delay = 2500;

			if ( $container.length > 0 ) {
				// eslint-disable-next-line
					$($container).each(function (index, element) {
					let $element = $( element ).find( '.swiper-container' );
					new Swiper( $element, {
						slidesPerView: slides_to_show,
						centeredSlides: false,
						spaceBetween: 30,
						loop: true,
						slidesPerGroup: 1,
						wrapperClass: 'swiper-wrapper',
						slideClass: 'swiper-slide',
						grabCursor: false,
						allowTouchMove: true,
						speed: 1200, //slider transition speed
						parallax: true,
						autoplay: slide_autoplay ? { delay: slide_autoplay_delay } : false,
						effect: 'slide',
						mousewheelControl: 1,
						pagination: {
							el: '.swiper-pagination',
							type: 'bullets',
							dynamicBullets: true,
							clickable: true,
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
						breakpoints: {
							0: {
								slidesPerView: 1,
								slidesPerGroup: 1,
							},
							767: {
								slidesPerView: 2,
								slidesPerGroup: 2,
							},
							1024: {
								slidesPerView: slides_to_show,
								slidesPerGroup: slides_to_show,
							},
						},
					} );
				} );
			}
		},
		// Qoxag_GallerySlider
		Qoxag_GallerySlider: function( $scope ) {
			let $container = $scope.find( '.qoxag-gallery' );
			if ( $container.length > 0 ) {
				let controls = $container.data( 'controls' );

				let slides_to_show = controls.slides_to_show;
				let slide_loop = Boolean( controls.slide_loop );
				let slide_autoplay = true;
				let slide_autoplay_delay = parseInt( controls.slide_autoplay_delay );
				let slider_space_between = parseInt( controls.slider_space_between );

				// eslint-disable-next-line
				$($container).each(function (index, element) {
					let $element = $( element ).find( '.swiper-container' );
					new Swiper( $element, {
						slidesPerView: parseInt( slides_to_show.desktop ),
						spaceBetween: slider_space_between,
						loop: slide_loop,
						wrapperClass: 'swiper-wrapper',
						slideClass: 'swiper-slide',
						grabCursor: false,
						allowTouchMove: true,
						speed: 1200, //slider transition speed
						parallax: true,
						autoplay: slide_autoplay ? { delay: slide_autoplay_delay } : false,
						effect: 'slide',
						pagination: {
							el: '.swiper-pagination',
							type: 'bullets',
							dynamicBullets: true,
							clickable: true,
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},

					} );
				} );
			}
		},

		// Qoxag_AudioSlider
		Qoxag_AudioSlider: function( $scope ) {
			let $container = $scope.find( '.qoxag-post-slider' );
			if ( $container.length > 0 ) {
				let controls = $container.data( 'controls' );

				let slide_loop = Boolean( controls.slide_loop );
				let slide_autoplay = Boolean( controls.slide_autoplay );
				let slide_autoplay_delay = parseInt( controls.slide_autoplay_delay );
				let slider_space_between = parseInt( controls.slider_space_between );
				let widget_id = controls.widget_id;

				// eslint-disable-next-line
				$($container).each(function (index, element) {
					let $element = $( element ).find( '.swiper-container' );
					new Swiper( $element, {
						slidesPerView: 'auto',
						centeredSlides: true,
						spaceBetween: slider_space_between,
						loop: slide_loop,
						wrapperClass: 'swiper-wrapper',
						slideClass: 'swiper-slide',
						grabCursor: false,
						allowTouchMove: true,
						speed: 1200, //slider transition speed
						parallax: true,
						autoplay: slide_autoplay ? { delay: slide_autoplay_delay } : false,
						effect: 'slide',
						mousewheelControl: 1,
						pagination: {
							el: '.swiper-pagination',
							type: 'bullets',
							dynamicBullets: true,
							clickable: true,
						},
						navigation: {
							nextEl: `.swiper-next-${widget_id}`,
							prevEl: `.swiper-prev-${widget_id}`,
						},
					} );
				} );
			}
		},

		// Qoxag_AudioSlider
		Qoxag_ProductsTab: function( $scope ) {
			$scope.find( '.nav-tabs .product-tab-a' ).on( 'click', function() {
				$scope.find( '.tab-pane' ).removeClass( 'active' );
				$scope.find( ".tab-pane[data-id='" + $( this ).attr( 'data-id' ) + "']" ).addClass( 'active' );
				$scope.find( '.product-tab-a' ).removeClass( 'active' );
				$scope.find( this ).parent().find( '.product-tab-a' ).addClass( 'active' );
			} );
		},

	};
	$( window ).on( 'elementor/frontend/init', Qoxag.init );
}( jQuery, window.elementorFrontend ) );


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _custom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(197);
/* harmony import */ var _custom_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_custom_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elementor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(875);
/* harmony import */ var _elementor_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elementor_js__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Importing all widgets to compile
 * 1. Dependencies
 * 2. Elementor Scrips
 * 3. Custom theme scripts
 */




})();

/******/ })()
;