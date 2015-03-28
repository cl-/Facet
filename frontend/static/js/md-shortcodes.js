/**
 *
 * MD Shortcodes
 *
 * v2.0.0
 *
 * http://themesholic.com
 *
 */

 (function($){

"use strict";

var MD_SHORTCODES = window.MD_SHORTCODES || {};

function getAdminBarHeight(){
	var $return = 0;
	if ($('body').hasClass('admin-bar')){
		if($(window).width() > 782){
			$return = 32;
		} else {
			$return = 46;
		}
	}

	return $return;
}

MD_SHORTCODES.parallax = function(){
	
	$('body[data-device="desktop"][data-css3-animations="enabled"] [data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	});
	$('body[data-device="desktop"][data-css3-animations="enabled"] [data-type="background"]').each(function(){
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
	    $(window).scroll(function() {
			//if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
			//	 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
				var yPos = -($(window).scrollTop() / $self.data('speed')); 
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				var coords = '50% '+ yPos + 'px';
				$self.css({ backgroundPosition: coords });
				/*
				$('body[data-device="desktop"][data-css3-animations="enabled"] [data-type="sprite"]', $self).each(function() {
					var $sprite = $(this);
					var yPos = -($(window).scrollTop() / $sprite.data('speed'));					
					var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
					$sprite.css({ backgroundPosition: coords });													
				});
				*/
			// };
		});
	});
}



MD_SHORTCODES.buttons = function(){
	$('.md-button .lbl').mouseover(function(){
		var $p = $(this).parent('.md-button');
		$p.css('color', $p.data('color-hover'));
	}).mouseout(function(){
		var $p = $(this).parent('.md-button');
		$p.css('color', $p.data('color'));
	});


	$('.md-button.style-2 .lbl').mouseover(function(){
		var $p = $(this).parent('.md-button');
		$p.css('background-color', $p.css('color'));
	}).mouseout(function(){
		var $p = $(this).parent('.md-button');
		$p.css('background-color', 'transparent');
	});
}



MD_SHORTCODES.icons = function(){
	$('.md-icon i').mouseover(function(){
		var $el = $(this);
		$el.css('color', $el.data('color-hover'));
		$el.parent('.md-icon').css('background-color', $el.data('bg-hover'));
		$el.parent('.md-icon').css('border-color', $el.data('border-hover'));
	}).mouseout(function(){
		var $el = $(this);
		$el.css('color', $el.data('color'));
		$el.parent('.md-icon').css('background-color', $el.data('bg'));
		$el.parent('.md-icon').css('border-color', $el.data('border'));
	});

	$('.md-box-icon').mouseover(function(){
		var $el = $(this).find('.md-icon i').eq(0);
		$el.css('color', $el.data('color-hover'));
		$el.parent('.md-icon').css('background-color', $el.data('bg-hover'));
		$el.parent('.md-icon').css('border-color', $el.data('border-hover'));
	}).mouseout(function(){
		var $el = $(this).find('.md-icon i').eq(0);
		$el.css('color', $el.data('color'));
		$el.parent('.md-icon').css('background-color', $el.data('bg'));
		$el.parent('.md-icon').css('border-color', $el.data('border'));
	});
}

MD_SHORTCODES.accordions = function(){
	$('.md-accordions .panel-group').each(function(){
		var $uid = $(this).attr('id');
		if($uid){
			$(this).find('.panel-heading a').data('parent', '#'+$uid);

			$(this).find('.panel-heading a').on('click', function(){
				$(this).parents('.panel-group').find('.panel-heading a').addClass('collapsed');
			})
		}
	});

	$('.md-accordions.expanded .panel-group').each(function(){
		$(this).find('.panel .panel-heading a:first').removeClass('collapsed');
		$(this).find('.panel .panel-collapse:first').removeClass('collapse').addClass('in');
	});
}



MD_SHORTCODES.tabs = function(){
	$('.md-tabs .nav-tabs a').each(function(){
		var $uid = $(this).attr('href').split('#').join('');
		var $pos = $('.md-tabs .nav-tabs a').index(this);

		$('.md-tabs .tab-pane').eq($pos).attr('id', $uid);
	});

	$('.md-tabs').each(function(){
		$(this).find('.nav-tabs li').eq(0).addClass('active');
		$(this).find('.tab-pane').eq(0).addClass('active');
	})
}


MD_SHORTCODES.alerts = function(){
    $('.md-alert .message-close').on('click', function(){
    	$(this).parents('.md-alert-wrap').fadeOut();

    	return false;
    });
}


MD_SHORTCODES.tooltips = function(){ 
    $('[data-toggle=tooltip]').tooltip();
};



MD_SHORTCODES.counters = function(){
	
	$('.md-counter .number').scrolledIntoView().on('scrolledin', function () {
		if(!$(this).hasClass('end')){
			var $from = $(this).data('from'); 
			var $to = $(this).data('to'); 
			var $speed = $(this).data('speed'); 
			var $delay = $(this).data('delay');
			
			$(this).delay($delay).queue(function(){
				$(this).addClass('end').countTo({
					from: $from,
					to: $to,
					speed: $speed
				});
			});

		}
	});

}

MD_SHORTCODES.carousel = function(){ 
    $('.md-carousel').each(function(){
    	var $items 		 = $(this).data('items');
    	var $navigation  = Boolean($(this).data('navigation'));
    	var $pagination  = Boolean($(this).data('pagination'));
    	var $autoplay	 = Boolean($(this).data('autoplay'));

    	var $items_tablet = ($(this).data('items-tablet')) ? $(this).data('items-tablet') : 3;
    	var $items_mobile = ($(this).data('items-mobile')) ? $(this).data('items-mobile') : 1;

    	$(this).owlCarousel({
		    items 				: $items,
		    itemsDesktop 		: [1199, $items],
		    itemsDesktopSmall 	: [980, $items],
		    itemsTablet 		: [768, $items_tablet],
		    itemsMobile 		: [479, $items_mobile],
		    navigation 			: $navigation,
		    pagination 			: $pagination,
		    autoPlay			: $autoplay,
		    autoHeight 			: true
    	});
    });
};


MD_SHORTCODES.socialShare = function(){
	function sharePopup(url){
		var width = 600;
		var height = 400;
	    
	    var leftPosition, topPosition;
	    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
	    topPosition = (window.screen.height / 2) - ((height / 2) + 50);

	    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";

	    window.open(url,'Social Share', windowFeatures);
	}

	$('.md-social-share-facebook').on('click', function(){
	    var u = location.href;
	    var t = document.title;
		sharePopup('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t));
		return false;
	});


	$('.md-social-share-twitter').on('click', function(){
	    var u = location.href;
	    var t = document.title;
		sharePopup('http://twitter.com/share?url='+encodeURIComponent(u)+'&text='+encodeURIComponent(t));
		return false;
	});

	$('.md-social-share-google').on('click', function(){
	    var u = location.href;
	    var t = document.title;
		sharePopup('https://plus.google.com/share?url='+encodeURIComponent(u)+'&text='+encodeURIComponent(t));
		return false;
	});

	$('.md-social-share-pinterest').on('click', function(){
	    var u = location.href;
	    var t = document.title;
	    var i = $('#content').find('img').eq(0).attr('src');
		sharePopup('http://www.pinterest.com/pin/create/button/?url='+encodeURIComponent(u)+'&description='+encodeURIComponent(t)+'&media='+encodeURIComponent(i));
		return false;
	});

	// Loading SDK
	if( $('.fb-like').length > 0 || $('.twitter-share-button').length > 0 || $('.g-plusone').length > 0 || $('.pinterest-share').length > 0) {

	    //Twitter
	    if (typeof (twttr) != 'undefined') {
	        twttr.widgets.load();
	    } else {
	        $.getScript('http://platform.twitter.com/widgets.js');
	    }

	    //Facebook
	    if (typeof (FB) != 'undefined') {
	        FB.init({ status: true, cookie: true, xfbml: true });
	    } else {
	        $.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function () {
	            FB.init({ status: true, cookie: true, xfbml: true });
	        });
	    }

	    // Pinterest
	    if (typeof (pinterest) != 'undefined') {
		    pinterest.widgets.load();
		} else {
			$.getScript('http://assets.pinterest.com/js/pinit.js');
		}
	  
	    //Google - Note that the google button will not show if you are opening the page from disk - it needs to be http(s)
	    if (typeof (gapi) != 'undefined') {
	        $(".g-plusone").each(function () {
	            gapi.plusone.render($(this).get(0));
	        });
	    } else {
	        $.getScript('https://apis.google.com/js/plusone.js');
	    }

	}
}



MD_SHORTCODES.googleMaps = function(){
	if($('.md-map').length > 0){
		$('.md-map').each(function(i, e){

			var $map 		= $(e);
			var $map_id 	= $map.attr('id');
			var $map_type 	= $map.data('map-type');

			var $map_lat 	= $map.data('map-lat');
			var $map_lon 	= $map.data('map-lon');
			var $map_zoom 	= parseInt($map.data('map-zoom'));
			var $map_pin 	= $map.data('map-pin');
			var $map_title 	= $map.data('map-title');
			var $map_info 	= $map.data('map-info');
			var $map_scroll = $map.data('map-scroll');
			var $map_drag 	= $map.data('map-drag');
			var $map_zoom_control = $map.data('map-zoom-control');
			var $map_disable_doubleclick = $map.data('map-disable-doubleclick');
			var $map_streetview = $map.data('map-streetview');

			
			
			var latlng = new google.maps.LatLng($map_lat, $map_lon);			
			var options = { 
				scrollwheel: $map_scroll,
				draggable: $map_drag, 
				zoomControl: $map_zoom_control,
				disableDoubleClickZoom: $map_disable_doubleclick,
				zoom: $map_zoom,
				center: latlng,
				streetViewControl: $map_streetview
			};

			switch ($map_type){
				case 'HYBRID':
					options.mapTypeId = google.maps.MapTypeId.HYBRID;
				break;
				case 'ROADMAP':
					options.mapTypeId = google.maps.MapTypeId.ROADMAP;
				break;
				case 'SATELLITE':
					options.mapTypeId = google.maps.MapTypeId.SATELLITE;
				break;
				case 'TERRAIN':
					options.mapTypeId = google.maps.MapTypeId.TERRAIN;
				break;
			}
			
			var map = new google.maps.Map(document.getElementById($map_id), options);
			
			if($map_pin){
				var marker = new google.maps.Marker({
					position: latlng,
					map: map,
					title: $map_title,
					icon: $map_pin
				});
			
				if($map_info){		
					var infowindow = new google.maps.InfoWindow({
						content: $map_info
					});


					google.maps.event.addListener(marker, 'click', function() {
		      			infowindow.open(map, marker);
		    		});
				}	
			}
		});
	}
}

MD_SHORTCODES.progressBar = function(){
	$('.md-progress-bar.progress-animate').scrolledIntoView().on('scrolledin', function () { 
		var $progress_width = $(this).find('span.increment').data('percent');
		$(this).find('span.increment').animate({
			width : $progress_width+'%'
		}, 800, 'easeInOutExpo', function(){
			$(this).find('.percent').fadeIn();
		});
	});


	var chart = $(".md-progress-circular .circular");
	
	$(chart).each(function() {
		var currentChart = $(this),
			currentSize = currentChart.attr('data-size'),
			currentLine = currentChart.attr('data-line'),
			currentBgColor = currentChart.attr('data-bgcolor'),
			currentTrackColor = currentChart.attr('data-trackcolor');
		currentChart.easyPieChart({
			animate: 1000,
			barColor: currentTrackColor,
			trackColor: currentBgColor,
			lineWidth: currentLine,
			size: currentSize,
			lineCap: 'butt',
			scaleColor: false,
			onStep: function(value) {
          		this.$el.find('.percent').text(~~value);
        	}
		});
	});

}


MD_SHORTCODES.mediaElements = function(){

	$('.md-video-hosted video, .md-audio-hosted audio').mediaelementplayer();
	$('.md-video-hosted video').fitVids();
	$('.section-video video.hosted').mediaelementplayer({
		startVolume: 0,
		success: function (mediaElement, domObject) { 
        	mediaElement.play();
    	}
    });

	function fitVideoBg(){
		$('.page-section .section-video').each(function (b) {
			var min_w = 1500;
			var header_height = 0;
			var vid_w_orig = 1280;
			var vid_h_orig = 720;
		    
		    var f = $(this).closest(".page-section").outerWidth();
		    var e = $(this).closest(".page-section").outerHeight();
		    $(this).width(f);
		    $(this).height(e);
		    var a = f / vid_w_orig;
		    var d = (e - header_height) / vid_h_orig;
		    var c = a > d ? a : d;
		    min_w = 1280 / 720 * (e + 20);
		    if (c * vid_w_orig < min_w) {
		        c = min_w / vid_w_orig
		    }
		    $(this).find("video, .mejs-overlay, .mejs-poster").width(Math.ceil(c * vid_w_orig + 2));
		    $(this).find("video, .mejs-overlay, .mejs-poster").height(Math.ceil(c * vid_h_orig + 2));
		    $(this).scrollLeft(($(this).find("video").width() - f) / 2);
		    $(this).find(".mejs-overlay, .mejs-poster").scrollTop(($(this).find("video").height() - (e)) / 2);
		    $(this).scrollTop(($(this).find("video").height() - (e)) / 2)
		});
	}
	
	$(window).resize(function(){
		fitVideoBg();
	}).resize();

	$(window).load(function(){
		fitVideoBg();
	})

	$(document).ready(function(){
		fitVideoBg();
	})
}



MD_SHORTCODES.fancyBox = function(){
	$('.fancybox').fancybox({
		maxHeight : '85%',
		maxWidth  : '85%'
	});

	$('.fancybox-media').fancybox({
		helpers : {
			media : true
		},
		openEffect  : 'none',
		closeEffect : 'none'
	});
}

MD_SHORTCODES.flexslider = function(){

	$('.flexslider').each(function(){

    	var $navigation  = Boolean($(this).data('navigation'));
    	var $pagination  = Boolean($(this).data('pagination'));
    	var $effect 	 = $(this).data('effect');
    	var $slideshow 	 = $(this).data('slideshow');
    	var $speed 		 = 5000;
    	var $keyboard	 = ($(this).data('disable-keyboard')) ? false : true;

		$(this).flexslider({
			smoothHeight : true,
			prevText	 : '',
			nextText	 : '',
			animation	 : $effect,
			controlNav   : $pagination,
			directionNav : $navigation,
			slideshow	 : $slideshow,
			slideshowSpeed : $speed,
			keyboard	 : $keyboard
		});	
		
	});

	$('.section-slider .flexslider img').resizeToParent();



}


MD_SHORTCODES.backToTop = function(){	
	$(window).scroll(function(){
		if($(window).scrollTop() > 400){
			$('#md-back-top').addClass('show');
		}
		else{
			$('#md-back-top').removeClass('show');
		}
	});

	$('#md-back-top').on('click', function(){

		$('body, html').animate({scrollTop: 0 }, 800, 'easeInOutExpo');

		return false;
	})
}


MD_SHORTCODES.textRotator = function(){
	$(".md-rotator").each(function(){
		var $font_min = $(this).data('font-min');
		var $font_max = $(this).data('font-max');

		$(this).fitText(1.1, { minFontSize: $font_min + 'px', maxFontSize: $font_max + 'px' });

	});

	$(".md-rotator .rotator").each(function(){
    	var $rotate_animation = ($(this).parent('.md-rotator').data('rotate-animation')) ? $(this).parent('.md-rotator').data('rotate-animation') : 'fade';
    	var $rotate_speed = ($(this).parent('.md-rotator').data('rotate-speed')) ? $(this).parent('.md-rotator').data('rotate-speed') : 1500;

		$(this).md_rotator({
		  animation: $rotate_animation,
		  speed: $rotate_speed,
		  separator: ","
		});
	});

}


MD_SHORTCODES.fullScreen = function(){
	function setHeight(){
		if($('body').hasClass('onepage')){
			var $offset = getAdminBarHeight();
		} else {

			if($('body').data('header-fixed') == true){
				var $offset = $('#header.wide').outerHeight(true);
			} else {
				var $offset = getAdminBarHeight();
			}

		}
		var $h = $(window).height() - $offset;
		
		$('.page-section.fullscreen').css('height', $h);
	}

	setHeight();

	$(window).resize(function(){
		setHeight();
	})
}

MD_SHORTCODES.buttonHero = function(){
	$('.button-hero').on('click', function(){
		if($('body').hasClass('onepage')){
			var $target = $(this).parents('section').next('section');
			var $offset = $('header').outerHeight(true) + getAdminBarHeight();
		} else {
			var $target = $(this).parents('.page-section').next('.page-section');
			if($('body').data('header-fixed') == true){
				var $offset = $('body[data-header-fixed="true"] #header.wide #header-content').outerHeight(true);
			} else {
				var $offset = $('body[data-header-fixed="true"] #header.wide #header-content').outerHeight(true) + getAdminBarHeight();
			}
		}

		$.scrollTo($target, 1300, {offset : -$offset, easing: 'easeInOutExpo'});

		return false;
	})
}





$(function(){
	MD_SHORTCODES.fullScreen();
	MD_SHORTCODES.buttonHero();
	MD_SHORTCODES.parallax();
	MD_SHORTCODES.buttons();
	MD_SHORTCODES.icons();
	MD_SHORTCODES.accordions();
	MD_SHORTCODES.tabs();
	MD_SHORTCODES.alerts();
	MD_SHORTCODES.tooltips();
	MD_SHORTCODES.counters();
	MD_SHORTCODES.carousel();
	MD_SHORTCODES.socialShare();
	MD_SHORTCODES.googleMaps();
	MD_SHORTCODES.mediaElements();
	MD_SHORTCODES.progressBar();
	MD_SHORTCODES.fancyBox();
	MD_SHORTCODES.flexslider();
	MD_SHORTCODES.backToTop();
	MD_SHORTCODES.textRotator();
});

})(jQuery);