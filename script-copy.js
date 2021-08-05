const apikey = 'ee7b2dc46576f1b634dd17579ef011d1';

let timeline, titlefield,

	city = 'Den Haag',
	min_temp = 0,
	max_temp = 20;

function displayResult( result, index ) {
	let hgt = 100 * result.main.temp / max_temp;


	let datetime = result.dt_txt.split( ' ' );

	let date = datetime.shift( );
	date = date.split( '-' );
	date.reverse( );
	date = date.join( '/' );

	let time = datetime.pop( );
	time = time.split( ':' );
	time.pop( );
	time = time.join( ':' );

	timeline.innerHTML +=
		'<div class="segment" data-datetime="' + date + ' ' + time + '" '
						  + ' data-temperature="' + result.main.temp + '&deg;C"'
						  + ' style="height: ' + hgt + '%"></div>';
}

function loadData( ) {
	// titlefield = document.querySelector( '#title' );
	// timeline = document.querySelector( '#timeline' );

	// fetch( 'http://api.are.na/v2/channels?page=2&amp;per=15')
	fetch( 'http://api.are.na/v2/channels/zam-zody/contents')

		.then( res => res.json( ) )
		.then( ( out ) => {
			let results = out.contents
			console.log(results);
			// results.forEach( displayResult );
			//
			// titlefield.innerHTML += city;
			// timeline.innerHTML += '<div class="sizer"></div>';
		} );
}

window.onload = loadData;
