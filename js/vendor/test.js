// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html


var flowers = [];
$(function() {

  $.get('/flowers', function(storedFlowers) {
    flowers = storedFlowers;
    console.log("flowers found: ", flowers);

    flowers.forEach(function(flowerData, index) {
      // Draw a flower

      var flower = new Flower(flowerData, index);

    });



    $('form').submit(function(event) {
      event.preventDefault();
      var dream = $('input').val();
      $.post('/dreams?' + $.param({
        dream: dream
      }), function() {

        $('input').val('');
        $('input').focus();
      });
    });

  });
});

function dnaToView(dna, holder, index) {
  var dnaHolder = $("<div/>", {
    class: "dna-holder",
  }).appendTo(holder);
  for (var i = 0; i < dna.length; i++) {
    var val = dna[i];
    val = utilities.noise(i * .2 + index) * .5 + .5;

    var hue = val * 360;

    var dnaLine = $("<div/>", {
      class: "dna-line",

    }).appendTo(dnaHolder).css({

      backgroundColor: "hsla(" + hue + ", 50%, 20%, 1)"
    });

    var fill = $("<div/>", {

      class: "dna-fill"
    }).appendTo(dnaLine).css({
      width: 100 * val + "%",

      backgroundColor: "hsla(" + hue + ", 50%, 60%, 1)",
      boxShadow: "inset 0px -1px 4px hsla(" + hue + ", 50%, 20%, 1), inset 0px 1px 4px hsla(" + hue + ", 50%, 80%, 1)"
    });

  }



  var Flower = Class.extend({
    init: function(data, index) {

      var holder = $(".flower-holder");

      var flowerView = $("<div/>", {
        class: "flower-view",
      }).appendTo(holder);

      var flowerThumb = $("<div/>", {
        class: "flower-thumbnail",
      }).appendTo(holder);


      utilities.createProcessing(flowerThumb, function(time) {

      }, function(g) {
        g.background(0, 0, 0);
      });

      dnaToView(flower.dna, holder, index);
    }
  });