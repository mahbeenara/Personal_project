$(document).ready(function() {

	"use strict";

/***********************************************************
=  		Add images To its background Banner Items
************************************************************/

    var bannerItem = $(".banner-item");
    bannerItem.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });



/***********************************************************
=             Isotope
************************************************************/

	var container = $('.gallery-wrapper'); // gallery container

	container.isotope({

		itemSelector: '.gallery-item',
		animationEngine: 'best-available',

		animationOptions: {
			duration: 200,
			queue: false
		},

		layoutMode: 'fitRows'

	});


	// sort items on button click
	$('.filter a:not(.full-gallery)').on( 'click', function() {

		$('.filter a').removeClass('active');

		$(this).addClass('active');

		var filterValue = $(this).attr('data-filter');

		container.isotope({

			filter: filterValue

		});

		initIsotope();

		return false;

	});


	// Split columns for different size layout
	function splitColumns() {

		var windowWidth = $(window).width(),
		columnNumber = 1; //  default column number

		if (windowWidth > 1200) {
			columnNumber = 4;
		} else if (windowWidth > 767) {
			columnNumber = 3;
		} else if (windowWidth > 600) {
			columnNumber = 2;
		}

		return columnNumber;

	}


	// Set width for portfolio item
	function setColumns() {
		var windowWidth = $(window).width(),
		columnNumber = splitColumns(),
		postWidth = (windowWidth / columnNumber);

		container.find('.gallery-item').each(function() {
			$(this).css({
				width: postWidth + 'px'
			});
		});
	}


	// initialize isotope
	function initIsotope() {

		setColumns();
		container.isotope('layout');

	}

	container.imagesLoaded(function() {

		setColumns();
		initIsotope();

	});

	$(window).bind('resize', function() {
		initIsotope();
	});

	initIsotope();



/***********************************************************
=             Date Picker
************************************************************/

	$('#appointment-date').datepick({
		minDate: '0',
		maxDate: '+1m +2w +3d'
	});




/***********************************************************
=             Twitter
************************************************************/

    $('.tweet').twittie({
        username: 'deepikapadukone', // change username here
        dateFormat: '%b. %d, %Y',
        template: '{{tweet}} {{user_name}}',
        count: 10
    }, function() {
        var item = $('.tweet ul');
        
        item.children('li').first().show().siblings().hide();
        setInterval(function() {
            item.find('li:visible').fadeOut(500, function() {
                $(this).appendTo(item);
                item.children('li').first().fadeIn(500);
            });
        }, 5000);
    });




/***********************************************************
=             FitVid
***********************************************************/

	$("#upcoming-video").fitVids();
	$(".blog-video").fitVids();



/***********************************************************
=          Owl Carousel for Post Slider
***********************************************************/

	$('.post-slider').owlCarousel({

		navigation : false, // Show next and prev buttons
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		autoPlay: true,
		pagination: false,
		navigation: true,
		navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
		
	});




/***********************************************************
=             Venobox Lightbox
***********************************************************/

	$('.venobox').venobox();



/***********************************************************
=             Menu
***********************************************************/

	//Check to see if the window is top if not then display button
	$(window).scroll(function(){

	var height = $(window).height() - 100;
	var width = $(window).width();

		if ($(this).scrollTop() > height && width > 768 ) {
			$('#menu-when-scroll').fadeIn();
		} else {
			$('#menu-when-scroll').fadeOut();
		}
	});
	
	$('.menu-toggle').on('click', function(){
		$('#nav-menu').slideToggle();
	});


	$('body').on('click','a[href*=#]:not([href=#])', function() {
		$('#nav-menu').slideUp();

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {			
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top				
				}, 800);

				return false;
			}
		}
	});



/***********************************************************
=             Scroll To Top
***********************************************************/

	//Check to see if the window is top if not then display button
	$(window).scroll(function(){

	var height = $(window).height() -100;

		if ($(this).scrollTop() > height ) {
			$('#scroll-to-top').fadeIn();
		} else {
			$('#scroll-to-top').fadeOut();
		}
	});

	//Click event to scroll to top
	$('#scroll-to-top').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});



/***********************************************************
=             Textrotator
***********************************************************/

	$(".rotate").textrotator({
		animation: "dissolve", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
		separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
		speed: 3000 // How many milliseconds until the next word show.
	});


/***********************************************************
=             Preloader
***********************************************************/

    $(window).load(function() {        
        $(".status").fadeOut();		// will first fade out the loading animation
        $(".preloader").delay(1000).fadeOut("slow");	// will fade out the whole DIV that covers the website.
    });



/***********************************************************
=             Sending Appointment Email
***********************************************************/
	$("#appointment-form").submit(function (e) {
        e.preventDefault();
        var name = $("#appointment-name").val();
        var email = $("#appointment-email").val();
        var mobile = $('#appointment-mobile').val();
        var date = $('#appointment-date').val();
        var time = $('#appointment-time').val();
        var sender = $('#sender').val();
        var message = $("#appointmentMessage").val();
        var dataString = 'name=' + name + '&email=' + email + '&mobile=' + mobile +'&date=' + date +'&time=' + time +'&sender=' + sender +'&message=' + message;

        function isValidEmail(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };

        if (isValidEmail(email) && (name.length > 1) && (mobile.length > 1) && (date.length > 1) && (time.length > 1) && (sender.length > 1)) {
            $.ajax({
                type: "POST",
                url: "sendmail.php",
                data: dataString,
                success: function () {
                    $('.success').fadeIn(1000);
                    $('.error').fadeOut(500);
                }
            });
        } else {
            $('.error').fadeIn(1000);
            $('.success').fadeOut(500);
        }

        return false;
    });



/***********************************************************
=             Video Section
***********************************************************/
	var videoSection = $("#upcoming-video .video-item");
    videoSection.each(function(indx){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    //owl carousell

    $('#upcoming-video').owlCarousel({
    	navigation : true,
		navigationText : ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		pagination : false,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		autoPlay: false
    });




/***********************************************************
=             Google Map
***********************************************************/

	var data = [{
	        lat: 51.507879,  // Latitude of your address
	        lon: -0.087732,  // Longitude of your address
	        title: 'Home',    // Title of The Control Button
	        html: '<h3> <i class="fa fa-home"></i> London Bridge</h3>'   // Title Which will Show on Map
	    },{
	        lat: 51.468489,
	        lon: -2.5907094,
	        title: 'Office',
	        html: '<h3> <i class="fa fa-briefcase"></i> Bristol</h3>'
	    }
	];

	var map = $('#gmap');

	if ( map.length > 0 ){
		new Maplace({
			locations: data,
			controls_type: 'list',
			controls_on_map: false
		}).Load();
	}



/***********************************************************
=             WoW.js
***********************************************************/
new WOW().init();



/***********************************************************
=             Demo
***********************************************************/

	$('.colors').styleSwitcher();

	$('#switcher-toggle').on('click',function(){
		if($(this).hasClass('open')){
			$(this).removeClass('open');
			$('#demo').animate({'left':'-235px'});
		}else{
			$(this).addClass('open');
			$('#demo').animate({'left':'0'});
		}
	});

});
