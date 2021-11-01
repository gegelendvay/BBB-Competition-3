var betutipus = ["Arial","Verdana","Helvetica","Tahoma","Trebuchet MS","Times New Roman","Georgia","Garamond","Courier New","Brush Script MT"];
var kozepsojo = ["ok","🦍","😳"];
var kozepsorossz = ["asd","🤢","jó"];

var adatok = [];
var nehezseg = 3;
var sebesseg = 1.2;

var MaxTime = 60;
var timeLeft = MaxTime;
var pont = 0;

var ab1 = false;
var ab2 = false;

var Resi;
var timer;
var timerujra;

class adat
{
  constructor( xpoz, ypoz, font, text, elet, rr, rg, ry, opacity, pontotAd ) 
  {
    this.xpoz = xpoz;
    this.ypoz = ypoz;
	this.font = font;
	this.text = text;
	this.elet = elet;
	this.rr = rr;
	this.rg = rg;
	this.ry = ry;
	this.opacity = opacity;
	this.pAd = pontotAd;
  }
}

$(document).ready(
function()
{
	$(".k_gomb").click(
	function()
	{
		if( timeLeft != MaxTime )
		{
			location.reload();
		}
		
		$(".jatekkezdo_doboz").hide();
		$(".ab_alert_doboz").show();
		$("#canvas").show();
		Resi = setInterval( canvasResi, 30 );
		timeLeft = MaxTime;
		timer = setInterval(updateTimer, 1000);
		setComponent();
		updateTimer();
		adatLoop();
	});
	
	$(".n_gomb").click(
	function()
	{
		clearInterval( timer );
		clearInterval( timerujra );
		if( $(this).hasClass("konnyu_gomb") )
		{
			nehezseg--;
			if( nehezseg == 0 )
			nehezseg++;
		}
		else
		{
			nehezseg++;
			if( nehezseg == 7 )
			nehezseg--;
		}
		
		if( nehezseg == 6 )
		$(".nehezseg_mutato").html("Nehézség: HARDCORE");
		else
		$(".nehezseg_mutato").html("Nehézség: "+nehezseg );
		
		timeLeft = MaxTime;
		if( $("#canvas").css("display") != "none" ){ timerujra = setInterval(updateTimer, 1000); }
		$(".visszaszamlalo").html("A hátramaradt idő: "+timeLeft+" másodperc");
		
		pont = 0;
		$(".pont_holder").html("A pontjaid száma: "+pont );
	});
});

function setComponent()
{
	if( Math.random() > 0.5 )
	{
		var megfelelo = kozepsojo[ Math.floor( Math.random() * 3 ) ];
		var pontotAd = true;
	}
	else
	{
		var megfelelo = kozepsorossz[ Math.floor( Math.random() * 3 ) ];
		var pontotAd = false;
	}
	
	var c = document.getElementById("canvas");
	var p = c.getContext("2d");
	var cw = c.offsetWidth;
	var ch = c.offsetHeight;
	
	var xpoz = Math.floor( Math.random() * ( cw - 300 ) + 50 );
	var ypoz = Math.floor( Math.random() * ( ch / 2 ) + 100 );
	
	if( adatok.length != 0 )
	{
		for( var i = 0; i < adatok.length; i++ )
		{
			if( xpoz + 300 > adatok[i].xpoz && xpoz - 300 < adatok[i].xpoz && ypoz + 150 > adatok[i].ypoz && ypoz - 150 < adatok[i].ypoz )
			{
				var tovabb = false;
			}
			else
			{
				var tovabb = true;
			}
		}
	}
	else
	{
		var tovabb = true;
	}
	
	if( !tovabb )
	{
		for( var i = 0; i < adatok.length; i++ )
		{
			if( adatok[i].xpoz + 100 > 100 && adatok[i].xpoz - 100 < 100 && adatok[i].ypoz + 50 > 100 && adatok[i].ypoz - 50 < 100 )
			{
				tovabb = false;
			}
			else
			{
				xpoz = 100;
				ypoz = 100;
				tovabb = true;
			}
		}
		
	}
	
	if( tovabb )
	{
		var font = betutipus[ Math.floor( Math.random() * 9 ) ];
		var text = Math.floor( Math.random() * 10000 )+""+megfelelo+""+Math.floor( Math.random() * 10000 );
		
		if( !ab1 )
		{
			var rr = Math.floor( Math.random() * 256 );
			var rg = Math.floor( Math.random() * 256 );
			var ry = Math.floor( Math.random() * 256 );
		}
		else if( pontotAd )
		{
			var rr = 255;
			var rg = 0;
			var ry = 0;
		}
		else
		{
			var rr = 60;
			var rg = 60;
			var ry = 60;
		}
		
		var opacity = 1;
		var elet = 200 / nehezseg;
	
		var ujadat = new adat( xpoz, ypoz, font, text, elet, rr, rg, ry, opacity, pontotAd  );
		adatok.push( ujadat );
	}
}

function update()
{
	var c = document.getElementById("canvas");
	var p = c.getContext("2d");
	var cw = c.offsetWidth;
	var ch = c.offsetHeight;

	for ( var i = 0; i < adatok.length; i++ )
	{
		koordcsere( adatok[i], cw, ch );
	}
}

