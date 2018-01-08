$(document).keyup(function(e) {
	console.log(e.keyCode)


});

$(document).keydown(function(e) {
	console.log(e.keyCode)

});
var colorRange = 1;
var canvasG;
var mandala;
var screenSize = new Vector();
var world, hands, voronoiSites, handSites, grammar;
var leapController;
var pCount = 20;

var frameMax = 12000000;

$(document).keyup(function(e) {
	console.log(e.keyCode);
	if (e.keyCode === 49) {
		pCount--;
		reset();
	}
	if (e.keyCode === 50) {
		pCount++;
		reset();
	}
	if (e.keyCode === 51) {
		colorRange*=.95;
		reset();
	}
	if (e.keyCode === 52) {
		colorRange+=.95;
		
		reset();
	}
});


function reset() {
	mandala = new Mandala(pCount);
	canvasG.background(1);
}
$(document).ready(function() {

	console.log("start");
	mandala = new Mandala(pCount);



	utilities.createProcessing($("#mandalaSrc"), function(time) {
			mandala.update(time);
		}, function(g, time) {

			mandala.draw(g, time);

		},
		function(g) {
canvasG = g;
			screenSize.x = g.width;
			screenSize.y = g.height;

		});

});