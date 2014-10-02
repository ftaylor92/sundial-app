/* draw this triangle. */
function drawClock(context, thickness, color, dtime, originPt, radius) {
		var origin= originPt.copy();

		// Draw a path
		//context.beginPath();
		//context.lineWidth= thickness;
		//context.moveTo(origin.x, origin.y);	// center of clock

		var minutesInADay= 60* 24;
		var minutesFromMidnight= dtime.getHours()* 60+ dtime.getMinutes();
		//var radiansAngle= Math.PI/180.0* 2* minutesInADay/minutesFromMidnight;
		var degreesAngle= 360* minutesFromMidnight/minutesInADay- 270;
		var radiansAngle= degToRad(degreesAngle);
		//context.lineTo(origin.x+ radius* Math.cos(radiansAngle), origin.y+ radius* Math.sin(radiansAngle));	//end of hour hand
		//context.closePath();

		var endOfHand= new Point(origin.x+ radius* Math.cos(radiansAngle), origin.y+ radius* Math.sin(radiansAngle));

		console.debug("minutesFromMidnight: "+ minutesFromMidnight);
		console.debug("radiansAngle: "+ radiansAngle);
		console.debug("degreesAngle: "+ degreesAngle);
		console.debug("endOfHand: "+ endOfHand.toString());

		var hand= new Line(origin, endOfHand);
		hand.draw(context, thickness, color);

		// Fill the path
		//context.fillStyle = color;
		//context.fill();

		//draw Numbers
		/*context.fillText("6", origin.x+ radius+ 5, origin.y);
		context.fillText("18", origin.x- radius- 15, origin.y);
		context.fillText("24/00", origin.x- 12, origin.y- radius);
		context.fillText("12", origin.x, origin.y+ radius);
		context.fillText("X1X", origin.x+Math.cos(2*Math.PI*1.0/24.0)*radius, origin.y+Math.sin(2*Math.PI*1.0/24.0)*radius);
		context.fillText("X2X", origin.x+Math.cos(2*Math.PI*2.0/24.0)*radius, origin.y+Math.sin(2*Math.PI*2.0/24.0)*radius);
		context.fillText("X3X", origin.x+Math.cos(2*Math.PI*3.0/24.0)*radius, origin.y+Math.sin(2*Math.PI*3.0/24.0)*radius);

		context.fillText("X4X", origin.x+Math.cos(2*Math.PI*4.0/24.0)*radius, origin.y+Math.sin(2*Math.PI*4.0/24.0)*radius);

		context.fillText("X20X", origin.x+Math.cos(2*Math.PI*20.0/24.0)*radius, origin.y+Math.sin(2*Math.PI*20.0/24.0)*radius);
		context.fillText("X21X", origin.x+Math.cos(2*Math.PI*21.0/24.0)*radius, origin.y+Math.sin(2*Math.PI*21.0/24.0)*radius);
		context.fillText("X2X", origin.x+Math.cos(2*Math.PI*22.0/24.0)*radius, origin.y+Math.sin(2*Math.PI*22.0/24.0)*radius);*/
		context.fillStyle = "YellowGreen";
		context.strokeStyle = "YellowGreen";
		for(var c= 1; c < 24; c++) {
	 		context.fillText(""+c, origin.x+Math.cos(2*Math.PI*c/24.0- Math.PI/2)*radius, origin.y+Math.sin(2*Math.PI*c/24.0- Math.PI/2)*radius);
		}
	}

/**866 723 0513, 800 717 6710
Place Class.
**/
function Place(lat, lon, dtime, dialname) {
	this.quadrant= "";
	this.latitude= lat;
	this.quadrant+= (lat > 0.0) ? "N" : "S";

	this.longitude= lon;
	this.quadrant+= (lon > 0.0) ? "E" : "W";

	this.timezone= timezone= Math.round((this.longitude)/15.0);	//Math.abs

	this.sundialName= dialname;
	//console.log("dtime: "+ dtime.getTime());
	this.time= new Date(dtime.getTime());
	this.ticker= new Date(dtime.getTime());
	this.ticker.roundTenMinutes();
	//this.ticker= new Date("2014-01-03T22:35Z");
	console.log("ticker: "+ this.ticker);

	this.setNavyAngles= function(a) {
		this.navyAngles= a;
	}

	this.setNavyData= function(d) {
		this.navyData= d;

		var dtPart= dateStringConverter(d.ddate); //NavyAngles[n].ddate.replace(/\//g,'-');
		var tstr= timeConverter(d.Time);
		var dstr= dtPart+"T"+tstr;
		console.log("dstr: "+ dstr);
		this.ndate= new Date(dstr);
		console.log();
	}
}

