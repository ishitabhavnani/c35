var ball;
var database , ref , ballPosition;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
    ref=database.ref('ball/position');
    ref.on("value", readPosition , showError)
}

function draw(){
    background("white");

    if (ballPosition){
        
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();

    }
}

function writePosition(x,y){
   // ball.x = ball.x + x;
    //ball.y = ball.y + y;

    database.ref('ball/position').set({
        x:ballPosition.x + x,
        y:ballPosition.y + y
    })
}

function readPosition(data){
    ballPosition=data.val();

    ball.x=ballPosition.x;
    ball.y=ballPosition.y;
}

function showError(){
    console.log ("ERROR")
}