//

const select = document.querySelector.bind( document )
const selectAll = document.querySelectorAll.bind( document )

select( "#button-rerun" ).addEventListener( "click", function () {
	setup() // not supposed to do this but it works
} )

var ip = "192.168.0.15"
var port = 4242
var baseUrl = `http://${ip}:${port}`
var penUrl = `${baseUrl}/v1/pen`
var motorsUrl = `${baseUrl}/v1/motors`

var jsonHeaders = new Headers( {
	'Content-Type': 'application/json',
} )

var actions = {
	"unlockMotors": {
		url: motorsUrl,
		// headers: ,
		// body: {},
	},
}

var actionQueue = []

function applyAction( actionName ) {
	actionQueue.push( actionName )
}

var ready = true

function next() {
	fetch( url, {
		method: method,
		headers: jsonHeaders,
	} ).then( res => res.json() )
	.catch( error => console.error( 'Error:', error ) )
	.then( response => console.log( 'Success:', response ) )
}

// unlockMotors motorsUrl DELETE
// pos penUrl PUT { "x": x, "y": y, }
// zero penUrl PUT { "resetCounter": 1, }
// park penUrl PUT ?
// updown penUrl PUT  { state: 0/1 }

function setup() {
	// frameRate( 60 )
	const canvas = createCanvas( windowWidth, windowHeight )
	// const canvas = createCanvas( 640, 360 )
	canvas.parent( "container-sketch" )

	// setPos( 0, 0 )
	penDown()

	// for ( let i = 0; i < 4; i++ ) {
	// 	setPos(
	// 		random( 10, 20 ),
	// 		random( 10, 20 ),
	// 		// map( walker.x, 0, width, 0, 100 ),
	// 		// map( walker.y, 0, height, 0, 100 ),
	// 	)
	// }
	setPos( 80, 80 )
	penUp()

	background( 255 )
}

function draw() {
	//
}

function windowResized() {
	resizeCanvas( windowWidth, windowHeight )
}
