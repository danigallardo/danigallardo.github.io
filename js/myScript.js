//var apiScroller;
var jscrollerSettings = 
	{   showArrows: true,
		animateScroll: true, 
	    animateDuration : 600,//added - length each way in milliseconds
		//arrowScrollOnHover: true,
		
	};

$(window).bind({

     load:function(){
		//var apiScroller = $('.scroll-pane').data('jsp');
		$('.scroll-pane').jScrollPane(jscrollerSettings);
     },
     resize:function(){
	 	var throttleTimeout;
		if (!throttleTimeout) {
			throttleTimeout = setTimeout(
				function()
				{
					refreshScrollPanel();
					throttleTimeout = null;
					
				},
				100
			);
		}
    	return false;
     },
	 ready:function(){
		return false; 
	 }
    
});

	
$(window).load(function() {

	$( ".content-block" ).bind( 'click', function() { //touchstart 
		
		var contentBlockID = jQuery(this).parent().attr("id");
		$(".sub-content-block").removeClass('selected');
		
		var subContentBlock = jQuery(this).siblings(".sub-content-block");
		subContentBlock.addClass("selected");

		$(".sub-content-block").each(function() { 
			if($(this).hasClass('selected') ){ 
			    var display = $(this).css('display');
				var fs = "slow"; //fast
				if(display == "block"){
					//$('.jspPane').css({'left':'0'}); 
					$('.jspPane').animate({"left": "0px"}, 'slow', 'easeInSine'); //fast
					fs = "slow";
				}
				
				$(this).animate({width: 'toggle'}, fs, 'easeInSine',
				  function() {
					refreshScrollPanel();
					if(display == "none"){
						scrollX("#"+contentBlockID);
					}
				  }
				);
				
			}else{
				$(this).animate({"width": "0px"}, "slow", 'easeInSine', //fast
				  function(){ 
					$(this).css({'width': '', 'display':'none'});
					//refreshScrollPanel();
					$(".detail-content").removeClass('selected');
					$(".detail-content").css({'display':'none'});
					//scrollX("#showcase");
				  }
				);
			}
		});
	});
	
	
	//for sub-menu click for detail page
	$( ".sub-content-menu" ).bind( 'click', function() { //touchstart 

		var contentDetailBlockID = jQuery(this).parent().attr("id");
		//alert(contentDetailBlockID);
		$(".content-detail-page > .detail-content").removeClass('selected');
		
		var contentDetailPage = jQuery(this).siblings(".content-detail-page").find(".detail-content");
		contentDetailPage.addClass("selected");
				
		$(".detail-content").each(function() { 
			if($(this).hasClass('selected') ){ 
			    var display = $(this).css('display');
				var fs = "slow"; //fast
				if(display == "block"){
					//$('.jspPane').css({'left':'0'}); 
					$('.jspPane').animate({"left": "0px"}, 'slow', 'easeInSine'); //fast
					fs = "slow";
				}
				
				$(this).animate({width: 'toggle'}, fs, 'easeInSine',
				  function() {
					refreshScrollPanel();
					if(display == "none"){
						scrollX("#"+contentDetailBlockID);
					}
				  }
				);
				
			}else{
				$(this).animate({"width": "0px"}, "slow", 'easeInSine', //fast
				  function(){ 
					$(this).css({'width': '', 'display':'none'});
					refreshScrollPanel()
					//scrollX("#showcase");
				  }
				);
			}
		});
	});
	
});