/**
Point Class
params: x,y: x,y coordinates of this Point
**/
function Point(x,y) {
	this.x= x;
	this.y= y;

	this.draw= function(context, thickness, color) {
		var pointLine= new Line(this,new Point(this.x+ 1,this.y+ 1));
		pointLine.draw(context, thickness, color);
	}

	this.copy= function() {
		var newPoint= new Point(this.x,this.y);

		return newPoint;
	}

	this.move= function(x,y) {
		//console.log("pt: "+ new Point(this.x,this.y).toString());
		this.x+= x;
		this.y+= y;
		//console.log("ptm: "+ new Point(this.x,this.y).toString());
	}

	this.toString= function() {
		return "("+this.x+","+this.y+")";
	}
}

/**
	Circle class.
**/
function Circle(origin, radiusLength) {
	this.origin= origin.copy();
	this.radiusLen= radiusLength;

	this.draw= function(context, thickness, color) {
		//console.log("circle: "+ this.toString());
		this.origin.draw(context, thickness, color);

		//draw each point on a 360-degree circle
		for(var ang= 0; ang <= 360; ang++) {
			var pointOnPerimeter= new Point(this.origin.x+ Math.sin(degToRad(ang))*this.radiusLen, this.origin.y+ Math.cos(degToRad(ang))*this.radiusLen);
			//console.log("c-pt("+ang+"): "+ pointOnPerimeter.toString());
			//console.log("cos("+ang+"): "+ Math.cos(degToRad(ang)));
			//console.log("sin("+ang+"): "+ Math.sin(degToRad(ang)));

			pointOnPerimeter.draw(context, thickness, color);
		}
	}

	this.copy= function() {
		var newCircle= new Circle(this.origin, this.radiusLen);

		return newCircle;
	}

	this.move= function(x,y) {
		this.origin.move(x,y);		
	}

	this.toString= function() {
		return this.origin.toString()+","+this.radiusLen;
	}
}

/**
Line Class
params: p1, p2: Points defining a line
**/
function Line(p1, p2) {
	this.p1= p1.copy();
	this.p2= p2.copy();

	/* draws this Line. */
	this.draw= function(context, thickness, color) {
		context.beginPath();
		context.lineWidth= thickness;
		context.strokeStyle= color;

		context.moveTo(this.p1.x, this.p1.y);
		context.lineTo(this.p2.x, this.p2.y);
		context.stroke();
	}

	this.copy= function() {
		var newLine= new Line(this.p1, this.p2);

		return newLine;
	}

	this.move= function(x,y) {
		//console.log("p2: "+this.p2.toString());
		this.p1.move(x,y);
		this.p2.move(x,y);		
		//console.log("p2m: "+this.p2.toString());
	}

	this.toString= function() {
		return this.p1.toString()+","+this.p2.toString();
	}
}

/**
Triangle Class
params a,b,h: lines describing side, base, and hyponenuese.
**/
function Square(a,b,c,d) {
	this.a= a.copy();
	this.b= b.copy();
	this.c= c.copy();
	this.d= d.copy();

	this.create= function(a,b,c) {
		this.a= a.copy();
		this.b= b.copy();
		this.c= c.copy();
		this.d= new Line(c.p2,a.p1);
	}

	/* draw this square. */
	this.draw= function(context, thickness, color) {
		this.a.draw(context, thickness, color);
		this.b.draw(context, thickness, color);
		this.c.draw(context, thickness, color);
		this.d.draw(context, thickness, color);
	}

	this.move= function(x,y) {
		//console.log("a: "+this.a.toString());
		this.a.move(x,y);
		this.b.move(x,y);
		this.c.move(x,y);
		this.d.move(x,y);
		//console.log("am: "+this.a.toString());
	}

	this.copy= function() {
		var newSquare= new Square(this.a, this.b, this.c, this.d);

		return newSquare;
	}

	this.toString= function() {
		return this.a.toString()+","+this.b.toString()+","+this.c.toString()+","+this.d.toString();
	}
}

/**
	Cube class.
**/
function Cube(sq, depth) {
	this.front= sq.copy();
	this.depth= depth;

	/* draw this cube. */
	this.draw= function(context, thickness, color, hAng, vAng) {
		var back= this.front.copy();

		//console.log("cos("+hAng+")="+ radToDeg(Math.cos(degToRad(hAng))));
		//console.log("sin("+vAng+")="+ radToDeg(Math.sin(degToRad(vAng))));

		var xMove= this.depth* Math.cos(degToRad(hAng));
		var yMove= this.depth* Math.sin(degToRad(vAng));
		back.move(xMove, yMove);
		this.front.draw(context, thickness, color);
		back.draw(context, thickness, color);
		new Line(back.a.p1, this.front.a.p1).draw(context, thickness, color);
		new Line(back.a.p2, this.front.a.p2).draw(context, thickness, color);
		new Line(back.c.p1, this.front.c.p1).draw(context, thickness, color);
		new Line(back.c.p2, this.front.c.p2).draw(context, thickness, color);
	}

	this.toString= function() {
		return this.front.toString()+","+this.depth;		
	}

	this.move= function(x,y) {
		this.front.move(x,y);
	}
}

