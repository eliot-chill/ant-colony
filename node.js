class Node {
    x = 0
    y = 0
    radius = 0

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    drawNode() {
        ellipse(this.x, this.y, this.radius)
    }

    collidesWithMouse() {
        let mx = mouseX
        let my = mouseY
        let x = this.x;
        let y = this.y;
        let r = this.radius / 2;
        return ((mx > x - r) && (mx < x + r)) && ((my > y - r) && (my < y + r));
    }

    collidesWithNode(node){
        console.log(dist(this.x, this.y, node.getX(), node.getY()));
        return dist(this.x, this.y, node.getX(), node.getY()) < (this.radius + node.getRadius())/2;
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
}
