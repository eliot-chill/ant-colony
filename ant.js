class Ant {

    x = 0;
    y = 0;
    originX = 0;
    originY = 0;
    scale = 0.05;
    speed = 0.1;
    previousNode = null;
    destinationNode = null;


    constructor(x, y) {
        this.x = x;
        this.y = y;

    }

    drawAnt(){
        image(antImg,this.x, this.y,antImg.width*this.scale,antImg.height*this.scale);
    }

    setDestinationNode(destinationNode){
        this.destinationNode = destinationNode;
        //console.log("Setting new node");
        this.originX = destinationNode.getX();
        this.originY = destinationNode.getY();
        if(this.getPreviousNode() == null){
            this.setPreviousNode(this.destinationNode);
        }
    }

    getDestinationNode(){
        return this.destinationNode;
    }

    setPreviousNode(previousNode){
        this.previousNode = previousNode;
    }

    getPreviousNode(previousNode){
        return this.previousNode;
    }

    moveAnt(){
        if(this.destinationNode != null){
            this.x += (this.originX-this.x) * this.speed; 
            this.y += (this.originY-this.y) * this.speed;
            //console.log("Moving towards node")
            if(abs(this.x - this.destinationNode.getX()) < 1 && abs(this.y == this.destinationNode.getY()) < 1){
               //console.log("Node Reached")
                this.setPreviousNode(this.getDestinationNode());
                this.destinationNode = null;
            }
        }
        
    }


}