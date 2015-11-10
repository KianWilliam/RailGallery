/*
 * @package Module RailGallery for Joomla! 3.x
 * @version $Id: mod_railgallery 1.0.0 2014-07-22 23:26:33Z $
 * @author Kian William Nowrouzian
 * @copyright (C) 2015- Kian William Nowrouzian
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 
 This file is part of railgallery.
    railgallery is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    railgallery is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with railgallery.  If not, see <http://www.gnu.org/licenses/>. 
*/ 

(function($){

$.fn.supergallery = function(options) {
	
		var $container, $options;
		$container = $(this);
		$options = $.extend($.fn.supergallery.defaults, options);
		var newGallery = new MyGallery($container, $options);
		newGallery.callMove($options);

}

function MyGallery($container, $options)
{
var myobj = this;
this.intervalOne, this.intervalTwo, this.intervalThree;
this.counter = -1;
this.flag = 0;
this.flagb = 0;




		$container.css({border:'2px solid '+$options.color,borderRadius:'5px', position:'relative', marginLeft:'auto', marginRight:'auto', width:$options.width+'px', height:$options.height+'px', backgroundColor:$options.color, overflow:'hidden'});
		var w = parseInt($options.width)/3;
		var l = parseInt($options.width)/2 - w/2;
		var wimg = parseInt($options.width)/ 12;
		var htitle = parseInt($options.height)/4;
		var fs = htitle * 0.4;
		var fsb = htitle * 0.3;
		var ttitle =parseInt($options.height)-parseInt($options.height)/4;
		var himg = parseInt($options.height)/3;
		var timg = parseInt($options.height) - parseInt($options.height)/3;
		var limgs = l + w;
		//$('<div id="subcontainer"></div>').appendTo($container)
		$('<div id="title"></div>').css({fontWeight:$options.fontWeight, fontStyle:$options.fontStyle,position:'absolute', left:l+'px', top:ttitle+'px', width:w+'px', height:htitle+'px',fontSize:fs+'px', backgroundColor:'#000000', opacity:0.4, zIndex:1000, textAlign:'center', color:'white'}).appendTo($container);
		
		$('<div></div>').css({position:'absolute', top:0, left:l+'px', width:w+'px', height:$options.height+'px', backgroundColor:$options.color, border:'3px solid '+$options.color, borderRadius:'4px'}).appendTo($container)
		for(var i=0; i<$options.images.length; i++)
		{
			$('<img id="'+i+'">').attr('src', $options.images[i]).css({border:'1px solid '+$options.color, borderRadius:'5px' ,position:'absolute', left:limgs+'px', width:wimg+'px', height:himg+'px', top:timg+'px'}).appendTo($container);
			limgs += wimg;
		}
		var ll= l+ w+ (w/20);
		$('<div id="nav"></div>').css({position:'absolute', left:ll+'px', top:0, width:w+'px', height:htitle+'px',fontSize:fs+'px', textAlign:'center', zIndex:3000}).appendTo($container);
		$('<button id="p">Prev</button>').css({fontSize:fsb+'px'}).appendTo('#nav').hide();
		$('<button id="auto">Manual</button>').css({fontSize:fsb+'px'}).appendTo('#nav');
		$('<button id="n">Next</button>').css({fontSize:fsb+'px'}).appendTo('#nav').hide();
		
		
		$('#auto').bind('click', function(){ myobj.autoManual();
		})
		
		$('#n').bind('click', function(){myobj.moveForward()});
		$('#p').bind('click', function(){myobj.moveBackward()});
		
		
	this.move = function()
	{
		$('#auto').hide();
		for(var i=0; i<$options.images.length; i++)
		{
			$container.children("img").eq(i).stop(true, true).animate({left:"-="+wimg}, 100, function(){
			
				var li = parseInt($(this).css("left"));
				if(li== l + w - wimg)
				{
					$(this).css({left:l+'px', top:0, width:w+'px', height:'150px'})
					$('#title').html($options.descs[++myobj.counter]);
				}
				else
				{
					$(this).css({ top:timg+'px', width:wimg+'px', height:himg+'px'})
				}
				
			$('#auto').show();
			})
		}
		
		if(myobj.counter == $options.images.length-1)
		{
			myobj.flagb=1;
			myobj.counter++;
			$('#title').html("");
			clearInterval(myobj.intervalOne);			
			myobj.intervalTwo = setInterval(function(){myobj.realign();}, $options.speed);			
		}
	}
	this.realign = function()
	{
		myobj.counter = -1;
		clearInterval(myobj.intervalTwo);
		limgs = l + w
		for(var i=0; i<$options.images.length; i++)
		{
			$container.children('img').eq(i).css({ left:limgs+'px'});
			limgs += wimg;
		}
		myobj.callMove($options);
	}
	
	this.moveForward=function()
	{
		$('#p').hide();
		$('#n').hide();
		$('#auto').hide();
		var n = ($options.images.length)-1;
		var li = parseInt($container.children("img").eq(n).css('left'));
		for(var i=0; i<$options.images.length; i++)
		{
			$container.children('img').eq(i).animate({left:"-="+wimg}, 100, function(){
			
				var li = parseInt($(this).css("left"));
				if(li== l + w - wimg)
				{
					$(this).css({left:l+'px', top:0, width:w+'px', height:$options.height+'px'})
					$('#title').html($options.descs[++myobj.counter]);
				}
				else
				{
					$(this).css({ top:timg+'px', width:wimg+'px', height:himg+'px'})
				}
				
				$('#p').show();		        
		        $('#auto').show();
				if(li>l)
				   $('#n').show();
					
			});
		}
		
		
		if(li==l)
		{
					$('#n').hide();
					$('#title').html("");
					myobj.counter++;
					myobj.flagb = 1;
		}
		
	
	}
	
	this.moveBackward = function()
	{
		$('#n').hide();
		$('#p').hide();
		$('#auto').hide();
		myobj.flagb = 0;
	
		for(var i=0; i<$options.images.length; i++)
		{
		
		   var innerLeft = parseInt($container.children('img').eq(i).css("left"));
		
		   if(innerLeft==l)
		   {
			$container.children('img').eq(i).animate({left:"+="+w}, 100, function(){				
				
					$(this).css({top:timg+'px', width:wimg+'px', height:himg+'px'});

					
					
			
			});
		   }
		   else
		   {
				$container.children('img').eq(i).stop(true, true).animate({left:"+="+wimg}, 100, function(){
				var li = parseInt($(this).css("left"));
				if(li==l)
				{
						$(this).css({left:l+'px', top:0, width:w+'px', height:'150px'})
					    $('#title').html($options.descs[--myobj.counter]);
						
				}
				else
				{
					$(this).css({ top:timg+'px', width:wimg+'px', height:himg+'px'});
				}
				    var lib = parseInt($container.children('img').eq(0).css('left'));
		            console.log(lib);
		            console.log(l+w);
		            if(lib==l+w)
		            {
			           $('#p').hide();
			           $('#title').html("");
					   
			           myobj.flagb = 0;
					   myobj.counter=-1
		             }
					 
					 
					 $('#n').show();
					 if(lib<l+w)
		                 $('#p').show();
		             $('#auto').show();
				
				
				
			}); 
		   }
		}
		
		
		
	
	}
	
	this.moveDirect = function(indx)
	{
	
		var li = parseInt($container.children('img').eq(indx).css('left'));
		myobj.counter = indx;
		myobj.flagb=0;
		if(li>l)
		{
		
			var n1 = (li-(l+w-wimg))/wimg;
			
			for(var i=0; i<n1; i++)
			{
				for(var k=0; k<$options.images.length; k++)
				{
					$container.children('img').eq(k).stop(true, true).animate({left:"-="+wimg}, 10, function(){
					
						var lb = parseInt($(this).css('left'));
						if(lb==l+w-wimg)
						{
							$(this).css({left:l+'px', top:0, width:w, height:$options.height+'px'});
							$('#title').html($options.descs[indx]);
							
						}
						else
						{
								$(this).css({ top:timg+'px', width:wimg+'px', height:himg+'px'});
						}
					
					});
				}
			}
		
		}
		else
			if(li<l)
			{
				var n2 = (l - li)/wimg;
				
				for(var i=0; i<n2; i++)
				{
					for(var k=0; k<$options.images.length; k++)
					{
						//var lb = parseInt($container.children('img').eq(k).css('left'));
						/*if(lb == l)
						{
						
							$container.children('img').eq(k).stop(true, true).animate({left:"+="+w}, 10, function(){
							var m = l + w;
								$(this).css({left:m+'px',top:timg+'px', width:wimg+'px', height:himg+'px'});
								
							})
						}*/
						//else
						//{
						
						
						
								$container.children('img').eq(k).stop(true, true).animate({left:"+="+wimg}, 10, function(){
								var lb2 = parseInt($(this).css('left'));
								if(lb2==l+wimg)
								{
									console.log(lb2);
									console.log(l+wimg)
									var m = l+w;
									console.log(m)
									$(this).css({left:m+'px',top:timg+'px', width:wimg+'px', height:himg+'px'});
											console.log($(this).css('left'));
								}
								else
								if(lb2==l)
								{
									$(this).css({top:0, width:w+'px', height:$options.height+'px'});
									$('#title').html($options.descs[indx]);
								}
								else
								{
									$(this).css({top:timg+'px', width:wimg+'px', height:himg+'px'});									
								}
								
								})
						//}
						
						
					}
					
				}
			}
	
	}
	
	
	this.autoManual = function()
	{
	
		var n = ($options.images.length)-1;
		var li = parseInt($container.children("img").eq(n).css('left'));
		var li2 = parseInt($container.children("img").eq(0).css('left'));
		
		if(myobj.flag==0)
		{
			myobj.flag=1;
			clearInterval(myobj.intervalOne);
			clearInterval(myobj.intervalTwo);
			$('#auto').text('Auto');
			if(li+wimg!=l)
			{
			  $('#n').show();
			}
			if(li2!=l+w)
			  $('#p').show();
			  $container.children('img').css({cursor:'hand', cursor:'pointer'});
			 $container.children('img').bind('click', function(){
			 
				var i = $(this).attr('id');
				myobj.moveDirect(i);
			 
			 });
			  
			  
		}
		else
		{
			myobj.flag=0;
			  $container.children('img').css({cursor:'pointer'});
			$('#auto').text('Manual');
			$('#n').hide();
			$('#p').hide();
			if(myobj.flagb==1)
			{
			  myobj.flagb=0;
			  myobj.realign();
			}
			else
			{
			  myobj.callMove($options);
			}
			
			$container.children('img').unbind('click');
		}
	}

}

MyGallery.prototype.callMove = function($options)
{
	var myobj = this;
	myobj.flagb=0;
	myobj.intervalOne = setInterval(function(){myobj.move();}, $options.speed);
}

}(jQuery))