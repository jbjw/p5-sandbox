//

import * as utils from "../libraries/utils.js"

var x = 0
var y = 0
var vx = 0.01
var vy = 0.1

var time = 0

// let width = 5, height

const objects = []

// let canvas
function setup() {
	// displayWidth
	// windowWidth
	// canvas = createCanvas( windowWidth, windowHeight )
	createCanvas( windowWidth, windowHeight )
	// createCanvas( width, height )
	// createCanvas( 600, 400 )

	// canvas.onclick = function() {
	// 	console.log('what')
	// 	canvas.requestPointerLock();
	// }
	// var ship = new Ship()
	const ship = new Ship({
		startX: width/2,
		startY: height/2,
	})
	objects.push( ship )
	console.log( objects )
}

function windowResized() {
	// resizeCanvas( windowWidth, windowHeight )
}

function draw() {
	background( 100 )

	// if ( x > width || x < 0 ) {
	// 	x = width/2
	// }
	// if ( y > height || y < 0 ) {
	// 	y = height/2
	// }

	time++

	for ( let object of objects ) {
		object.update()
		object.draw()
	}
}

function Ship(args) {
	if ( typeof args == "undefined" ) {
		args = {}
	}
	if ("startX" in args) {
		this.x = args.startX
	} else {
		this.x = width/2
	}
	if ("startY" in args) {
		this.y = args.startY
	} else {
		this.y = height/2
	}
	this.vx = 0, this.vy = 0
	this.thrust = 0.1
	this.draw = function () {
		ellipse(this.x, this.y, 10, 10)
	}
	this.update = function () {
		// drag
		// var drag = 0.01
		// this.vx -= this.vx*drag
		// this.vy -= this.vy*drag

		// dampen
		var dampenThrust = 0.1
		var moving = keyIsDown( LEFT_ARROW )
			|| keyIsDown( RIGHT_ARROW )
			|| keyIsDown( UP_ARROW )
			|| keyIsDown( DOWN_ARROW )

		if ( !moving ) {
			console.log("dampening")
			// vx 1.1
			// normally subtract 0.5 every tick, end up bouncing


			if ( this.vx > 0 ) {
				// this.vx -= dampenThrust
				this.vx -= min(abs(this.vx), dampenThrust)
			}
			if ( this.vx < 0 ) {
				// this.vx += dampenThrust
				this.vx += min(abs(this.vx), dampenThrust)
			}
			if ( this.vy > 0 ) {
				// this.vy -= dampenThrust
				this.vy -= min(abs(this.vy), dampenThrust)
			}
			if ( this.vy < 0 ) {
				// this.vy += dampenThrust
				this.vy += min(abs(this.vy), dampenThrust)
			}
		}



		// this.vx -= max(this.vx, dampenThrust)
		// var xApply =
		// this.vx

		// if ( this.x > height)

		if ( keyIsDown( LEFT_ARROW ) ) {
			this.vx -= this.thrust
		}
		if ( keyIsDown( RIGHT_ARROW ) ) {
			this.vx += this.thrust
		}
		if ( keyIsDown( UP_ARROW ) ) {
			this.vy -= this.thrust
		}
		if ( keyIsDown( DOWN_ARROW ) ) {
			this.vy += this.thrust
		}
		this.x += this.vx, this.y += this.vy
	}
}

// var myCanvas = createCanvas(600, 400);

// const canvas = document.querySelector( "canvas" )
// .requestPointerLock()
// document.exitPointerLock();

// e.movementX
// mousemove

// fullscreen()

// function draw() {
// 	// console.log(mouseX, mouseY)
// 	// if (mouseIsPressed) {
// 	// 	fill(0)
// 	// } else {
// 	// 	fill(255)
// 	// }
// 	// ellipse(mouseX, mouseY, 80, 80)
// }
