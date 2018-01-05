//

let w

function setup() {
	createCanvas( 640, 360 )
	w = new Walker()
	background( 255 )
}

function Walker() {
	this.x = width / 2
	this.y = height / 2

	this.display = function () {
		stroke( 0 )
		point( this.x, this.y )
	}

	this.step = function () {
		const choice = parseInt( random( 4 ) )
		if ( choice === 0 ) {
			this.x++
		} else if ( choice === 1 ) {
			this.x--
		} else if ( choice === 2 ) {
			this.y++
		} else {
			this.y--
		}
	}
}

function draw() {
	w.step()
	w.display()
}

function windowResized() {
	// resizeCanvas( windowWidth, windowHeight )
}
