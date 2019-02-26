var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 600;
canvas.style = "position:absolute; top: 5%; left: 50%; margin-left: -600px"; //canvas is in the center
//canvas.style = "position:absolute; left: 50%; margin-left: -600px"; //canvas is in the center
/*
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
*/

//object aka circle
var speed = 3;
var block_length = 100;
var up = 0;
var down = 0;
var char = 0;
var score_player_1 = 0;
var score_player_2 = 0;
var win_score = 2;
window.addEventListener('keydown',function(event){
    char = event.which || event.keyCode;
    console.log('all done'+ char);
});
function distance(x,y){
    return Math.abs(x-y);
}

function create_circle(){

    color_circle = '#A1C181';
    color_rect = '#FE7F2D';
    color_arena = '#233D4D';
    radius = 20;
    do{
    var x = Math.random() * (canvas.width - 2 * radius) + radius;
    }while(x < 300 || x > 700);
    var y = Math.random() * (canvas.height - 2 * radius) + radius;
    var dx = (Math.random() - 0.5) * 6;
    var dy = (Math.random() - 0.5) * 6;
    var p1 = 250;
    var p2 = 250;

    this.draw = function(){
        c.beginPath();
        c.arc(x,y,radius,0,Math.PI*2,false);
        c.strokeStyle = color_circle; //This adds border
        c.fillStyle = color_circle;
        c.fill();
        c.stroke();
        /*
        c.beginPath();
        c.lineWidth="6"
        c.rect(0,p1,10,100)
        c.rect(990,p2,10,100)
        c.strokeStyle = color_rect; //This adds border
        c.fillStyle = color_rect;
        c.fill();
        c.stroke();
        */
    }
    this.update = players =>{
        /*
        console.log('player_1_rect.pos'+players[0].pos)
        console.log('this.x'+x)
        console.log('all done move back'+distance(players[0].pos, x));*/
        if(distance(players[0].pos, x) < 40 && (y-players[0].p) > 0 && (y-players[0].p) < block_length)
        {
            //console.log('player_1 made contact');
            dx = -dx;
        }
        if(distance(players[1].pos, x) < 40 && (y-players[1].p) > 0 && (y-players[1].p) < block_length)
        {
            //console.log('player_2 made contact');
            dx = -dx;
        }

        if( x + radius > canvas.width )
            score_player_1 = score_player_1 + 1;
        if( x - radius < 0 )
            score_player_2 = score_player_2 + 1; 
        
            //Ball left the screen
        if(( x + radius > canvas.width ) || ( x - radius < 0 ))
            dx = -dx;
        if(( y + radius > canvas.height ) || ( y - radius < 0 ))
            dy = -dy;

        x = x + dx
        y = y + dy

/*players movements
        if(char == 83)
            p1=p1+1
        if(char == 87)
            p1=p1-1
        if(char == 65)
            p1=p1
        if(char == 38)
            p2=p2-1
        if(char == 40)
            p2=p2+1
        if(char == 16)
            p2=p2
*/
        this.draw();
    }
}

function create_rect(pos_x, pos_y, player, width, block_length, color){

    this.pos = pos_x;
    this.player = player;
    this.p = pos_y;

    this.draw=function(){
        c.beginPath();
        c.lineWidth="6"
        c.rect(this.pos,this.p,width,block_length)
        c.strokeStyle = color; //This adds border
        c.fillStyle = color;
        c.fill();
        c.stroke();
    }

    this.update=function(){
        if(this.player == 0 || this.player == 1)
        {
        if(this.player == 0)//Player_1
        {
        if(char == 83)      //DOWN
        this.p=this.p+speed
        if(char == 87)      //UP
        this.p=this.p-speed
        if(char == 65)
        this.p=this.p
        }
        else{               //Player_2
        if(char == 38)      //UP
        this.p=this.p-speed
        if(char == 40)      //DOWN
        this.p=this.p+speed
        if(char == 16)
        this.p=this.p
        }
        //char = 0
        if(this.p < 0)      //Taking care of edges. Stop block movement at the edges.
        this.p = 0;
        if(this.p > (canvas.height - block_length))
        this.p = (canvas.height - block_length);
        }
        else
        {
            console.log('Arena updated');
        }
        this.draw();
    }
}
function score_update(){
    c.fillStyle = 'red';
    c.font = "40px Comic Sans MS"
    c.fillText('player 1', 0, 100)
    c.fillText('player 2', 1050, 100)
    c.font = "80px Comic Sans MS"
    
    c.fillText(score_player_1, 25, 325)
    c.fillText(score_player_2, 1125, 325)
    if((score_player_1 >= win_score) && (score_player_1 > score_player_2))
        window.alert("player 1 wins!!")
    if((score_player_2 >= win_score) && (score_player_1 < score_player_2))
        window.alert("player 2 wins!!")
}

Circle_object_1 = new create_circle()     //circle
Circle_object_2 = new create_circle() 
players = [];
player_1_rect = new create_rect(100, 250, 0, 10, block_length, color_rect)    //player_1
player_2_rect = new create_rect(1090, 250, 1, 10, block_length, color_rect)  //player_2
Arena = new create_rect(100, 0, 2, canvas.width-200, canvas.height, color_arena)
Arena.update();
players.push(player_1_rect)
players.push(player_2_rect)
    function animate(){
        requestAnimationFrame(animate);
        c.clearRect(0,0,innerWidth,innerHeight);
        Arena.update();
        Circle_object_1.update(players);
        Circle_object_2.update(players);
        player_1_rect.update();
        player_2_rect.update();
        //Arena.update();
        score_update()
        }

animate();
    
