class Node {
    x = 0
    y = 0
    radius = 0
    neighbours = [];
    goalNodeStatus = false;
    headNodeStatus = false;



    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    drawNode() {
        if (this.headNodeStatus) {
            fill(255, 255, 0);
        } else if (this.goalNodeStatus) {
            fill(0, 255, 255);
        }
        ellipse(this.x, this.y, this.radius);
        fill(255);
        text(this.neighbours.length, this.x - 2, this.y - 2, this.x + 2, this.y + 2)
        
    }

    collidesWithMouse() {
        let mx = mouseX
        let my = mouseY
        let x = this.x;
        let y = this.y;
        let r = this.radius / 2;
        return ((mx > x - r) && (mx < x + r)) && ((my > y - r) && (my < y + r));
    }

    collidesWithNode(node) {
        //console.log(dist(this.x, this.y, node.getX(), node.getY()));
        return dist(this.x, this.y, node.getX(), node.getY()) < (this.radius + node.getRadius()) / 2;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getRadius() {
        return this.radius;
    }

    getNeighbours() {
        return this.neighbours;
    }

    getRandomNeighbour() {
        return random(this.neighbours);
    }

    addNeighbour(neighbourNode) {
        this.neighbours.push(neighbourNode);
    }

    setHeadNode(state) {
        this.headNodeStatus = state;
    }

    setGoalNode(state) {
        this.goalNodeStatus = state;
    }
}