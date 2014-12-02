(function($){
	jQuery.fn.pressScroll = function (option){
		
		/**
			초기화 처리 
		*/
		this.initScroll = function(){
			console.log("init");
		}
	
	
		var isPress = false;
		var interval;
		var num = 0;
		var speed = 100;
		var $obj = $(this);
	 	var $target = $(this).find("ul");
	 	
	 	var maxScroll = $target.height() - $obj.height();
	 	
		console.log($obj.is(":hidden"));
		
	 	$(window).resize(function(){
	 		maxScroll = $target.height() - $obj.height();
	 		if (maxScroll < num){
	 			//console.log("ID : " + $obj.parent(".contArea").attr("id") + "__maxScroll : "+ maxScroll + " ___ num : " + num);
	 			num = maxScroll;
	 			scrollMove(num);
	 		} 
	 	});
		
		
		$(option.btnDown)
		.bind("mousedown keydown touchstart", function(e){ 
			if(!isPress){
				isPress = true;
				interval = setInterval(scrollMoveDown , speed);
			}
			e.preventDefault(); 
		})
		.bind("mouseup keyup touchend", function(e){
			if(isPress){
				clearInterval(interval);
				isPress = false;
			}
			e.preventDefault();
		});
		
		$(option.btnUp)
		.bind("mousedown keydown touchstart", function(e){
			if(!isPress){
				isPress = true;
				interval = setInterval(scrollMoveUp , speed);
			}
			e.preventDefault(); 
		})
		.bind("mouseup keyup touchend", function(e){
			if(isPress){
				clearInterval(interval);
				isPress = false;
			}
			e.preventDefault(); 
		}); 
	 	
	 	function scrollMoveDown(){
	 		if (maxScroll <= num){
	 			num = maxScroll;
	 		} else {
		 		num += 10;
	 		}
	 		scrollMove(num); 
	 	}
		function scrollMoveUp(){
		 	num -= 10;
			if (0 >= num){
	 			num = 0;
	 		}
			scrollMove(num);
	 	}
	 	function scrollMove(num){
	 		$target.animate({
	 			top : - num 
	 		},speed , "linear", function(){
	 		});

			if(num > 0 && $(option.btnUp).css("visibility") != "visible"){
				$(option.btnUp).css("visibility","visible");
			} 
			
			if(num <= 0 && $(option.btnUp).css("visibility") != "hidden"){
				$(option.btnUp).css("visibility","hidden");
			} 

			if(num >= maxScroll && $(option.btnDown).css("visibility") != "hidden") {
				$(option.btnDown).css("visibility","hidden");
			}

			if(num < maxScroll && $(option.btnDown).css("visibility") != "visible") {
				$(option.btnDown).css("visibility","visible");
			}

	 	}
		
		return this;
	};
	
})(jQuery);