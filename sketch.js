var nodes = [];
var headNode = null;
var goalNode = null;
var nodeRadius = 50;
var nodeNum = 5;


var edges = [];
var temporaryEdgeAttached = null;
const states = {
    NODES: "nodes",
    EDGES: "edges",
    SIMULATING: "simulating"
}
var state = states.NODES;

var ants = [];
var numOfAnts = 1;
var drawn = false;

var antImg;

function preload() {
    antImg = loadImage('assets/ant.png');
    //console.log(antImg)
}

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
    if (state == states.SIMULATING) {
        if (drawn == false) {
            for (let i = 0; i < numOfAnts; i++) {
                createNewAnt();
            }
            drawn = true;
        } else {
            drawAnts();
            moveAnts();
        }
    }

}

function drawNodes() {
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].drawNode();
    }
}

function drawEdges() {
    if (temporaryEdgeAttached != null) {
        temporaryEdgeAttached.drawEdge();
    }
    for (let i = 0; i < edges.length; i++) {
        edges[i].drawEdge();
    }
}

function drawAnts() {
    for (let i = 0; i < ants.length; i++) {
        if (ants[i].getDestinationNode() == null && edges.length > 0) {
            if (ants[i].getPreviousNode() == null) {
                ants[i].setDestinationNode(random(nodes));
            } else {
                ants[i].setDestinationNode(ants[i].getPreviousNode().getRandomNeighbour());
            }

        }
        ants[i].drawAnt();
    }
}

function moveAnts() {
    for (let i = 0; i < ants.length; i++) {
        ants[i].moveAnt();
    }
}

function mousePressedInCanvas() {
    switch (state) {
        case states.NODES:
            if (mouseButton == LEFT) {
                if (nodes.length < nodeNum) {
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
                } else {
                    if (headNode == null) {
                        headNode = getNodeThatCollidesWithMouse();
                        headNode.setHeadNode(true);
                        break;
                    }
                    if (goalNode == null) {
                        goalNode = getNodeThatCollidesWithMouse();
                        goalNode.setGoalNode(true);
                        break;
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
                        temporaryEdgeAttached = createTemporaryEdge(mouseNode);

                    } else {
                        if (temporaryEdgeAttached.getNode1() != mouseNode) {
                            temporaryEdgeAttached.attachEdge(mouseNode);
                            let node1 = temporaryEdgeAttached.getNode1();
                            let node2 = temporaryEdgeAttached.getNode2();
                            node1.addNeighbour(node2);
                            node2.addNeighbour(node1);
                            addNewEdge(temporaryEdgeAttached);
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


function addNewEdge(edge) {
    edges.push(edge);
}

function createTemporaryEdge(node) {
    let newEdge = new Edge(node);
    return newEdge;
}

function createNewAnt() {
    let randomNode = random(nodes);
    let newAnt = new Ant(headNode.getX(), headNode.getY());
    ants.push(newAnt);
}

function removeNode(node) {
    nodes.splice(nodes.indexOf(node), 1);
}

function getNodeThatCollidesWithMouse() {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].collidesWithMouse()) {
            //console.log("Collides")
            return nodes[i];
        }
    }
    return null;
}

$(document).ready(function () {
    $("#stateButton").click(function () {
        if (state == states.NODES) {
            state = states.EDGES;
            $("#stateButton").text("Click to simulate!");
        } else if (state == states.EDGES) {
            state = states.SIMULATING;
            $("#stateButton").text("Stop simulating!");
        } else if (state == states.SIMULATING){
            state = states.NODES;
            $("#stateButton").text("Click to add Edges!");
        }
    });
});