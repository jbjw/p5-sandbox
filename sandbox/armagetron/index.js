//

const select = document.querySelector.bind( document )
const selectAll = document.querySelectorAll.bind( document )

const numPlayers = 1
const strokeMode = true // this or string/enum?

const defaultStepsPerRender = 10
const defaultStepDistance = 5

const players = []

function randomColor() { return color( random( 255 ), random( 255 ), random( 255 ) ) }

function setup() {
	const canvas = createCanvas( 640, 360 )
	canvas.parent( "container-sketch" )

	var player = new Player( {
		color: randomColor(),
	} )

	players.push( player )

	background( 255 )
}

function Player( args ) {
	this.controls = {
		a: {
			type: "turn",
			value: "left",
		},
		d: {
			type: "turn",
			value: "right",
		},
		w: {
			type: "turn",
			value: "up",
		},
		s: {
			type: "turn",
			value: "down",
		},
	}

	this.color = args.color
	this.stepsPerRender = args.stepsPerRender
	this.stepDistance = args.stepDistance

	this.changeDirection = function ( direction ) {
		if ( direction === this.direction ) {

		} else {
			this.midLength = 0
			for ( let i = 0; i < this.history.length - 1; i++ ) {
				this.midLength += p5.Vector.sub( this.history[ i ], this.history[ i + 1 ] ).mag()
				// this.curL
				if ( this.curLength > this.maxLength ) {
					// this.history.shift()
					// this.history.unshift()

					// this.history.splice( i )
					// break
				}
			}

			// compute new totalLength, head tail?

			this.history.unshift( this.pos.copy() )
			this.direction = direction
			var tmp
			switch ( direction ) {
				case "left":
					tmp = createVector( -1, 0 )
					break
				case "right":
					tmp = createVector( 1, 0 )
					break
				case "up":
					tmp = createVector( 0, -1 )
					break
				case "down":
					tmp = createVector( 0, 1 )
					break
			}
			this.vel = tmp.mult( this.vel.mag() )
		}
	}

	this.handleKeydown = function ( e ) {
		var action = this.controls[ e.key ]
		switch ( action.type ) {
			case "turn":
				this.changeDirection( action.value )
				break
		}
	}

	document.addEventListener( "keydown", this.handleKeydown.bind( this ) )
	this.speed = 1
	this.vel = createVector( 1, 0 ).mult( this.speed )
	this.pos = createVector( width / 2, height / 2 )

	this.maxLength = 300
	this.headTailLength = 0 // split?
	this.midLength = 0
	this.totalLength = 0

	this.head = this.pos
	this.tail = this.pos.copy()

	this.history = []

	this.update = function () {
		// console.log( this.pos )
		this.pos.add( this.vel )

		var headLength = p5.Vector.sub( this.head, this.history[ 0 ] ).mag()
		var tailLength = p5.Vector.sub( this.history[ this.history.length - 1 ], this.tail )
		this.headTailLength = headLength + tailLength + this.midLength

		this.totalLength = this.midLength + this.headTailLength

		this.totalLength += p5.Vector.sub( this.pos, this.history[ this.history.length - 1 ] ).mag()

		if ( this.totalLength > this.maxLength ) {
			var diff = this.totalLength - this.maxLength
			this.tail =
		}

		// if ( this.x > width || this.x < 0 || this.y > height || this.y < 0 ) {

		// }
	}

	this.draw = function () {
		beginShape()
		stroke( this.color )
		// LINES
		for ( let pos of this.history ) {
			vertex( pos.x, pos.y )
		}
		vertex( this.pos.x, this.pos.y )
		noFill()
		endShape()

		textSize( 32 )
		text( this.curLength, 10, 30 )
		fill( 0, 102, 153 )
	}
}

function draw() {
	clear()
	for ( let player of players ) {
		player.update()
		player.draw()
	}
}

function windowResized() {
	// resizeCanvas( windowWidth, windowHeight )
}
