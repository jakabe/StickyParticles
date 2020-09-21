
var vineNode;
var particleArray = [];
var bigTree;
function setup(){
    ellipseMode(CENTER);
    createCanvas(500,500);
    bigTree = new treeObj();
    bigTree.limbs[0].radius = 50;

    for(var i = 0 ; i < 10 ; i++){
        tp = new particle();
        particleArray.push(tp);
    }
}

function draw() {
    background(0,0,0);
    bigTree.display();
    for(var i = 0 ; i < particleArray.length ; i++){
       
        if(particleArray[i] != null){
            if(particleArray[i].movable == true){
                particleArray[i].display();
                particleArray[i].move();
                particleArray[i].collideWithBoundary();

                //particleArray[i].collideWithTree(bigTree);
                if(particleArray[i].collideWithTree(bigTree) ==true ){
                    particleArray[i] = new particle();

                }
            }
        }
        
    }
    
}


class particle {
    constructor(){
        this.radius = random(1,20);
       
        this.pos = createVector(random(0,width),random(0,height));

        this.c = color( random(64,255) ,0 ,random(64,255) );
        
        this.dir = createVector(random(-1,1),random(-1,1));

        this.movable = true;
        
    }

    display(){
        noStroke();
        fill(this.c);
        ellipse(this.pos.x,this.pos.y,this.radius,this.radius);
    }

    move(){
        if(this.movable == true){
            this.pos.x += this.dir.x;
            this.pos.y += this.dir.y;
        }
        
    }
    
    collideWithBoundary(){
        //x collide
        if(this.pos.x >= width){
            this.pos.x = width - 1;
            this.dir.x *= -1;
        }
        if(this.pos.x <= 0){
            this.pos.x = 1;
            this.dir.x *=-1;
        }
        //y collide
        if(this.pos.y >= height){
            this.pos.y = height - 1;
            this.dir.y *= -1;
        }
        if(this.pos.y <= 0){
            this.pos.y = 1;
            this.dir.y *=-1;
        }
        
    }

    collideWithSeed(seedX, seedY){
        
        if( (abs( (this.pos.x - seedX) ) < 25)  && ( abs( (this.pos.y - seedY) ) < 25)){
            //console.log(this.xpos);
            this.movable = false;
        }
        
    }

    collideWithTree(tree){
        //console.log("collide with tree called by "+this.c+"-"+this.radius);
        //tree is an array of points and radi;
        for( var i = 0 ; i < tree.limbs.length ; i++){
            //console.log("   there are currently "+tree.limbs.length+" limbs");
            var df = p5.Vector.sub(this.pos, tree.limbs[i].pos);
            var m = df.mag();
            //console.log("       df = "+df);
            
            if( m <  tree.limbs[i].radius/2+this.radius/2){
                // console.log("Collided with tree");
                // console.log(this.pos);
                // console.log(tree.limbs[i].pos);
                // var xdiff = abs(this.pos.x - tree.limbs[i].pos.x);
                // var ydiff = abs(this.pos.y - tree.limbs[i].pos.y);
                // console.log("xdiff = "+xdiff);
                // console.log("ydiff = "+ydiff);

                tree.grow(this);
                return true;
                //exit();
            }
        }
        return false;
    }
}

class treeObj {
    constructor(){
        this.limbs = []
        this.trunk = new particle();
        this.trunk.movable = false;
        this.limbs.push(this.trunk);
        
    }

    display(){
       for(var i = 0 ; i < this.limbs.length ; i++){
        this.limbs[i].display();
       }
    }

    grow(p){
        
        p.movable = false;
        this.limbs.push(p);
        //console.log("Grow called");
        // for(var i = 0 ; i <this.limbs.length ; i++){
        //     console.log(i);
        //     console.log(this.limbs[i]);
        // }
        // console.log("------------------------------");
        // console.log(p);
        // console.log("------------------------------");
        // particleArray.indexOf(p);
        // for(var i = 0 ; i <particleArray.length ; i++){
        //     console.log(i);
        //     console.log(particleArray[i]);
        // }
    }
}