$(document).ready(function() {
	
	/*$('#nav').onePageNav({
	filter: ':not(.external)',
	scrollThreshold: 0.25
	});
	*/

	//on close of about & contact page
	$(".btn-close-sub-content-block").bind("click", function(event){ //touchstart 
		$(".sub-content-block").each(function() { 
			if($(this).hasClass('selected') ){ 
				$('.jspPane').animate({"left": "0px"}, "slow"); //fast
				
				$(this).animate({width: 'toggle'}, "slow", 
				  function() {
					refreshScrollPanel();
				  }
				);
			}
		});
		$(".sub-content-block").removeClass('selected');
	});
	
	//on close of detail page
	$(".btn-close-content-detail").bind("click", function(event){ //touchstart
		$(".detail-content").each(function() { 
			if($(this).hasClass('selected') ){ 
				$('.jspPane').animate({"left": "0px"}, "slow"); //
				
				$(this).animate({width: 'toggle'}, "slow",  //
				  function() {
					refreshScrollPanel();
				  }
				);
			}
		});
		$(".detail-content").removeClass('selected');
	});
	
	//on clik of footer menu
	$("#nav a").bind("click",function(event){ //touchstart
		event.stopPropagation(); event.preventDefault(); 
		var target = $(this).attr("href"); 
		//scrollX(target);
		$(target + ">.content-block").trigger( "click" );
		return false;
	}); 

	//gallery initialization
	$('.image-gallery').each(function(e) { 
		$(this).bjqs({	
		    //animtype      : 'slide',
			height        : 550,
			width         : 766,
			animduration  : 1000,      // length of transition
            animspeed     : 4000,     // delay between transitions
			firsttext     : '<<',
			nexttext      : '>',   // text/html inside next UI element
			prevtext      : '<',
			lasttext      : '>>',
			responsive    : false,
			randomstart   : false,
			automatic	  : false,
			showoutof	  : true,
			showmarkers   : false,
		});
	});
	
	$(".content-block").hover(function(){
		//$(this).find(".overlay").stop().animate({ 'marginTop': '0px'});
		$(this).find(".overlay").stop().fadeIn('slow', function() { });
	  },function(){
		//$(this).find(".overlay").stop().animate({ 'marginTop': '562px'});
		$(this).find(".overlay").stop().fadeOut('slow', function() { });
	});
	
	//dislay the background image on hover
	var sub_content_block_p = '';
	$(".sub-content-block li .sub-content-menu").hover(function(){
		sub_content_block_p = $("p", this).text();
		//$("img", this).stop().css({ 'z-index': '0'});
		$(this).find(".overlay").stop().fadeOut('slow', function() { });
		
		if($(this).siblings(".content-detail-page").find(".detail-content").is(":visible")){
			$("p", this).html("TANCAR");
		}else{
			$("p", this).html("VEURE");
		}
	  },function(){
		//$("img", this).stop().css({ 'z-index': '-2'});
		$(this).find(".overlay").fadeIn('slow', function() { });
		$("p", this).html(sub_content_block_p);		
	});
	
	//contact form submit
	$("#contact-frm").submit(function(event) {
	  /* stop form from submitting normally */
	  event.preventDefault();
	
	  /*clear result div*/
	   $('.warning, .success, .error').remove();
	
	  /* Send the data using post and put the results in a div */
		$.ajax({
			url: 'postEmail.php',
			type: 'post',
			data:$('#contact-frm').serialize(),
			dataType: 'json',
			success: function(json) { 
				$('.warning, .success, .error').remove();
				
				if (json['error']) {
					
					if (json['error']['name']) {
						$('input[name=\'name\']').after('<span class="error">' + json['error']['name'] + '</span>');
					}
					
					if (json['error']['email']) {
						$('input[name=\'email\']').after('<span class="error">' + json['error']['email'] + '</span>');
					}
					
					if (json['error']['query']) {
						$('textarea[name=\'query\']').after('<span class="error">' + json['error']['query'] + '</span>');
					}
				} 
				
				if (json['warning']) {
					$('#msg').html('<div class="warning" style="display:none">' + json['warning'] + '</div>');
					$('.warning').fadeIn('slow');
				}
					
				if (json['success']) {
					$('#msg').html('<div class="success" style="display:none">' + json['success'] + '</div>');
					$('.success').fadeIn('slow');
					
					$('input[name=\'name\']').val('');
					$('input[name=\'email\']').val('');
					$('textarea[name=\'query\']').val('');

				}	
			},
			/*error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}*/
		});
	});
	
});


//***** functions *******//
function refreshScrollPanel() {
  var pane = $('.scroll-pane').each(function(){
    var api = $(this).data('jsp');
    api.reinitialise();
  });   
}

function scrollX(menu) {
  if ( !jQuery('.jspPane').is(':animated')){ 
	var pane = $('.scroll-pane').data('jsp');
	pane.scrollTo( $(menu).position().left+3, 0);
	return false;
  }		   
}
