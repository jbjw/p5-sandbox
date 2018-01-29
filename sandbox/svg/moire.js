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

function Vec2( x, y ) {
	this.x = x, this.y = y
}

var grids = 5
var start = new Vec2( 40, 40 )

var spacing = new Vec2( 20, 20 )
var gridIntervals = new Vec2( 5, 5 )

for ( let gi = 0; gi < grids; gi++ ) {
	var steps = gi + 1
	var pos = new Vec2( start.x + gi*150, start.y )
	for ( let si = 0; si < steps; si++ ) {

		var r = si * (90/steps)
		var grd = grid( spacing, gridIntervals )
		grd.setAttributeNS( null, "transform", `translate(${pos.x} ${pos.y}) rotate(${r}, 50, 50)` )
		svg.appendChild( grd )
	}
}

start = new Vec2( 40, 200 )
spacing = new Vec2( 10, 10 )
gridIntervals = new Vec2( 10, 10 )

for ( let gi = 0; gi < grids; gi++ ) {
	var steps = gi + 1
	var pos = new Vec2( start.x + gi*150, start.y )
	for ( let si = 0; si < steps; si++ ) {

		var r = si * (90/steps)
		var grd = grid( spacing, gridIntervals )
		grd.setAttributeNS( null, "transform", `translate(${pos.x} ${pos.y}) rotate(${r}, 50, 50)` )
		svg.appendChild( grd )
	}
}

start = new Vec2( 40, 360 )
spacing = new Vec2( 5, 5 )
gridIntervals = new Vec2( 20, 20 )

for ( let gi = 0; gi < grids; gi++ ) {
	var steps = gi + 1
	var pos = new Vec2( start.x + gi*150, start.y )
	for ( let si = 0; si < steps; si++ ) {

		var r = si * (90/steps)
		var grd = grid( spacing, gridIntervals )
		grd.setAttributeNS( null, "transform", `translate(${pos.x} ${pos.y}) rotate(${r}, 50, 50)` )
		svg.appendChild( grd )
	}
}

function moire(  ) {
	// compound grids
}

function grid( spacing, gridIntervals ) {
	var e = document.createElementNS( ns, "g" )
	// e.setAttributeNS( null, "transform", "translate(100 100)" )

	var start = new Vec2( 0, 0 )
	var spacing = spacing // new Vec2( 10, 10 )
	// var gridSize = new Vec2( 100, 100 )
	var gridIntervals = gridIntervals // new Vec2( 10, 10 )
	var size = new Vec2( 100, 100 )

	for ( let xi = 0; xi < gridIntervals.x; xi++ ) {
		var x = start.x + xi * spacing.x + spacing.x/2
		var y = start.y
		var l = line( x, y, x + 0, y + 100 )
		e.appendChild( l )
	}

	for ( let yi = 0; yi < gridIntervals.y; yi++ ) {
		var x = start.x
		var y = start.y + yi * spacing.y + spacing.y/2
		var l = line( x, y, x + 100, y + 0 )
		e.appendChild( l )
	}
	return e
}

function line( x1, y1, x2, y2, r ) {
		var e = document.createElementNS( ns, "line" )
		e.setAttributeNS( null, "x1", x1 )
		e.setAttributeNS( null, "y1", y1 )
		e.setAttributeNS( null, "x2", x2 )
		e.setAttributeNS( null, "y2", y2 )
		e.setAttributeNS( null, "fill", "none" )
		e.setAttributeNS( null, "stroke", "black" )
		if ( r !== undefined ) {
			e.setAttributeNS( null, "transform", `rotate(${r} ${60} ${60})` )
		}
		// this.e = e
		return e
}
// Line.prototype.setRotation = function
