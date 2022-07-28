require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

var address, width, height, zoom, link, imgURL0;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintSettings () {
	document.getElementById('img1').src = imgURL0;
	document.getElementById('text-input-id-1').value = address;
	document.getElementById('slider-id-01').value = width;
	//document.getElementById('slider-id-02').value = height;
	//document.getElementById('slider-id-03').value = zoom;
}

function paintSliderValues () {
	document.getElementById('slider-id-01-val').innerHTML = document.getElementById('slider-id-01').value;
	//document.getElementById('slider-id-02-val').innerHTML = document.getElementById('slider-id-02').value;
	//document.getElementById('slider-id-03-val').innerHTML = document.getElementById('slider-id-03').value;
}


function paintMap() {
	im = 'img1';
	
	address = document.getElementById('text-input-id-1').value;
	imgURL0 = document.getElementById(address).src;
	width = document.getElementById('slider-id-01').value;
	//height = document.getElementById('slider-id-02').value;
	//zoom = document.getElementById('slider-id-03').value;
	//link = document.getElementById('text-input-id-2').value;
	if (!address) {
		return;
	}
	var url = imgURL0+'?w='+width;
	sdk.setContent('<img src="' + url + '" />');
	sdk.setData({
		address: address,
		width: width,
		height: height,
		zoom: zoom,
		link: link,
		imgURL0: imgURL0,
		val: val
	});
	localStorage.setItem('googlemapsapikeyforblock', imgURL0);
}

sdk.getData(function (data) {
	address = data.address || 'img1';
	width = data.width || 400;
	//height = data.height || 300;
	//zoom = data.zoom || 15;
	//link = data.link || '';
	imgURL0 = data.imgURL0 || document.getElementById('img1').src;
	paintSettings();
	paintSliderValues();
	paintMap();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintMap, 500)();
	paintSliderValues();
});
