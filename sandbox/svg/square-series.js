//

"use strict"

const select = document.querySelector.bind( document )
const selectAll = document.querySelectorAll.bind( document )

// var draw = SVG( "svg" ).size( 300, 300 )
// var rect = draw.rect( 100, 100 ).attr( { fill: "#f06" } )

// <path d="M10 10 h 80 v 80 h -80 Z" fill="transparent" stroke="black"/>

var ns = 'http://www.w3.org/2000/svg'
var div = document.getElementById( "svg" )
var svg = document.createElementNS( ns, "svg" )
svg.setAttributeNS( null, "width", "800px" )
svg.setAttributeNS( null, "height", "600px" )
div.appendChild( svg )
document.body.style.background = "black"
div.style.background = "gray"
svg.style.background = "lightgray"
// "M10 10 h 80 v 50 h -80 Z"
// var pathT = "" + "M 10,10 " + "L 80,50 "
// + "C 150,40 100,50 100,50"
// var pathT = "M 0,50 "
// + "C 0,10 0,90 50,100 "
// + "C 140,50 60,50 100,50 "
// + "C 90,0 10,0 50,0 "
// + "C 0,10 0,90 0,50 "

var pathT = ""
function moveTo( x, y ) {
	pathT = pathT + `M ${x},${y}`
}
function lineTo() {
	pathT = pathT + `L ${x},${y}`
}

function bezier( x1, y1, cx1, cy1, cx2, cy2, x2, y2 ) {
	var pathT = `M ${ x1 },${ y1 }
	C ${ cx1 },${ cy1 } ${ cx2 },${ cy2 } ${ x2 },${ y2 }
	`
	var path = document.createElementNS( ns, "path" )
	path.setAttributeNS( null, "d", pathT )
	path.setAttributeNS( null, "fill", "none" )
	path.setAttributeNS( null, "stroke", "black" )
	svg.appendChild( path )
}

function Vec2( x, y ) {
	this.x = x
	this.y = y
}

function Rect( args ) {
	this.args = args
	this.position = args.position
	this.size = args.size
	this.rotation = args.rotation
	var e = document.createElementNS( ns, "rect" )
	e.setAttributeNS( null, "x", this.position.x - this.size.x/2 )
	e.setAttributeNS( null, "y", this.position.y - this.size.y/2 )
	e.setAttributeNS( null, "width", this.size.x )
	e.setAttributeNS( null, "height", this.size.y )
	e.setAttributeNS( null, "stroke", "black" )
	e.setAttributeNS( null, "fill", "none" )
	e.setAttributeNS( null, "transform", `rotate(${this.rotation}, ${this.position.x}, ${this.position.y})` )
	this.e = e
	svg.appendChild( e )
}

Rect.prototype.setRotation = function ( r ) {
	this.rotation = r
	this.e.setAttributeNS( null, "transform", `rotate(${this.rotation}, ${this.position.x}, ${this.position.y})` )
}

// var a = new Rect( {
// 	center: true,
// 	position: new Vec2( 40, 40 ),
// 	size: new Vec2( 40, 40 ),
// 	rotation: 20,
// } )

var x = 40
var xSpacing = 10

var col = 0
var y = 40
var ySpacing = 70

for ( let i = 0; i <= 10; i++ ) {
	new Rect( {
		center: true,
		position: new Vec2( x + i*xSpacing, y + col*ySpacing ),
		size: new Vec2( 40, 40 ),
		rotation: i*(90/10),
	} )
}
col++

for ( let i = 0; i <= 20; i++ ) {
	new Rect( {
		center: true,
		position: new Vec2( x + i*xSpacing, y + col*ySpacing ),
		size: new Vec2( 40, 40 ),
		rotation: i*(90/20),
	} )
}
col++

for ( let i = 0; i <= 30; i++ ) {
	new Rect( {
		center: true,
		position: new Vec2( x + i*xSpacing, y + col*ySpacing ),
		size: new Vec2( 40, 40 ),
		rotation: i*(90/30),
	} )
}
col++

for ( let i = 0; i <= 40; i++ ) {
	new Rect( {
		center: true,
		position: new Vec2( x + i*xSpacing, y + col*ySpacing ),
		size: new Vec2( 40, 40 ),
		rotation: i*(90/40),
	} )
}
col++

for ( let i = 0; i <= 10; i++ ) {
	new Rect( {
		center: true,
		position: new Vec2( x + i*xSpacing*4, y + col*ySpacing + 30 ),
		size: new Vec2( 40, 40 ),
		rotation: i*(90/10),
	} )
}
col++

for ( let i = 0; i <= 20; i++ ) {
	new Rect( {
		center: true,
		position: new Vec2( x + i*xSpacing*2, y + col*ySpacing + 30 ),
		size: new Vec2( 40, 40 ),
		rotation: i*(90/20),
	} )
}
col++

for ( let i = 0; i <= 30; i++ ) {
	new Rect( {
		center: true,
		position: new Vec2( x + i*xSpacing*4/3, y + col*ySpacing + 30 ),
		size: new Vec2( 40, 40 ),
		rotation: i*(90/30),
	} )
}
col++

for ( let i = 0; i <= 40; i++ ) {
	new Rect( {
		center: true,
		position: new Vec2( x + i*xSpacing, y + col*ySpacing + 30 ),
		size: new Vec2( 40, 40 ),
		rotation: i*(90/40),
	} )
}
col++

// var r = 0
// setInterval( function () {
// 	a.setRotation( r )
// 	r += 5
// }, 100 )

// var pathT = "M 0,50 "
// + "C 0,100 0,100 50,100 "
// + "C 100,100 100,100 100,50 "
// + "C 100,0 100,0 50,0 "
// + "C 0,0 0,0 0,50 "

// var path = document.createElementNS( ns, "path" )
// path.setAttributeNS( null, "d", pathT )
// path.setAttributeNS( null, "fill", "none" )
// path.setAttributeNS( null, "stroke", "black" )
// svg.appendChild( path )


// stroke black
// fill none
// stroke-width
// stroke-linecap butt square round
// stroke-linejoin miter round bevel

// stroke-dasharray 5,10

//
// // fill( this.color )
// stroke( this.color )
// noFill()
// ellipse( this.pos.x, this.pos.y, this.radius, this.radius )
//
// beginShape(  ) // LINES
// for ( let pos of this.history ) {
// 	vertex( pos.x, pos.y )
// 	// ellipse( pos.x, pos.y, this.radius, this.radius )
// }
// endShape()
//
