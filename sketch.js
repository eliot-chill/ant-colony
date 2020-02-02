var nodes = [];
var nodeRadius = 50;

var edges = [];
var temporaryEdgeAttached = null;
const states = {
    NODES: "nodes",
    EDGES: "edges",
    SIMULATING: "simulating"
}
var state = states.NODES;

function setup() {
    var canvas = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
    canvas.parent('sketch-holder');
    canvas.mousePressed(mousePressedInCanvas);
    background(25);
}

function windowResized() {
    resizeCanvas(windowWidth * 0.8, windowHeight * 0.8);
}

function draw() {
    background(128);
    drawNodes();
    drawEdges();
}

function drawNodes() {
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].drawNode();
    }
}

function drawEdges() {
    for (let i = 0; i < edges.length; i++) {
        edges[i].drawEdge();
    }
}

function mousePressedInCanvas() {
    switch (state) {
        case states.NODES:
            if (mouseButton == LEFT) {
                if (nodes.length == 0) {
                    createNewNode()
                } else {
                    let tempNode = new Node(mouseX, mouseY, nodeRadius);
                    let nodeCollides = false;
                    for (let i = 0; i < nodes.length; i++) {
                        if (nodes[i].collidesWithNode(tempNode)) {
                            nodeCollides = true;
                        }
                    }
                    if (!nodeCollides) {
                        nodes.push(tempNode);
                    }
                }
            } else if (mouseButton == RIGHT) {
                let nodeToRemove = getNodeThatCollidesWithMouse();
                if (nodeToRemove != null) {
                    removeNode(nodeToRemove);
                }
            }
            break;


        case states.EDGES:
            if (mouseButton == LEFT) {
                let mouseNode = getNodeThatCollidesWithMouse();
                if (mouseNode != null) {
                    if (temporaryEdgeAttached == null) {
                        temporaryEdgeAttached = createNewEdge(mouseNode);

                    } else {
                        if (temporaryEdgeAttached.getNode1() != mouseNode) {
                            temporaryEdgeAttached.attachEdge(mouseNode);
                            temporaryEdgeAttached = null;
                        }
                    }
                }
            }

            break;
    }
}


function createNewNode() {
    let newNode = new Node(mouseX, mouseY, nodeRadius);
    nodes.push(newNode);
}


function createNewEdge(x, y) {
    let newEdge = new Edge(x, y)
    edges.push(newEdge);
    return newEdge;
}

function removeNode(node) {
    nodes.splice(nodes.indexOf(node), 1);
}

function getNodeThatCollidesWithMouse() {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].collidesWithMouse()) {
            console.log("Collides")
            return nodes[i];
        }
    }
    return null;
}

$(document).ready(function () {
    $("#stateButton").click(function () {
        if (state == states.NODES) {
            state = states.EDGES;
            $("#stateButton").text("Click to add Nodes!");
        } else if (state == states.EDGES) {
            state = states.NODES;
            $("#stateButton").text("Click to add Edges!");
        }
    });
});