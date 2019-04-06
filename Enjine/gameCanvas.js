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

Enjine.GameCanvas.prototype = {
    Initialize: function(canvasId, resWidth, resHeight) {
		this.Canvas = document.getElementById(canvasId);

		this.Canvas.width = window.innerWidth - 5;
		this.Canvas.height = window.innerHeight - 5;

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

		this.Context2D.save();
		this.Context2D.globalAlpha = 0.35;
		this.Context2D.fillStyle = "rgba(0, 255, 255)";

		this.Context2D.beginPath();
		this.Context2D.drawImage(leftImage, this.Canvas.width / 15 - radius, this.Canvas.height / 2 - 2.3 * radius, radius * 2, radius * 2)
		var leftX = this.Canvas.width / 15;
		var leftY = this.Canvas.height / 2 - 1.3 * radius;
		this.Context2D.arc(leftX, leftY, radius, 0, 2 * Math.PI);
		this.Context2D.fill();

		this.Context2D.beginPath();
		this.Context2D.drawImage(rightImage, this.Canvas.width / 15 * 2 - radius, this.Canvas.height / 2 + 0.3 * radius, radius * 2, radius * 2)
		var rightX = this.Canvas.width / 15 * 2;
		var rightY = this.Canvas.height / 2 + 1.3 * radius;
		this.Context2D.arc(rightX, rightY, radius, 0, 2 * Math.PI);
		this.Context2D.fill();

		this.Context2D.restore();

		this.Canvas.addEventListener('mousedown', function(event) {
			console.log(event.pageX, event.pageY);
			var x = event.pageX,
				y = event.pageY;

			// Collision detection between clicked offset and element.

			// TODO: Keypress event
		});
	}
};
