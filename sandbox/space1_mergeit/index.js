//

const select = document.querySelector.bind( document )
const selectAll = document.querySelectorAll.bind( document )

const numPlayers = 1
const strokeMode = true // this or string/enum?

const defaultStepsPerRender = 10
const defaultStepDistance = 5

const entities = []

function randomColor() { return color( random( 255 ), random( 255 ), random( 255 ) ) }

let img

function preload() {
	img = loadImage( "../../assets/dog.jpg" )
}

function setup() {
	const canvas = createCanvas( 640, 360 )
	canvas.parent( "container-sketch" )


	for ( let i = 0; i < 10; i++ ) {
		var tmp = new Asteroid( {
			position: createVector( random() * width, random() * height ),
			// mass: random( 10, 100 ),
			// velocity: createVector( 0, 0 ),
			// radius: random( 10, 100 ),
		} )
		entities.push( tmp )
	}

	var player = new Player( {
		color: randomColor(),
		maxThrust: 0.1,
		maxAngularThrust: 0.01,
		mass: 1,
	} )


	entities.push( player )

	background( 255 )
}

var keyboardState = {}

document.addEventListener( "keydown", function ( e ) {
	keyboardState[ e.key ] = true
} )

document.addEventListener( "keyup", function ( e ) {
	keyboardState[ e.key ] = false
} )

var x = 5

function dfault( value, dfault ) {
	return value === undefined ? dfault : value
}

function Asteroid( args ) {
	this.color = args.color === undefined ? randomColor() : args.color
	this.mass = dfault( args.mass, random( 10, 100 ) )
	this.position = dfault( args.position, createVector( 0, 0 ) )
	this.angle = dfault( args.angle, 0 )
	this.velocity = dfault( args.velocity, createVector( 0, 0 ) )
	this.angularVelocity = dfault( args.angularVelocity, 0 )
	this.radius = dfault( args.radius, random( 10, 100 ) )

	this.applyForce = function ( forceVector ) {
		this.velocity.add( forceVector.div( this.mass ) )
	}

	this.applyAngularForce = function ( forceScalar ) {
		this.angularVelocity += forceScalar / this.mass
	}

	this.applyAngularForce( 1 )
	this.applyForce( p5.Vector.random2D().mult( random( 0, 10 ) ) )

	this.update = function () {
		this.position.add( this.velocity )
		this.angle += this.angularVelocity

		// if ( this.x > width || this.x < 0 || this.y > height || this.y < 0 ) {

		// }
	}

	this.draw = function () {
		push()
		// stroke( this.color )
		fill( this.color )
		translate( this.position.x, this.position.y )
		rotate( this.angle - Math.PI/2 )
		ellipse( 0, 0, this.radius, this.radius )
		pop()
	}
}

function Bullet( args ) {

}

function Player( args ) {
	this.color = args.color
	this.maxThrust = args.maxThrust
	this.maxAngularThrust = args.maxAngularThrust
	this.mass = args.mass

	this.velocity = createVector( 0, 0 )
	this.angularVelocity = 0
	this.position = createVector( width / 2, height / 2 )
	this.angle = -(Math.PI*2)/4

	this.applyForce = function ( forceVector ) {
		this.velocity.add( forceVector.div( this.mass ) )
	}

	this.applyAngularForce = function ( forceScalar ) {
		this.angularVelocity += forceScalar / this.mass
	}

	// consider making subobject action?
	this.bindings = [
		{
			key: "a",
			type: "turn",
			value: "left",
		},
		{
			key: "d",
			type: "turn",
			value: "right",
		},
		{
			key: "w",
			type: "thrust",
			value: "forward",
		},
		{
			key: "s",
			// type: "turn",
			// value: "left",
		},
	]

	this.update = function () {

		let turning = false
		for ( let binding of this.bindings ) {
			if ( keyboardState[ binding.key ] === true ) {
				switch ( binding.type ) {
					case "turn":
						turning = true
						if ( binding.value === "left" ) {
							this.applyAngularForce( -this.maxAngularThrust )
						} else if ( binding.value === "right" ) {
							this.applyAngularForce( this.maxAngularThrust )
						}
						break
					case "thrust":
						this.applyForce( p5.Vector.fromAngle( this.angle ).mult( this.maxThrust ) )
						break
				}
			}
		}

		// dampening, add some kind of smoothing
		if ( turning === false ) {
			if ( this.angularVelocity > 0 ) {
				this.applyAngularForce( -this.maxAngularThrust )
			} else if ( this.angularVelocity < 0 ) {
				this.applyAngularForce( this.maxAngularThrust )
			}
		}

		this.position.add( this.velocity )
		this.angle += this.angularVelocity
		// console.log( this.position )
		// console.log( this.velocity )

		// if ( this.x > width || this.x < 0 || this.y > height || this.y < 0 ) {

		// }
	}

	this.draw = function () {
		push()
		// beginShape()
		// stroke( this.color )
		// // LINES
		// for ( let pos of this.history ) {
		// 	vertex( pos.x, pos.y )
		// }
		// vertex( this.pos.x, this.pos.y )
		// noFill()
		// endShape()
		textSize( 32 )
		text( vecToString( this.position ), 10, 30 )
		textSize( 32 )
		text( vecToString( this.velocity ), 10, 60 )
		textSize( 32 )
		text( degrees( this.angle ).toFixed( 2 ), 10, 90 )
		textSize( 32 )
		text( degrees( this.angularVelocity ).toFixed( 2 ), 10, 120 )

		// fill( 0, 102, 153 )

		stroke( 0 )
		fill( 0 )
		translate( this.position.x, this.position.y )
		rotate( this.angle - Math.PI/2 )
		// ellipse( 0, 0, 15, 5 )
		triangle( -5, -5, 5, -5, 0, 10 )
		pop()
	}
}

function vecToString( vec ) {
	return `[ ${ vec.x.toFixed( 2 ) }, ${ vec.y.toFixed( 2 ) } ]`
}

function draw() {
	clear()
	// background( img )
	for ( let entity of entities ) {
		entity.update()
		entity.draw()
	}
}

function windowResized() {
	// resizeCanvas( windowWidth, windowHeight )
}
