class Edge {
    isTemporary = true;
    node1 = null;
    node2 = null;

    constructor(node1) {
        this.node1 = node1;
    }

    getNode1() {
        return this.node1;
    }

    getNode2() {
        return this.node2;
    }

    drawEdge() {
        if (this.isTemporary) {
            line(this.getNode1().getX(), this.getNode1().getY(), mouseX, mouseY);
        } else {
            strokeWeight(5);
            line(this.getNode1().getX(), this.getNode1().getY(), this.getNode2().getX(), this.getNode2().getY());
            strokeWeight(1);
        }
    }

    attachEdge(node2) {
        this.node2 = node2;
        this.isTemporary = false;
    }



}