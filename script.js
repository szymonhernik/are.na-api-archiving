const apikey = 'ee7b2dc46576f1b634dd17579ef011d1';

let timeline, titlefield, tagsfield

var tagsArray = []
let tagsArrayFiltered = []



function displayResult( result, index ) {
	// let hgt = 100 * result.main.temp / max_temp;
	// console.log(result);

	let block = result

	let urlLine = ''
	let embedLine = ''
	let imgLine = ''
	let descriptionTag = ''
	let channelLine = ''
	let contentLine = ''

	// URL
	if (block.source != null) {
		urlLine =

			'<a href="' + block.source.url + '" target="_blank">url: '+
				block.source.url.replace("www.", "").substring(8).substring(0, 10) + "&hellip;	" +
			'</a>'

	}

	// CHANNEL
	if (block.class === "Channel") {
		channelLine = block.slug
	}

	// CONTENT
	if (block.content != null &&  block.content !== "") {
		contentLine = block.content

	}
	// EMBED
	if (block.embed != null) {
		embedLine = block.embed.html

	}
	// IMAGE
	if (block.image != null && block.embed === null) {
		imgLine =

			'<img src="'+ block.image.display.url + '">'

	}

	var matches = []
	var tagString = ""
	// TAG FROM DESCRIPTION
	if (block.description != null && block.description.includes("tag#")==true) {
		// let str = 'tag#';
		// get everything after #
		// let slug = str.substring(str.indexOf('#') + 1); //


		// descriptionTag = block.description.split('tag')[1].split("\n")[0]
		descriptionTag = block.description.split('tag')[1].split(/\s+/)[0];


		var myList = block.description
		// var items = myList.split(' ');
		var items = myList.split(/\s+/);


		for(var i = 0; i < items.length; i++) {
			// console.log(items.length);
      if(items[i].indexOf('tag') > -1){
				var value = items[i].split('tag')[1]
				tagString += value + " "
        matches.push(value);
    	}
		}
		// console.log(matches);
		// console.log("tagString: " + tagString);
		// return matches
		// console.log(block.description.includes("tag#"));

	}

	timeline.innerHTML +=
		'<div data-tags="'+ tagString +'" class="block">' +
			'<ul class="classification">' +
				'<li></li>' +
				'<li class="title">' + block.created_at.substring(0,10) + '</li>' +
				'<li>' + channelLine + '</li>' +
				'<li class="title spaced">' + block.title + '</li>' +
				'<li>' + urlLine + '</li>' +
				'<li class="spaced">' + matches.join(', ') + '</li>' +
				'<li class="title">'+
					'<a href="https://www.are.na/block/' + block.id + '" target="_blank">'+
					'edit block' +
					'</a>' +
				'</li>'+
			'</ul>' +
			'<ul class="contents">' +
				'<li>' + embedLine + '</li>' +
				'<li>' + imgLine + '</li>' +
				'<li>' + contentLine + '</li>' +
			'</ul>' +
		'</div>'



	// LEFT NAV TAGS //
	// LEFT NAV TAGS //
	// LEFT NAV TAGS //
	if(descriptionTag !== "") {
		// console.log(!(tagsArray.indexOf(descriptionTag) > -1));


			for (var i = 0; i < matches.length; i++) {
				if(!(tagsArray.indexOf(matches[i]) > -1)) {

				// matches[i]
				tagsArray.push(matches[i])
				tagsfield.innerHTML +=
					'<li data-filter="ping" data-filter-tag="'+ matches[i] +'" class="tag-element">'+
						matches[i] +
					'</li>'

				}


			// console.log("tags array: "+ tagsArray);
			// tagsArray.push(descriptionTag)
			// tagsfield.innerHTML +=
			// 	'<li data-filter="ping" data-filter-tag="'+ descriptionTag +'" class="tag-element">'+
			// 		descriptionTag +
			// 	'</li>'
			}
	}
	// console.log("tagsArray: " + tagsArray);
	// console.log("matches: " + matches);

}





function loadData( ) {
	titlefield = document.querySelector( '#title' );
	timeline = document.querySelector( '#timeline' );
	tagsfield = document.querySelector( '#tags div ul' );

	fetch( 'http://api.are.na/v2/channels/zam-zody/contents')

		.then( res => res.json( ) )
		.then( ( out ) => {
			let results = out.contents
			// console.log(results);
			results.forEach( displayResult );

		} );
}

window.onload = loadData;



document.addEventListener("DOMContentLoaded", function(){

	document.querySelectorAll("#reverse").forEach(function (items, index) {
		items.addEventListener("click", function (){
			document.querySelectorAll("#reverse").forEach(function(item) {
				item.classList.remove("highlight")
			})
			this.classList.add("highlight")

			if (this.dataset.dir == "newest") {
				document.getElementById("timeline").classList.remove("reverse-newest");
			}
			if (this.dataset.dir == "oldest") {
				document.getElementById("timeline").classList.add("reverse-newest");
			}
			window.scrollTo(0, 0);



		})
	})


});


// ------------------------------------------------------------------ //
// ------------------------------------------------------------------ //
// ------------------------------------------------------------------ //


// FILTER TAGS //



document.addEventListener('click', function (e) {
  var button = e.target;
	// console.log(button);
	if (button.getAttribute('data-filter') === 'ping' && button.getAttribute('data-reset') !== 'true') {
		document.getElementById("filter-all").classList.remove("highlight")
		button.classList.add("highlight")
	}


  if (button.getAttribute('data-reset') === 'true') {
		button.classList.add("highlight")
    // Reset the filters
    var filter = button.getAttribute('data-filter');
    resetFilter(filter);
  } else {

    // Filter the tag
    var filter = button.getAttribute('data-filter');
    var tag    = button.getAttribute('data-filter-tag');
    filterTag(filter, tag);
  }
});

// Filter tag
function filterTag (filter, tag) {

	// !!!!!!!!!!!  delete resetFilter if you want to have multiple tags
	// resetFilter(filter);

  var items = document.querySelectorAll('.' + filter + ' > .block');

  for (var i = 0; i < items.length; i++) {
    var itemTags = items[i].getAttribute('data-tags');

    // Catch case with no tags
    if (itemTags != null) {
			console.log(itemTags.indexOf(tag));
			// items[i].setAttribute('data-state', '1')
      if (itemTags.indexOf(tag) < 0) {
        items[i].setAttribute('data-toggle', 'off');
      }
    }
  }
}

function clearFilter (filter, tag) {
	var items = document.querySelectorAll('.' + filter + ' > .block');

	for (var i = 0; i < items.length; i++) {

	}
}

// Reset filters
function resetFilter (filter) {
	document.querySelectorAll('.tag-element').forEach((item, i) => {
		item.classList.remove("highlight");
	});
  var items = document.querySelectorAll('.' + filter + ' > .block');

  for (var i = 0; i < items.length; i++) {
    items[i].setAttribute('data-toggle', 'on');
  }
}
