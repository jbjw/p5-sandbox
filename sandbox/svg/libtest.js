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
svg.setAttributeNS( null, "width", "100px" )
svg.setAttributeNS( null, "height", "100px" )
div.appendChild( svg )
// "M10 10 h 80 v 50 h -80 Z"
// var pathT = "" + "M 10,10 " + "L 80,50 "
// + "C 150,40 100,50 100,50"
// var pathT = "M 0,50 "
// + "C 0,10 0,90 50,100 "
// + "C 140,50 60,50 100,50 "
// + "C 90,0 10,0 50,0 "
// + "C 0,10 0,90 0,50 "

// bezier( 0, 50, 0, 75, 25, 100, 50, 100 )
// bezier( 50, 100, 75, 100, 100, 75, 100, 50 )
// bezier( 100, 50, 100, 25, 75, 0, 50, 0 )
// bezier( 50, 0, 25, 0, 0, 25, 0, 50 )

// arc( 50, 50, 40, 0, Math.PI*1 )
arcTo( 0, 0, 50, 50 )


function arcTo( x1, y1, x2, y2 ) {

		var xt = x
		var yt = y + r

		var x2 = Math.cos( t1*xt ) - Math.sin( t1*yt )
		var y2 = Math.sin( t1*xt ) + Math.cos( t1*yt )

		var x3 = Math.cos( t2*xt ) - Math.sin( t2*yt )
		var y3 = Math.sin( t2*xt ) + Math.cos( t2*yt )
		console.log( x2, y2, x3, y3 )

		var pathT = `M ${ x2 },${ y2 }
		C ${ x2 },${ y3 } ${ x3 },${ y2 } ${ x3 },${ y3 }
		`
		var path = document.createElementNS( ns, "path" )
		path.setAttributeNS( null, "d", pathT )
		path.setAttributeNS( null, "fill", "none" )
		path.setAttributeNS( null, "stroke", "black" )
		svg.appendChild( path )
}

function arc( x, y, r, t1, t2 ) {

	var xt = x
	var yt = y + r

	var x2 = Math.cos( t1*xt ) - Math.sin( t1*yt )
	var y2 = Math.sin( t1*xt ) + Math.cos( t1*yt )

	var x3 = Math.cos( t2*xt ) - Math.sin( t2*yt )
	var y3 = Math.sin( t2*xt ) + Math.cos( t2*yt )
	console.log( x2, y2, x3, y3 )

	var pathT = `M ${ x2 },${ y2 }
	C ${ x2 },${ y3 } ${ x3 },${ y2 } ${ x3 },${ y3 }
	`
	var path = document.createElementNS( ns, "path" )
	path.setAttributeNS( null, "d", pathT )
	path.setAttributeNS( null, "fill", "none" )
	path.setAttributeNS( null, "stroke", "black" )
	svg.appendChild( path )
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

// var rect = document.createElementNS( ns, "rect" )
// rect.setAttributeNS( null, 'width', 100 )
// rect.setAttributeNS( null, 'height', 100 )
// rect.setAttributeNS( null, 'fill', '#f06' )
// svg.appendChild( rect )

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
