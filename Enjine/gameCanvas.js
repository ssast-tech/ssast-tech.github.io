/**
	Base class to represent a double buffered canvas object.
	Code by Rob Kleffner, 2011
*/

Enjine.GameCanvas = function() {
	this.Canvas = null;
	this.Context2D = null;
    this.BackBuffer = null;
	this.BackBufferContext2D = null;
};

var start = false;


function resize(that)
{
	/*
	that.Canvas.width = screen.width;
	that.Canvas.height = screen.height;
	*/
	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	if(iOS)
	{
		that.Canvas.width = window.innerWidth * 0.95;
		that.Canvas.height = that.Canvas.width / 2;
	}
	else
	{
		that.Canvas.width = window.innerWidth;
		that.Canvas.height = window.innerHeight;
	}


	//alert(String(that.Canvas.width) + ' ' + String(that.Canvas.height));
	if(that.Canvas.height > that.Canvas.width)
		that.Canvas.height = that.Canvas.width;
}

Enjine.GameCanvas.prototype = {
	Initialize: function(canvasId, resWidth, resHeight) {
		this.Canvas = document.getElementById(canvasId);

		var that = this;

		resize(that);

		window.addEventListener('resize', function(){
			resize(that);
		});

		window.addEventListener('orientationchange', function(){
			resize(that);
		});

		this.Context2D = this.Canvas.getContext("2d");
		this.BackBuffer = document.createElement("canvas");
		this.BackBuffer.width = resWidth;
		this.BackBuffer.height = resHeight;
		this.BackBufferContext2D = this.BackBuffer.getContext("2d");

	},

	BeginDraw: function() {
		this.BackBufferContext2D.clearRect(0, 0, this.BackBuffer.width, this.BackBuffer.height);
		this.Context2D.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
	},

	EndDraw: function() {
		this.Context2D.drawImage(this.BackBuffer, 0, 0, this.BackBuffer.width, this.BackBuffer.height, 0, 0, this.Canvas.width, this.Canvas.height);

		var radius = this.Canvas.width / 16;

		var leftImage = new Image();
		leftImage.src = "images/baseline-arrow_back_invert-24px.svg";

		var rightImage = new Image();
		rightImage.src = "images/baseline-arrow_forward_invert-24px.svg";

		var upImage = new Image();
		upImage.src ="images/baseline-up.svg";

		var backImage = new Image();
		backImage.src ="images/baseline-home.svg";

		var attackImage = new Image();
		attackImage.src ="images/baseline-attack.svg";

		this.Context2D.save();
		this.Context2D.globalAlpha = 0.35;
		this.Context2D.fillStyle = "rgba(0, 255, 255)";

		this.Context2D.beginPath();
		this.Context2D.drawImage(leftImage, this.Canvas.width /15 - radius, this.Canvas.height / 2 +radius, radius * 2, radius * 2)
		var leftX = this.Canvas.width / 15;
		var leftY = this.Canvas.height / 2 +2 * radius;
		this.Context2D.arc(leftX, leftY, radius, 0, 2 * Math.PI);
		this.Context2D.fill();

		this.Context2D.beginPath();
		this.Context2D.drawImage(rightImage, this.Canvas.width / 15 * 2 , this.Canvas.height / 2 +  radius, radius * 2, radius * 2)
		var rightX = this.Canvas.width / 15 * 3;
		var rightY = this.Canvas.height / 2 + 2 * radius;
		this.Context2D.arc(rightX, rightY, radius, 0, 2 * Math.PI);
		this.Context2D.fill();

		this.Context2D.beginPath();
		this.Context2D.drawImage(upImage, this.Canvas.width /15*11 , this.Canvas.height / 2 +  radius, radius * 2, radius * 2)
		var upX = this.Canvas.width / 15*12;
		var upY = this.Canvas.height / 2 + 2 * radius;
		this.Context2D.arc(upX, upY, radius, 0, 2 * Math.PI);
		this.Context2D.fill();

		this.Context2D.beginPath();
		this.Context2D.drawImage(backImage, this.Canvas.width /15 *13, this.Canvas.height /10-radius, radius * 2, radius * 2)
		var backX = this.Canvas.width / 15*14;
		var backY = this.Canvas.height / 10;
		this.Context2D.arc(backX, backY, radius, 0, 2 * Math.PI);
		this.Context2D.fill();

		this.Context2D.beginPath();
		this.Context2D.drawImage(attackImage, this.Canvas.width /15 *13, this.Canvas.height /2 +  radius, radius * 2, radius * 2)
		var attackX = this.Canvas.width / 15*14;
		var attackY = this.Canvas.height / 2 + 2 * radius;
		this.Context2D.arc(attackX, attackY, radius, 0, 2 * Math.PI);
		this.Context2D.fill();

		this.Context2D.restore();
		var body = document.body.getBoundingClientRect();

		this.Canvas.addEventListener('touchstart', function(event) {
			event.preventDefault();

			if(!start)
			{
				Enjine.KeyboardInput.Pressed[83]=true;
				return;
			}

			var e;
			for(e of event.touches)
			{
				var x = e.clientX,
					y = e.clientY - body.top;
				if(x>=rightX-radius&&x<=rightX+radius&&y>=rightY-radius&&y<=rightY+radius)
				{Enjine.KeyboardInput.Pressed[39]=true;
					//setTimeout(function(){Enjine.KeyboardInput.Pressed[39]=false},200);
					//右键
				}
				if(x>=leftX-radius&&x<=leftX+radius&&y>=leftY-radius&&y<=leftY+radius)
				{Enjine.KeyboardInput.Pressed[37]=true;
					//setTimeout(function(){Enjine.KeyboardInput.Pressed[37]=false},200);
					//左键
				}
				if(x>=upX-radius&&x<=upX+radius&&y>=upY-radius&&y<=upY+radius)
				{Enjine.KeyboardInput.Pressed[83]=true;
					//setTimeout(function(){Enjine.KeyboardInput.Pressed[83]=false},200);
					//跳越键
				}
				if(x>=attackX-radius&&x<=attackX+radius&&y>=attackY-radius&&y<=attackY+radius)
				{Enjine.KeyboardInput.Pressed[65]=true;
					//setTimeout(function(){Enjine.KeyboardInput.Pressed[65]=false},200);
					//攻击键
				}
				if(x>=backX-radius&&x<=backX+radius&&y>=backY-radius&&y<=backY+radius)
				{location.reload() ;
					//home键
				}
			}
		});

		this.Canvas.addEventListener('touchend', function(event) {
			event.preventDefault();

			var newR = 4 * radius;

			if(!start)
			{
				Enjine.KeyboardInput.Pressed[83]=false;
				start = true;
				return;
			}

			var e;
			for(e of event.changedTouches)
			{
				var x = e.clientX,
					y = e.clientY - body.top;

				if(x>=rightX-newR&&x<=rightX+newR&&y>=rightY-newR&&y<=rightY+newR)
				{Enjine.KeyboardInput.Pressed[39]=false;
					//setTimeout(function(){Enjine.KeyboardInput.Pressed[39]=false},200);
					//右键
				}
				if(x>=leftX-newR&&x<=leftX+newR&&y>=leftY-newR&&y<=leftY+newR)
				{Enjine.KeyboardInput.Pressed[37]=false;
					//setTimeout(function(){Enjine.KeyboardInput.Pressed[37]=false},200);
					//左键
				}
				if(x>=upX-newR&&x<=upX+newR&&y>=upY-newR&&y<=upY+newR)
				{Enjine.KeyboardInput.Pressed[83]=false;
					//setTimeout(function(){Enjine.KeyboardInput.Pressed[83]=false},200);
					//跳越键
				}
				if(x>=attackX-newR&&x<=attackX+newR&&y>=attackY-newR&&y<=attackY+newR)
				{Enjine.KeyboardInput.Pressed[65]=false;
					//setTimeout(function(){Enjine.KeyboardInput.Pressed[65]=false},200);
					//攻击键
				}
			}
		});
	}
};
