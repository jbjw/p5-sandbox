//

const select = document.querySelector.bind( document )
const selectAll = document.querySelectorAll.bind( document )

const speedMult = 3



function randomColor() {
	return color( random( 255 ), random( 255 ), random( 255 ) )
}

const pens = []
const rotors = []

function Rotor( args ) {
	rotors.push( this )
	this.color = args.color
	this.radius = args.radius
	this.pos = args.pos
	this.speed = args.speed
	this.rotation = 0
	// speed? center?
	this.penAttachments = []
	this.rotorAttachments = []


	this.attachPen = function ( pen, radius, phase ) {
		this.penAttachments.push( {
			pen: pen,
			radius: radius,
			phase: phase,
		} )
	}

	this.attachRotor = function ( rotor, offset ) {
		this.rotorAttachments.push( {
			rotor: rotor,
			offset: offset,
		} )
	}

	this.update = function () {
		this.rotation += this.speed * speedMult
		for ( let rotorAttachment of this.rotorAttachments ) {
			rotorAttachment.rotor.pos = p5.Vector.add( this.pos, rotorAttachment.offset.copy().rotate( this.rotation ) )
		}

		for ( let penAttachment of this.penAttachments ) {
			penAttachment.pen.pos = p5.Vector.add( this.pos, createVector( 0, penAttachment.radius ).rotate( this.rotation + penAttachment.phase ) )
		}
	}

	this.draw = function () {
		stroke( this.color )
		noFill()
		ellipse( this.pos.x, this.pos.y, this.radius, this.radius )
	}
}

function Pen( args ) {
	this.color = args.color
	this.radius = args.radius
	this.pos = createVector( 0, 0 )

	this.history = []

	pens.push( this )

	this.draw = function () {
		// console.log( this.pos )
		stroke( this.color )
		// fill( this.color )
		noFill()
		this.history.push( this.pos.copy() )
		beginShape(  ) // LINES
		for ( let pos of this.history ) {
			vertex( pos.x, pos.y )
			// ellipse( pos.x, pos.y, this.radius, this.radius )
		}
		endShape()
	}

	// stroke, dot modes, etc
}

function setup() {
	const canvas = createCanvas( 640, 360 )
	canvas.parent( "container-sketch" )

	var mainRotor = new Rotor( {
		pos: createVector( width / 2, height / 2 ),
		radius: 160,
		speed: 0.015,
		color: randomColor(),
	} )

	var rotor1 = new Rotor( {
		pos: createVector( width / 2, height / 2 ),
		radius: 80,
		speed: -0.010,
		color: randomColor(),
	} )

	var rotor2 = new Rotor( {
		pos: createVector( width / 2, height / 2 ),
		radius: 40,
		speed: 0.05,
		color: randomColor(),
	} )

	var rotor3 = new Rotor( {
		pos: createVector( width / 2, height / 2 ),
		radius: 20,
		speed: -0.05,
		color: randomColor(),
	} )

	mainRotor.attachRotor( rotor1, createVector( 80, 0 ) )
	rotor1.attachRotor( rotor2, createVector( 40, 0 ) )
	rotor2.attachRotor( rotor3, createVector( 20, 0 ) )

	var p1 = new Pen( {
		color: randomColor(),
		radius: 3,
	} )
	var p2 = new Pen( {
		color: randomColor(),
		radius: 2,
	} )
	var p3 = new Pen( {
		color: randomColor(),
		radius: 1,
	} )

	rotor1.attachPen( p1, 0, 2*PI*1/8 )
	rotor2.attachPen( p2, 0, 2*PI*1/8 )
	rotor3.attachPen( p3, 0, 2*PI*1/8 )

	frameRate( 60 )

	background( 255 )
}

function draw() {

	// stroke( randomColor() )
	// fill( randomColor() )
	// ellipse( 0, 0, 10, 10 )
	clear()
	for ( let rotor of rotors ) {
		rotor.update()
		rotor.draw()
	}

	for ( let pen of pens ) {
		pen.draw()
	}
}
