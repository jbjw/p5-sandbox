//

let x, y
let c

function setup() {
	x = windowWidth / 2
	y = windowHeight / 2
	createCanvas( windowWidth, windowHeight )
	c = color( random( 0, 255 ), random( 0, 255 ), random( 0, 255 ) )

	var objects = []

	for ( let i = 0; i < 100; i++ ) {
		objects.push( new Walker( x, y, c ) )
	}



	setInterval( function () {
		clear()
		for ( let object of objects ) {
			object.update()
		}
		// x.update()
	}, 10 )
}

function Walker( x, y ) {
	this.x = x, this.y = y
	this.xDev = random( -0.05, 0.1 )
	this.yDev = random( -0.05, 0.1 )

	this.update = function () {
		// const xDiff = mouseX - x, yDiff = mouseY - y
		// x += random( -xDiff*0.5, xDiff )
		// y += random( -yDiff*0.5, yDiff )
		x += random( -1, 1 ) + this.xDev
		y += random( -1, 1 ) + this.yDev
		// clear()
		ellipse( x, y, 5, 5 )
		fill( c )
	}
}

function draw() {

}

function windowResized() {
	resizeCanvas( windowWidth, windowHeight )
}