/**
Triangle Class
params a,b,h: lines describing side, base, and hyponenuese.
**/
function Triangle(a,b,h) {
	this.a= a.copy();
	this.b= b.copy();
	this.h= h.copy();

	this.createFromPoints= function(a,b,c) {
		this.a= new Line(a,b);
		this.b= new Line(b,c);
		this.c= new Line(c,a);

		return this;
	}

	/**
		constructor.
		params: a= side Line
				bLen= base length
	**/
	this.create= function(a, bLen) {
		this.a= a.copy();
		var bP1= new Point(this.a.p2.x, this.a.p2.y);
		var bP2= new Point(this.a.p2.x+ bLen, this.a.p2.y);
		this.b= new Line(bP1, bP2);
		this.h= new Line(this.b.p2, this.a.p1);

		return this;
	}

	/**
		constructor.
		params: p2 - point where triangle's right angle is at
				bLen - length of base line
				degrees - degrees of opposite angle
				orient - -1 or 1 depending on which side the triangle should fall
	**/
	this.createFromAngle= function(p2, bLen, degrees, orient) {
		//this.a= a;
		var bP1= p2.copy();
		var bP2= new Point(p2.x+ bLen, p2.y);		
		this.b= new Line(bP1, bP2);

		//angle= 48.0;
		var radians= degToRad(degrees);

		var tanLen= Math.tan(radians);

		this.a= new Line(bP1, new Point(p2.x, p2.y- orient* Math.abs(Math.tan(radians)* bLen)));

		console.log("degrees: "+ degrees);
		console.log("radians: "+ radians);
		console.log("Tan: "+ Math.tan(radians));
		console.log("Tan*length: "+ Math.abs(Math.tan(radians)* bLen));

		this.h= new Line(this.b.p2, this.a.p1);

		return this;
	}

	/**
		constructor.
		params: p2 - point where triangle's right angle is at
				bLen - length of hyposenuese
				degrees - degrees of opposite angle
				orient - -1 or 1 depending on which side the triangle should fall
	**/
	this.createFromAngle2= function(p2, bLen, degrees, orient) {
		var radians= degToRad(360- degrees+ 270); //degrees+ 180);
		if(-1 == orient)	radians= degToRad(degrees+ 270);

		xC= radius* Math.cos(radians) + p2.x;
		yC= radius* Math.sin(radians) + p2.y;


		var bP1= p2.copy();
		var bP2= new Point(xC, yC);		//+ (bLen*orient)
		this.a= new Line(bP2, bP1);

		this.b= new Line(bP2, new Point(p2.x,p2.y-Math.abs(bLen))); //new Point(p2.x, p2.y- orient* Math.abs(Math.cos(radians)* bLen)));

		console.log("degrees: "+ degrees);
		console.log("radians: "+ radians);
		console.log("Tan: "+ Math.tan(radians));
		console.log("Tan*length: "+ Math.abs(Math.sin(radians)* bLen));

		this.h= new Line(this.a.p2, this.b.p2);

		return this;
	}

	/**
		tilt top of triangle on x-axis
	**/
	this.tiltX= function(percent) {
		this.h.p1.x= this.h.p1.x- Math.abs(this.h.p1.x-this.h.p2.x)*(percent/100);
		this.b.p2.x= this.b.p2.x- Math.abs(this.b.p2.x-this.b.p1.x)*(percent/100);
		return this;
	}

	/* draw this triangle. */
	this.draw= function(context, thickness, color) {
		// Draw a path
		context.beginPath();
		context.fillStyle = color;
		context.lineWidth= thickness;
		context.moveTo(this.a.p1.x, this.a.p1.y);	// Top Corner
		context.lineTo(this.a.p2.x, this.a.p2.y);	// Bottom Right
		context.lineTo(this.b.p2.x, this.b.p2.y);	// Bottom Left
		context.closePath();

		// Fill the path

		context.fill();
	}

	this.copy= function() {
		var newTriangle= new Triangle(this.a, this.b, this.h);

		return newTriangle;
	}

	this.move= function(x,y) {
		this.a.move(x,y);
		this.b.move(x,y);
		this.h.move(x,y);
	}

	this.toString= function() {
		return this.a.toString()+","+this.b.toString()+","+this.h.toString();
	}
}

/* degrees to radians. */
function degToRad(degrees) {
		return degrees*Math.PI/180.0;
}
/* radians to degrees. */
function radToDeg(radians) {
		return radians*180.0/Math.PI;
}
