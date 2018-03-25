//

const select = document.querySelector.bind( document )
const selectAll = document.querySelectorAll.bind( document )

select( "#button-rerun" ).addEventListener( "click", function () {
	setup() // not supposed to do this but it works
} )

const numWalkers = 1
const drawMode = "dots"

const walkMode = "granular" // "granular" or "whole"
// leaning, follo wmouse?

const defaultStepsPerRender = 1
const defaultStepDistance = 10

const walkers = []

const stepDistances = [ 32 ]

function randomColor() {
	return color( random( 255 ), random( 255 ), random( 255 ) )
}

var ip = "192.168.0.15"
var port = 4242
var baseUrl = `http://${ip}:${port}`
var penUrl = `${baseUrl}/v1/pen`
var motorsUrl = `${baseUrl}/v1/motors`

function unlockMotors() {
	fetch(motorsUrl, {
		method: 'DELETE',
		headers: new Headers({
			'Content-Type': 'application/json',
		})
	}).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => console.log('Success:', response));
}

function setPos( x, y ) {
	var data = {
		"x": x,
		"y": y,
	}
	fetch(penUrl, {
	  method: 'PUT', // or 'PUT'
	  body: JSON.stringify(data),
	  headers: new Headers({
	    'Content-Type': 'application/json'
	  })
	}).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => console.log('Success:', response));
}

function zero() {
	var data = {
		"resetCounter": 1
	}
	fetch(penUrl, {
		method: 'PUT', // or 'PUT'
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	}).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => console.log('Success:', response));
}

function park() {
	var data = {
		"resetCounter": 1
	}
	fetch(penUrl, {
		method: 'PUT', // or 'PUT'
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	}).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => console.log('Success:', response));
}

function penUp() {
	penState( 0 )
}

function penDown() {
	penState( 1 )
}

function penState( state ) {
	var data = { state: state }
	fetch(penUrl, {
	  method: 'PUT', // or 'PUT'
	  body: JSON.stringify(data),
	  headers: new Headers({
	    'Content-Type': 'application/json'
	  })
	}).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => console.log('Success:', response));
}


function setup() {

	const canvas = createCanvas( windowWidth, windowHeight )
	// const canvas = createCanvas( 640, 360 )
	canvas.parent( "container-sketch" )
	// zero()
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

	unlockMotors()

	frameRate( 60 )

	walkers.push( new Walker( {
			color: randomColor(),
			stepDistance: random( stepDistances ),
			startX:random( width * 0.25, width * 0.75 ),
			startY: random( height * 0.25, height * 0.75 ),
	} ) )
	background( 255 )
}

function Walker( args ) {
	this.color = args.color
	this.stepsPerRender = args.stepsPerRender
	this.stepDistance = args.stepDistance

	this.x = args.startX
	this.y = args.startY

	this.historyX = [ this.x, 0, 0, 0 ]
	this.historyY = [ this.y, 0, 0, 0 ]

	this.display = function () {
		stroke( this.color )
		fill( this.color )
		switch ( drawMode ) {
			case "lines":
				line( this.historyX[ 0 ], this.historyY[ 0 ], this.x, this.y )
				break
			case "curves":
				curve(
					this.historyX[ 2 ], this.historyY[ 2 ],
					this.historyX[ 1 ], this.historyY[ 1 ],
					this.historyX[ 0 ], this.historyY[ 0 ],
					this.x, this.y,
				)
				break
			case "points":
				point( this.x, this.y )
				break
			case "dots":
				ellipse( this.x, this.y, 1, 1 )
				break
			case "rects":
				rect( this.x, this.y, this.stepDistance, this.stepDistance )
				break
		}
	}

	this.step = function () {

		this.historyX.pop()
		this.historyX.unshift( this.x )
		this.historyY.pop()
		this.historyY.unshift( this.y )

		if ( walkMode === "granular" ) {
			this.x += random( -this.stepDistance, this.stepDistance )
			this.y += random( -this.stepDistance, this.stepDistance )
		} else if ( walkMode === "whole" ) {
			const choice = parseInt( random( 4 ) )
			if ( choice === 0 ) {
				this.x += this.stepDistance
			} else if ( choice === 1 ) {
				this.x -= this.stepDistance
			} else if ( choice === 2 ) {
				this.y += this.stepDistance
			} else {
				this.y -= this.stepDistance
			}
		}

		// resetting
		if ( this.x > width || this.x < 0 || this.y > height || this.y < 0 ) {
			this.x = width / 2
			this.y = height / 2

			// stops radial artifacts (they do look interesting though, try without)
			this.historyX = [ this.x, this.x, this.x, this.x ]
			this.historyY = [ this.y, this.y, this.y, this.y ]
		}
	}
}

function draw() {
	for ( let walker of walkers ) {
		walker.step()
		walker.display()
	}
}

function windowResized() {
	resizeCanvas( windowWidth, windowHeight )
}
