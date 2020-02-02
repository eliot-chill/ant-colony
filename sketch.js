var points = [];
var POINTS_NUM = 50;
var variance = 0.6;

var highlightPoints = false;

function drawPoints() {
    for (let i = 0; i < points.length; i++) {
        if (highlightPoints) {
            points[i].draw();
        }
        if (i < points.length - 1) {
            line(points[i].getX(), points[i].getY(), points[i + 1].getX(), points[i + 1].getY());
        }
    }
}

function drawLine(currentSolution) {

    //console.log(points.length+":"+points.indexOf(randomPoint));

    line(currentSolution.getX(), windowHeight / 2, currentSolution.getX(), currentSolution.getY());

}

function setup() {
    var graphWidth = windowWidth - 50;
    var graphHeight = windowHeight / 2;
    var cnv = createCanvas(graphWidth, graphHeight);
    cnv.style('display', 'block');
    cnv.parent("canvasDiv");


    var xOffset = 0;
    var yOffset = 0;
    var yPoint = 0;
    var xPoint = 0;
    for (let i = 0; i < POINTS_NUM + 1; i++) {
        xOffset = i * (graphWidth / (POINTS_NUM));
        xPoint = xOffset;
        yPoint = map(noise(xOffset, yOffset), 0, 1, 0, graphHeight) * variance;

        points.push(new Point(xPoint, yPoint));


    }
    //frameRate(15)
    
    sim.setupSim(points);
}

var sim = new SimAnneal;
var currentSolution = null;
function draw() {
    background(255, 255, 255);
    if(sim.getTemp() > 0){
        currentSolution = sim.runSim(points);        
    }
    drawPoints();
    drawLine(currentSolution);
}




$(document).on('input', '#variance', function () {
    variance = $(this).val();
    resetPoints();
    resetSketch();
});

$(document).on('input', '#numberOfPoints', function () {
    POINTS_NUM = $(this).val();
    resetPoints();
    resetSketch();
});

$(document).on('click', '#highlightPoints', function () {
    clear();
    if (this.checked) {
        highlightPoints = true;
    } else {
        highlightPoints = false;
    }
});

function resetPoints() {
    points = [];
}

function resetSketch() {
    setup();
}