function canvasResi() 
{
	var c = document.getElementById("canvas");
	var p = c.getContext("2d");
	var cw = c.offsetWidth;
	var ch = c.offsetHeight;
	p.clearRect(0, 0, cw, ch);

	update();

	for( var i = 0; i < adatok.length; i++ )
	{
		p.fillStyle = "rgba("+adatok[i].rr+","+adatok[i].rg+","+adatok[i].ry+","+adatok[i].opacity+")";
		p.strokeStyle = "rgba(0,0,0,"+adatok[i].opacity+")";
		p.font = "30px "+adatok[i].font;
		
		p.fillText( adatok[i].text, adatok[i].xpoz, adatok[i].ypoz );
		p.strokeText( adatok[i].text, adatok[i].xpoz, adatok[i].ypoz );
	}
}

function koordcsere( egyadat, cw, ch )
{
	var c = document.getElementById("canvas");
	var p = c.getContext("2d");
	
	if( egyadat.elet > 1 )
	{
		egyadat.ypoz += nehezseg * ( sebesseg + nehezseg / 10);
		egyadat.opacity -= ( nehezseg / 200);
		egyadat.elet--;
	}
	else
	{
		if( egyadat.pAd )
		{
			if( nehezseg == 6 )
			{
				gameOver();
				timeLeft = 0;
				$(".visszaszamlalo").html("A hátramaradt idő: "+timeLeft+" másodperc");
			}
			pont--;
			$(".pont_holder").html("A pontjaid száma: "+pont );
		}
		adatok.splice( egyadat , 1 );
		p.clearRect(0, 0, cw, ch);
	}
}

$(document).on("mouseup" , function(e)
{
	var c = document.getElementById("canvas");
	var p = c.getContext("2d");
	var ePoz = getMousePoz(c, e);
	
	for( var i = 0; i < adatok.length; i++ )
	{
		//console.log("egérX: "+ePoz.x+" , adatX: "+adatok[i].xpoz+" , egérY: "+ePoz.y+" , adatY: "+adatok[i].ypoz);
		if
		(
			ePoz.x >= adatok[i].xpoz - 10 && ePoz.x <= adatok[i].xpoz + adatok[i].text.length * 21 &&
			ePoz.y >= adatok[i].ypoz - 60 && ePoz.y <= adatok[i].ypoz + 20
		)
		{
			if( adatok[i].pAd )
			pont++;
			else if( nehezseg == 6 )
			{
				timeLeft = 0;
				gameOver();
				$(".visszaszamlalo").html("A hátramaradt idő: "+timeLeft+" másodperc");
				pont--;
			}
			else
			pont--;
			
			adatok[i].xpoz = -1000;
			adatok[i].ypoz = -1000;
			adatok[i].pAd = false;
			//adatok[i].elet = 0; --> Se ez, se a slice nem működik és fogalmam sincs, hogy miért.
			$(".pont_holder").html("A pontjaid száma: "+pont );
		}
	}
});

$(document).on("keyup" , function(e)
{
	if( e.keyCode == 81 ) //Q
	{
		ab1 = true;
		$(".ab1").css(
		{
			"border":"3px solid red",
			"background":"white",
			"color":"red"
		});
		
		setTimeout(
		function()
		{
			ab1 = false;
			$(".ab1").css(
			{
				"border":"3px solid black",
				"background":"#333333",
				"color":"black"
			});
		},10000);
	}
	if( e.keyCode == 87 ) //W
	{
		ab2 = true;
		var elozoS = sebesseg;
		sebesseg = nehezseg / 10 * (-1);
		$(".ab2").css(
		{
			"border":"3px solid red",
			"background":"white",
			"color":"red"
		});
		
		setTimeout(
		function()
		{
			ab1 = false;
			sebesseg = elozoS;
			$(".ab2").css(
			{
				"border":"3px solid black",
				"background":"#333333",
				"color":"black"
			});
		},5000);
	}
	if( e.keyCode == 69 ) //E
	{
		timeLeft += pont * 10;
		$(".ab3").css(
		{
			"border":"3px solid black",
			"background":"#333333",
			"color":"black"
		});
	}
});

function getMousePoz(c, e)
{
    var rect = c.getBoundingClientRect(),
		scaleX = c.width / rect.width,
		scaleY = c.height / rect.height;
	var ligma = 
	{
		x: (e.clientX - rect.left) * scaleX,
		y: (e.clientY - rect.top) * scaleY
	};
    return ligma;
}

function takarit()
{
	var c = document.getElementById("canvas");
	var p = c.getContext("2d");
	var cw = c.offsetWidth;
	var ch = c.offsetHeight;
	p.clearRect(0, 0, cw, ch);
}

function updateTimer()
{
	timeLeft -= 1;
	
	if( timeLeft >= 0 )
	$(".visszaszamlalo").html("A hátramaradt idő: "+timeLeft+" másodperc");
	else 
	gameOver();
}

function adatLoop()
{
	var rand = Math.random() * 1000 + 1000 - nehezseg * 100;
	setTimeout(
	function()
	{
		setComponent();
		adatLoop();  
	}, rand );
}

function gameOver()
{
	clearInterval( timer );
	clearInterval( timerujra );
	clearInterval( Resi );
	takarit();
	$("#canvas").animate(
	{
		"opacity":"0"
	},
	2000,
	function()
	{
		$("#canvas").hide();
		$("#canvas").css(
		{
			"opacity":"1"
		});
		$(".k_gomb").html("A játék újratöltése");
		$(".jatekkezdo_doboz").show();
		$(".ab_alert_doboz").hide();
		$(".info_doboz").hide();
		setTimeout(
		function()
		{
			alert("A pontjaid száma: "+pont );
			pont = 0;
			$(".pont_holder").html("A pontjaid száma: "+pont );
		}, 1000 );
	});
	
	//$('#playAgainButton').show();
}