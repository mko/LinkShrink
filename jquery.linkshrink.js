/*
 * LinkShrink jQuery plugin
 * Copyright (c) 2010 Michael Owens
 * http://mowens.com/experiments/#linkshrink
 * Licensed under the MIT License.
 *
 */
(function(jQuery){
 jQuery.fn.linkShrink = function(options) {
    
	var defaults = {
		length: 10,		// Length of the resulting link text
		expander: ' [+]',	// Expander button (HTML allowed), if using text be sure to include the leading space.
		split: true		// true = split by ellipsis; false = ends with ellipsis
	};
  
	var options = jQuery.extend(defaults, options);
	
	// Checks for and returns the link's URL resource
	var getLinkResource = function(linkURL){		
		try{	
			var splitURL = linkURL.split("//");
			var linkResource = splitURL[0];
			return linkResource;
		} catch(e) {
			return false;
		}
	}
	
	// Checks for and returns the link text without any URL resource in front of it
	var getLinkProper = function(linkURL){		
		try{	
			var splitURL = linkURL.split("//");
			var linkProper = splitURL[1];
			return linkProper;
		} catch(e) {
			return false;
		}
	}
	
	// Minimum number of characters required for URL (Don't set below 5!)
	var minimumLength = 5;
	
	return this.each(function() {
	
		link = jQuery(this);
		//console.log(link.attr('href'));

		if(options.length<minimumLength) {
			options.length = minimumLength;
		}
		
		if(options.split) { // Text split by ellipsis, split = true
			
			var frontLength = Math.floor((options.length-3)/2);
			if(frontLength<1) {
				frontLength = 1;
			}
			var backLength = options.length - (3 + frontLength);
			
			if(getLinkResource(link.text())) { // Only shorten link text that is in the form of a URL
				
				var linkText = getLinkProper(link.text());
				var linkFront = linkText.substr(0,frontLength);
				var linkBack = linkText.substr(linkText.length - backLength);
				
				link.html(linkFront + '...' + linkBack + '<span class="lS-expander">' + options.expander + '</span>');
			}
			
		} else { // Text followed by ellipsis, split = false
			
			if(getLinkResource(link.text())) { // Only shorten link text that is in the form of a URL
				var frontLength = options.length-3;
				if(frontLength<1) {
					frontLength = 1;
				}
				var linkText = getLinkProper(link.text());
				var linkFront = linkText.substr(0,frontLength);
				
				link.html(linkFront + '...' + '<span class="lS-expander">' + options.expander + '</span>');
			}
			
		}
		
		// Expand Link on Click
		link.children("span.lS-expander").click(function() {
				
				var expander = jQuery(this);
				//console.log(expander.text());
				
				expander.parent().html(expander.parent().attr("href"));
				
				return false;
		});
		
	});
 };
})(jQuery);
