var mandala;

function startMandala() {
	mandala = new Mandala(pCount);



	utilities.createProcessing($("#mandala"), function(time) {
			mandala.update(time);
		}, function(g, time) {

			mandala.draw(g, time);

		},
		function(g) {
			canvasG = g;
			screenSize.x = g.width;
			screenSize.y = g.height;

		});
}

function Mandala(count) {
	var mandala = this;
	var destinationCanvas, sourceCanvas;
	this.sides = 10;
	var mandalaHolder = $("#mandalaSrc");
	var clones = [];
	for (var i = 0; i < 0; i++) {
		clones[i] = $("<canvas/>", {
			width: 120,
			height: 60,

		}).appendTo($("#cloneHolder"));
	}

	this.particles = [];

	for (var i = 0; i < count; i++) {
		var p = new Vector(i * 20, 30 * utilities.noise(i));
		p.hue = 0;
		p.pct = i / count;
		this.particles[i] = p;
	}



}

Mandala.prototype.draw = function(g, time) {
	var t = time.current;
	g.noStroke();
	g.fill(t % 1, .1, 1, .02)
		// Background
	g.rect(-g.width / 2, -g.height / 2, g.width, g.height);
	//world.draw(g, t);



	g.pushMatrix();
	var sides = 12;
	for (var i = 0; i < sides; i++) {

		g.pushMatrix();
		g.rotate(2 * Math.PI * i / sides);
		mandala.particles.forEach(function(p) {

			g.fill((p.hue % 1), 1, .6 + .4 * Math.sin(p.pct * 12));

			p.drawCircle(g, p.radius);
		})
		g.popMatrix();
	}
	g.popMatrix();

}
Mandala.prototype.update = function(time) {
	var t = time.current;

	mandala.particles.forEach(function(p, index) {
		var pct = (p.pct + t * .1) % 1
		p.x = pct * 180 + 15;
		p.y = (20 + 40 * pct) * utilities.noise(t * .02 + (.2 + p.pct) * pct + index * .2);

		var rMod = .5 * (1 + utilities.noise(pct * 2 + t * .2));
		rMod = Math.pow(rMod, 2.3);
		p.radius = pct * 20 * rMod + .3;
		p.hue = (((.3 * colorRange * (utilities.noise(p.x * .0002 + index * .2) + 1) * .5) + time.current * .2) % 1);
	})
}