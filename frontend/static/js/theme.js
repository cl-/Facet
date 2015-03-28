(function($){

"use strict";
$.fn.fixHeight = function(){
	 this.height( Math.max.apply(this, $.map( this , function(e){ return $(e).height() }) ) ) ;
};

var THEME = window.THEME || {};

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

THEME.loaderSite = function(){
	if($('#loader-site').length){
		var $site_init = false;

		setTimeout(function(){
			if(!$site_init){
				$site_init = true;
				$('#loader-site').fadeOut(400, function(){

					$(window).load(function(){
						THEME.init();
					});
					
				});
			}
		}, 5000);

		$(window).load(function(){
			$('#loader-site').fadeOut(400, function(){
				if(!$site_init){
					$site_init = true;
					THEME.init();
				}
			});
		});

	} else {
		
		$(window).load(function(){
			THEME.init();
		});
	
	}
}


THEME.css3animations = function(){

	function startAnimation(el){
		var $delay = $(el).data('delay');
		if($delay == ''){
			$delay = 0;
		}

		$(el).delay($delay).queue(function(){
			$(el).addClass('animated')
		});
	}

	function animateElements(){

		if( $('body[data-css3-animations="enabled"]')) {

			$('.animate').scrolledIntoView().on('scrolledin', function () {
				startAnimation(this);
			});
			

			$('.animate:in-viewport').each(function(){
				startAnimation(this);
			});
 		}

	}
	animateElements();
}

THEME.header = function(){
	function sticky(){
		$('body:not(.onepage)[data-device="desktop"][data-header-fixed="true"] #header.wide').sticky();
	}
	sticky();

	function headerSearch(){
		$('#search-open').on('click', function(){
			$('#header-search').slideToggle();
			$(this).hide();
			$('#search-close').show();
			return false;
		});

		$('#search-close').on('click', function(){
			$('#header-search').slideToggle();
			$(this).hide();
			$('#search-open').show();
			return false;
		});

	}
	headerSearch();
}

THEME.menu = function(){
	function wideMenu(){
		var $speed = 60;

		$('#header.wide #header-menu .megamenu').mouseover(function(){
			$(this).find('ul:first').fadeIn($speed).find('li ul').fixHeight();
		}).mouseleave(function(){
			$(this).find('ul:first').fadeOut($speed);
		});

		$('#header.wide li.simple .sub-menu li').each(function(){
			if($(this).find('ul.sub-menu').length > 0) {
				$(this).find('> a').append('<span class="more"><i class="icon-angle-right arrow"></i></span>');
			}
		});
	}
	wideMenu();

	function sideMenu(){
		$('#header.side li.menu-item-has-children > a').each(function(){
			$(this).append('<span class="more"><i class="entypo-plus arrow"></i></span>');
		});

		$('#header.side .menu-item-has-children > a').on('click', function(){
			var $target = $(this).attr('href');
			if($target == '#'){
				$(this).toggleClass('open').next('ul').slideToggle();
				return false;
			}
		});

		$('#header.side .menu-item-has-children > a .more').on('click', function(){
			$(this).parent('a').toggleClass('open').next('ul').slideToggle();	
			return false;
		});
	}
	sideMenu();

	function mobileMenu(){
		$('#header-mobile li.menu-item-has-children > a').each(function(){
			$(this).append('<span class="more"><i class="entypo-plus arrow"></i></span>');
		});

		$('#menu-mobile-trigger').on('click', function(){
			$(this).toggleClass('open');
			$('#header-mobile').slideToggle();
			return false;
		});

		$('#header-menu-mobile .menu-item-has-children > a').on('click', function(){
			var $target = $(this).attr('href');
			if($target == '#'){
				$(this).toggleClass('open').next('ul').slideToggle();
				return false;
			}
		});

		$('#header-menu-mobile .menu-item-has-children > a .more').on('click', function(){
			$(this).parent('a').toggleClass('open').next('ul').slideToggle();	
			return false;
		});
	}
	mobileMenu();


	function fixMobileMenu(){
		if($(window).width() > 1199){
			$('#menu-mobile-trigger').removeClass('open');
			$('#header-mobile').css('display', 'none');
		}
		$('#header-sticky-wrapper').css('height', $('#header').outerHeight(true));
	}
	fixMobileMenu();

	$(window).resize(function(){
		fixMobileMenu();
	});
}


THEME.blog = function(){
	function blogMasonry(){
		var $container = $('.md-blog.masonry');
		$container.masonry({
		  columnWidth: '.item',
		  itemSelector: '.item'
		});
	}
	blogMasonry();
}


THEME.portfolio = function(){
	function portfolioMasonry(){
		var $container = $('.md-portfolio.masonry');
		$container.masonry({
		  columnWidth: '.item',
		  itemSelector: '.item'
		});
	}
	portfolioMasonry();

	function portfolioFilter(){
		$('.portfolio-filtered').isotope({
			itemSelector : '.item'
		});

		
		$('.md-portfolio-filter a').on('click', function(){
			var selector = $(this).attr('data-filter');
			
			$('.portfolio-filtered').isotope({ filter: selector });

			$('.md-portfolio-filter a').removeClass('active');
			$(this).addClass('active');
			
			$(this).parent('.md-portfolio-filter').find('.current').text($(this).text());
			
			return false;
		});
	}
	portfolioFilter();
	
}

THEME.selectpicker = function(){
	$('.widget select, .woocommerce-ordering select, .wpcf7 select').chosen();
}

THEME.breadcrumbs = function(){
	var $breadBottom = ($('.page-section:first').hasClass('arrow-down')) ? 12 : 0;
	$('.breadcrumbs').css({
		'bottom' : $breadBottom
	});
}

THEME.onePageNav = function(){
	function sticky(){
		var didScroll = false;
		$(window).scroll(function(){
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollFrontPage, 250 );
			}
		});


		function scrollFrontPage() {
			var sy = scrollY();
			if ( sy >= 1 ) {
				$('#header').removeClass('transparent').addClass('is-sticky');
			}
			else {
				$('#header').removeClass('is-sticky').addClass('transparent');
			}
			didScroll = false;
		}

		function scrollY() {
			return window.pageYOffset || $('.onepage header').scrollTop;
		}
	}

	function onePageNav(){
		$('.onepage #header-menu, .onepage #header-menu-mobile').singlePageNav({
			offset : $('#header-content').outerHeight(true) + getAdminBarHeight(),
			updateHash : false,
			currentClass : 'current',
			filter : ':not(.target-page)'
		});

	}
	function hashNav(){
		if(window.location.hash){
			if($('body').hasClass('onepage')){
			$.scrollTo(
				window.location.hash, 
				1, 
				{
					offset: $('.header-content').outerHeight(true), 
				}
			);
			}
		}
		else{
			if($('body').hasClass('onepage')){
				$('body, html').animate({scrollTop:0},1);
				$('.onepage #onepage-menu a').removeClass('current').eq(0).addClass('current');
			}
		}
	}

	if($('body').hasClass('onepage')){
		sticky();
		onePageNav();
		hashNav();
	}
}


THEME.breadcrumbs();
THEME.loaderSite();

THEME.init = function(){
	
	THEME.css3animations();
	THEME.header();
	THEME.menu();
	THEME.blog();
	THEME.portfolio();
	THEME.selectpicker();
	THEME.onePageNav();
}


})(jQuery);