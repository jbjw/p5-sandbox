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

var g = document.createElementNS( ns, "g" )
g.setAttributeNS( null, "transform", "translate(100 100)" )
svg.appendChild( g )

var rect = document.createElementNS( ns, "rect" )
rect.setAttributeNS( null, "x", 10 )
rect.setAttributeNS( null, "y", 10 )
rect.setAttributeNS( null, "width", 100 )
rect.setAttributeNS( null, "height", 100 )
rect.setAttributeNS( null, "fill", "none" )
rect.setAttributeNS( null, "stroke", "black" )
g.appendChild( rect )
