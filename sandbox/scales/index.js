function setup() {
	// console.log( windowWidth )
	createCanvas( windowWidth, windowHeight )
	grid()
}

function grid() {
	var spacing = 10
	for ( let xi = 0; xi < 200; xi++ ) {
		for ( let yi = 0; yi < 100; yi++ ) {
			var c = color( random( 0, 255 ), random( 0, 255 ), random( 0, 255 ) )
			fill( c )
			let x = xi * spacing
			let y = yi * spacing
			// var w = random( 0, 50 )
			// var h = random( 0, 50 )
			// var noise = noise ( t )
			// t += 0.01
			var w = noise( x * spacing * 0.01, y * spacing * 0.01 ) * 50 + 0
			var h = noise( x * spacing * 0.01 + 0, y * spacing * 0.01 + 0 ) * 50 + 0
			// console.log( w, h )
			ellipse( x, y, w, h )

		}

	}
	// fill( 255 )
}

function draw() {


}

function windowResized() {
	resizeCanvas( windowWidth, windowHeight )
}
