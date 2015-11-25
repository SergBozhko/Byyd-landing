console.log('Accordion connected');
var wwImgW = $(window).width();

;(function($) {
	
	$.fn.liteAccordion = function(options) {
				
		// defaults
		var defaults = {
			containerWidth : wwImgW,
			containerHeight : 620,
			headerWidth : 60,
			
			firstSlide : 4, 
			onActivate : function() {},
			slideSpeed : 500,
			slideCallback : function() {},			
			
			autoPlay : false,
			pauseOnHover : false, 
			cycleSpeed : 6000,

			theme : 'basic', // basic, light*, dark, stitch*
			rounded : false,
			enumerateSlides : false
		},
		
		// merge defaults with options in new settings object				
			settings = $.extend({}, defaults, options),
	
		// define key variables
			$accordion = this,
			$slides = $accordion.find('li'),
			slideLen = $slides.length,
			slideWidth = settings.containerWidth - (slideLen * settings.headerWidth) + settings.headerWidth,
			slideWidthAg = slideWidth - settings.headerWidth,
			$header = $slides.children('h2'),
			
		// core utility and animation methods
			utils = {
				getGroup : function(pos, index) {		
					if (this.offsetLeft === pos.left) {
						return $header.slice(index + 1, slideLen).filter(function() { return this.offsetLeft === $header.index(this) * settings.headerWidth });
					} else if (this.offsetLeft === pos.right) {
						return $header.slice(0, index + 1).filter(function() { return this.offsetLeft === slideWidthAg + ($header.index(this) * settings.headerWidth) });	
					} 					
				},
				nextSlide : function(slideIndex) {
					var slide = slideIndex + 1 || settings.firstSlide;

					// get index of next slide
					return function() {
						return slide++ % slideLen;
					}
				},
				play : function(slideIndex) {
					var getNext = utils.nextSlide((slideIndex) ? slideIndex : ''), // create closure
						start = function() {
							$header.eq(getNext()).click();
						};
					
					utils.playing = setInterval(start, settings.cycleSpeed);			
				},
				pause : function() {
					clearInterval(utils.playing);
				},
				playing : 0,
				sentinel : false
			};		
		
		// set container heights, widths, theme & corner style
		$accordion
			.height(settings.containerHeight)
			.width(settings.containerWidth)
			.addClass(settings.theme)
			.addClass(settings.rounded && 'rounded');
		
		// set tab width, height and selected class
		$header
			.width(settings.containerHeight)
			.height(settings.headerWidth)
			.eq(settings.firstSlide - 1).addClass('selected');
		
		// ie :(
		//if ($.browser.msie) {
		//	if ($.browser.version.substr(0,1) > 8) {
		//		$header.css('filter', 'none');
		//	} else if ($.browser.version.substr(0,1) < 7) {
		//		return false;
		//	}
		//}
		
		// set initial positions for each slide
		$header.each(function(index) {
			var $this = $(this),
				left = index * settings.headerWidth;
				
			if (index >= settings.firstSlide) left += slideWidthAg;
			
			$this
				.css('left', left)
				.next()
					.width(slideWidth)
					.css({ left : left, paddingLeft : settings.headerWidth });
			
			
		});	
				
		// bind event handler for activating slides
		$header.mouseover(function(e) {
			var $this = $(this),
				index = $header.index($this),
				$next = $this.next(),
				pos = {
					left : index * settings.headerWidth,
					right : index * settings.headerWidth + slideWidthAg,
					newPos : 0
				}, 
				$group = utils.getGroup.call(this, pos, index);
								
			// set animation direction
			if (this.offsetLeft === pos.left) {
				pos.newPos = slideWidthAg;
			} else if (this.offsetLeft === pos.right) {
				pos.newPos = -slideWidthAg;
			}
			
			// check if animation in progress
			if (!$header.is(':animated')) {

				// activate onclick callback with slide div as context		
				if (e.originalEvent) {
					if (utils.sentinel === this) return false;
					settings.onActivate.call($next);
					utils.sentinel = this;
				} else {
					settings.onActivate.call($next);
					utils.sentinel = false;
				}

				// remove, then add selected class
				$header.removeClass('selected').filter($this).addClass('selected');
			
				// get group of tabs & animate			
				$group
					.animate({ left : '+=' + pos.newPos }, settings.slideSpeed, function() { settings.slideCallback.call($next) })
					.next()
					.animate({ left : '+=' + pos.newPos }, settings.slideSpeed);
						
			}
		});
			
		// pause on hover			
		if (settings.pauseOnHover) {
			$accordion.hover(function() {
				utils.pause();
			}, function() {
				utils.play($header.index($header.filter('.selected')));
			});
		}
				
		// start autoplay, call utils with no args = start from firstSlide
		settings.autoPlay && utils.play();
		
		return $accordion;
		
	};
	
})(jQuery);

$(function() {
	$('#one').liteAccordion({
		onActivate : function() {
			this.find('figcaption').fadeOut();
		},
		slideCallback : function() {
			this.find('figcaption').fadeIn();
		},
		autoPlay : true,
		pauseOnHover : true,
		theme : 'dark',
		rounded : true,
		enumerateSlides : true
	}).find('figcaption:first').show();
});