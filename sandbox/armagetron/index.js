//

const select = document.querySelector.bind( document )
const selectAll = document.querySelectorAll.bind( document )


const numPlayers = 1
const strokeMode = true // this or string/enum?

const defaultStepsPerRender = 10
const defaultStepDistance = 5

const players = []

// consider adding wrapping
// consider finishing strokeMode

function randomColor() {
	return color( random( 255 ), random( 255 ), random( 255 ) )
}

function setup() {
	const canvas = createCanvas( 640, 360 )
	canvas.parent( "container-sketch" )

	var player = new Player( {
		color: randomColor(),

	} )

	// for ( let i = 0; i < numWalkers; i++ ) {
	// 	walkers.push( new Walker( {
	// 		color: randomColor(),
	// 		stepsPerRender: random(),
	// 		stepDistance: random( stepDistances ),
	// 	} ) )
	// }
	background( 255 )
}

function Player( args ) {
	this.color = args.color
	this.stepsPerRender = args.stepsPerRender
	this.stepDistance = args.stepDistance

	this.changeDirection = function ( direction ) {

	}

	document.addEventListener( "keydown", function ( e ) {
		// console.log( e.key, e.which, e.charCode, e.keyCode )
		switch ( e.key ) {
			case "a":
				break
			case "d":
				break
			case "w":
				break
			case "s":
				break
		}
	} )

	this.x = width / 2
	this.y = height / 2

	this.prevX = this.x
	this.prevY = this.y

	this.display = function () {
		stroke( this.color )
		if ( strokeMode ) {
			line ( this.prevX, this.prevY, this.x, this.y )
		} else {
			point( this.x, this.y )
		}
	}

	this.step = function () {

		// resetting
		if ( this.x > width || this.x < 0 || this.y > height || this.y < 0 ) {
			this.x = width / 2
			this.y = height / 2

			// stops radial artifacts (they do look interesting though, try without)
			this.prevX = this.x
			this.prevY = this.y
		}
	}
}

function draw() {
	for ( let player of players ) {
		player.update()
		player.draw()
	}
}

function windowResized() {
	// resizeCanvas( windowWidth, windowHeight )
}
