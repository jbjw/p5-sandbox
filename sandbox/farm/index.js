//

"use strict"

const select = document.querySelector.bind( document )
const selectAll = document.querySelectorAll.bind( document )

const entities = []

function randomColor() { return color( random( 255 ), random( 255 ), random( 255 ) ) }

var keyboardState = {}

document.addEventListener( "keydown", function ( e ) {
	keyboardState[ e.key ] = true
} )

document.addEventListener( "keyup", function ( e ) {
	keyboardState[ e.key ] = false
} )

function Grid( x, y, w, h, cellSize ) {
	this.color = randomColor()
	this.position = createVector( x, y )
	this.cellSize = cellSize
	this.w = w, this.h = h

	var length = x * y
	this.update = function () {

	}
	this.draw = function () {
		push()
		// stroke( this.color )
		fill( this.color )
		translate( this.position.x, this.position.y )
		rotate( this.angle - Math.PI/2 )
		for ( let x = 0; x < this.w; x++ ) {
			for ( let y = 0; y < this.h; y++ ) {
				rect( x * cellSize, y * cellSize, cellSize, cellSize )
			}
		}
		pop()
	}
}

let img

function preload() {
	img = loadImage( "../../assets/dog.jpg" )
}

function setup() {
	const canvas = createCanvas( 640, 360 )
	canvas.parent( "container-sketch" )


	var grid = new Grid( 0, 0, 10, 10, 20 )

	entities.push( grid )

	for ( let i = 0; i < 10; i++ ) {
		var tmp = new Plant( {
			position: createVector( random() * width, random() * height ),
		} )
		entities.push( tmp )
	}

	var player = new Player( {
		color: randomColor(),
	} )
	entities.push( player )



	background( 255 )
}

function dfault( value, dfault ) {
	return value === undefined ? dfault : value
}
function Bee( args ) {
	 // "🐝"
}
function Plant( args ) {
	this.color = args.color === undefined ? randomColor() : args.color
	this.position = dfault( args.position, createVector( 0, 0 ) )
	this.angle = dfault( args.angle, PI/2 )
	// this.radius = dfault( args.radius, random( 10, 100 ) )
	this.emoji = random( [ "🌾", "🍓", "🍉" ] )

	this.update = function () {

		// if ( this.x > width || this.x < 0 || this.y > height || this.y < 0 ) {

		// }
	}

	this.draw = function () {
		push()
		// stroke( this.color )
		fill( this.color )
		translate( this.position.x, this.position.y )
		rotate( this.angle - Math.PI/2 )
		textSize( 32 )
		text( this.emoji, 0, 0 )
		pop()
	}
}

function Player( args ) {
	this.color = args.color

	this.position = createVector( width / 2, height / 2 )
	// this.gridPosition =
	this.angle = (Math.PI*2)/4
	this.speed = 5

	this.emoji = "👨‍🌾"

	// consider making subobject action?
	this.bindings = [
		{
			key: "a",
			type: "move",
			value: "left",
		},
		{
			key: "d",
			type: "move",
			value: "right",
		},
		{
			key: "w",
			type: "move",
			value: "up",
		},
		{
			key: "s",
			type: "move",
			value: "down",
		},
	]

	this.update = function () {
		for ( let binding of this.bindings ) {
			if ( keyboardState[ binding.key ] === true ) {
				switch ( binding.type ) {
					case "move":
						switch ( binding.value ) {
							case "left":
								this.position.x += -this.speed
								break
							case "right":
								this.position.x += this.speed
								break
							case "up":
								this.position.y += -this.speed
								break
							case "down":
								this.position.y += this.speed
								break
						}
						break
					case "??":
						break
				}
			}
		}

		// if ( this.x > width || this.x < 0 || this.y > height || this.y < 0 ) {

		// }
	}

	this.draw = function () {
		push()
		stroke( 0 )
		fill( 0 )
		translate( this.position.x, this.position.y )
		rotate( this.angle - Math.PI/2 )
		textSize( 32 )
		text( this.emoji, 0, 0 )
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
