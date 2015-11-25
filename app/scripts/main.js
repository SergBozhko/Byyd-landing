// Controls
$.fn.onViewPort = function(){
   var viewport = {};
   viewport.top = $(window).scrollTop();
   viewport.bottom = viewport.top + $(window).height();
   var bounds = {};
   bounds.top = this.offset().top;
   bounds.bottom = bounds.top + this.outerHeight();
   return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

// DOM ready
$(function() {
   console.log('DOM ready');

   //On Viewport
   var $vTarget = $('.view-target');
   $(window).scroll(function() {
      if($vTarget.onViewPort()) {
         console.log('Banners 14 in viewport');
      }
      if($vTarget.onViewPort()) {
         $('.block-14-l-banner').children('img').each(function($eachCounter) {
            $(this).addClass('b14-l-' + ($eachCounter + 1));
         });
         $('.block-14-r-banner').children('img').each(function($eachCounter) {
            $(this).addClass('b14-r-' + ($eachCounter + 1));
         });
      }
   });

   // My easy slider init
   var $slider = $('.block-20-slider'),
       $slides = $('.block-20-slides'),
       $nextSlide = $('.next-slide'),
       $prevSlide = $('.prev-slide');

   $nextSlide.click(function() {
      if($slides.children('.slide-active').next().hasClass('block-20-slide')) {
         $slides
             .children('.slide-active')
             .css({'display' : 'none'})
             .removeClass('slide-active')
             .next('.block-20-slide')
             .css({'display' : 'block'})
             .addClass('slide-active');
      } else {
         return false;
      }

   });
   $prevSlide.click(function() {
      if($slides.children('.slide-active').prev().hasClass('block-20-slide')) {
         $slides
             .children('.slide-active')
             .css({'display': 'none'})
             .removeClass('slide-active')
             .prev('.block-20-slide')
             .css({'display': 'block'})
             .addClass('slide-active');
      } else {
         return false;
      }
   });

   // Slick Slider
   $('.block-20-slider-mobile').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
   });
   $('.works-area').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
   });

   // Popup action
   var $pOv = $('.popup-overlay'),
       $pWin = $('.popup-window'),
       $pTrigger = $('.p-trigger, .popup-close, .popup-overlay'),
       $pTurn = $('.popup-turn'),
       $pTitle = $('.popup-title'),
       $pSbt = $('.popup-submit');

   $pTrigger.click(function(e) {
      e.preventDefault();
      if($(this).hasClass('popup-turn')) {
         var turnTitle = $(this).attr('data-title'),
             turnSubmit = $(this).attr('data-submit');
         $pTitle.text(turnTitle);
         $pSbt.attr('value', turnSubmit);
      }
      $pOv.toggleClass('popup-active');
      $pWin.toggleClass('popup-active');
   });

   // Menu toggle
   var $mobMenu = $('.menu-navigation'),
       $menuTrigger = $('.hamburger-menu, .overlay-menu, .menu-close-trigger'),
       $menuOv = $('.overlay-menu');
   $menuTrigger.click(function() {
      $mobMenu.toggleClass('menu-navigation-active');
      $menuOv.toggleClass('overlay-menu-active');
      $('body').toggleClass('ov-h');
   });

   // Anchor
   var $aLink = $('.anchor-link');
   $aLink.click(function(e) {
      e.preventDefault();

      $mobMenu.toggleClass('menu-navigation-active');
      $menuOv.toggleClass('overlay-menu-active');
      $('body').toggleClass('ov-h');

      var aLinkVal = $(this).attr('href'),
          aTarget = $(aLinkVal).offset().top;
      $('body, html').animate({
         scrollTop: aTarget - 59
      }, 700);
   });
});
