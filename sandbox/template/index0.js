//

const select = document.querySelector.bind( document )
const selectAll = document.querySelectorAll.bind( document )

select( "#button-rerun" ).addEventListener( "click", function () {
	setup() // not supposed to do this but it works
} )

const numWalkers = 10
const drawMode = "dots" // this or string/enum?

const walkMode = "granular" // "granular" or "whole"
// leaning, follo wmouse?

const defaultStepsPerRender = 1
const defaultStepDistance = 10

const walkers = []

// quantify the interesting stuff, close stepDistances at low values, all combos
// hollow rects too

const stepDistances = [ 8 ]
// const stepDistances = [ 16, 8, 32 ]
// const stepDistances = [ 32, 16, 64, 8, 4 ]
// const stepDistances = [ 2, 3, 4 ]

// consider adding wrapping
// graphics modes:
// stroke or not (may be combined with other stuff, but looks a bit clutter)
// points vs circles vs rects
// curves??
// ellipses influenced b y direction
// flow field


function randomColor() {
	return color( random( 255 ), random( 255 ), random( 255 ) )
}

function setup() {

	const canvas = createCanvas( windowWidth, windowHeight )
	// const canvas = createCanvas( 640, 360 )
	canvas.parent( "container-sketch" )

	// frameRate( 60 )

	for ( let i = 0; i < numWalkers; i++ ) {
		walkers.push( new Walker( {
			color: randomColor(),
			stepsPerRender: random(),
			stepDistance: random( stepDistances ),
		} ) )
	}
	background( 255 )
}

function Walker( args ) {
	this.color = args.color
	this.stepsPerRender = args.stepsPerRender
	this.stepDistance = args.stepDistance

	this.x = width / 2
	this.y = height / 2

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
	for ( let i = 0; i < defaultStepsPerRender; i++ ) {
		for ( let walker of walkers ) {
			walker.step()
			walker.display()
		}
	}
}

function windowResized() {
	resizeCanvas( windowWidth, windowHeight )
}
