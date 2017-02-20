var canvas=document.getElementById("canvas");
canvas.width=800;
canvas.height=600;
canvas.style.border="1px solid";

var cotx=canvas.getContext("2d");

var canvas2=document.getElementById("canvas2");
canvas2.width=800;
canvas2.height=600;

var cotx2=canvas2.getContext("2d");


var canvas3=document.getElementById("canvas3");
canvas3.width=800;
canvas3.height=600;

var cotx3=canvas3.getContext("2d");


var img=new Image();              //定义滑稽
    img.src="img/dapao.png";

function draw(sd){              //绘制大炮
	cotx2.save();
	cotx2.beginPath();
	cotx2.translate(400,600);
	cotx2.rotate(-sd);
    cotx2.drawImage(img,-50,-100,100,200);
	cotx2.restore();
}
draw()                         //执行


canvas2.onmousemove=function(e){
	var mouseX=e.clientX,
	    mouseY=e.clientY,
	    bodyW=document.body.clientWidth/2,
	    bodyH=document.body.clientHeight/2+780;
	    
	var degs=Math.atan((bodyW-mouseX)/(bodyH-mouseY));
	cotx2.clearRect(0,0,canvas2.width,canvas2.height);
	draw(degs);
}

var colors=["yellow","black","blue","red","green"]

//=======================================================
function drawball(ball){
	cotx.beginPath();
	cotx.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
	cotx.fillStyle=ball.color;
	cotx.fill();
}

var balls=[];
var tim=0;           
var on=true;         //开关

var clicks=true;

function moveBall(){               //球的移动
	cotx.clearRect(0,0,canvas.width,canvas.height);
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		
		balls.index=i;
		if(balls[i].x<-10||balls[i].x>canvas.width+10||balls[i].y<-10){
			balls.splice(balls[i].index,1);
			continue;
		}
		
		drawball(balls[i]);
		
	}
}

canvas2.onclick=function(e){                //点击发射小球
	var num=Math.floor(Math.random()*colors.length);
  if(clicks){
		var spex=document.body.clientWidth/2-e.clientX,
	    spey=document.body.clientHeight/2+780-e.clientY;
	var ball={                    //定义球对象
		x:400,
		y:600,
		r:20,
		vx:-spex/10,
		vy:-spey/10,
		color:colors[num]
	}
	balls.push(ball);
	
	
	if(on){
		clearInterval(tim)
		tim=setInterval(function(){
		moveBall()
	   },20);
	   on=false;
	}
	
	if(!balls.length){
		clearInterval(tim);
		on=true;
	}
	clicks=false;
	setTimeout(function(){clicks=true},300)                 //300毫秒发射一次
	
  }
	
}
//=======================================================================

var img2=new Image();                            //定义怪物图片
    img2.src="img/huaji.png"
function drawRect(rect){                          //绘制怪物
	cotx3.beginPath();
	cotx3.drawImage(img2,rect.x,rect.y,70,70);
}
var rects=[];                            //存放怪物的数组

function Rect(){                               //怪物制作
	var rect={
		x:Math.random()*(canvas3.width-50),
		y:-Math.random()*500-100,
		vy:2
	}
	if(rects.length<4){
		rects.push(rect);
	}
	moveRect();
	
}

function moveRect(){                        //怪物移动
	cotx3.clearRect(0,0,canvas3.width,canvas3.height);
	for(var i=0;i<rects.length;i++){
		if(numbers>190){      //分数大于190加速  level1
			rects[i].vy=3;
		}
		if(numbers>1000){      //分数大于1000加速  level2
			rects[i].vy=4;
		}
		if(numbers>2000){      //分数大于2000加速  level3
			rects[i].vy=6;
		}
		rects[i].y+=rects[i].vy;
		rects[i].index=i;
		if(rects[i].y>canvas3.height){   //超出范围清除
			rects.splice(rects[i].index,1);
			ming--;   //生命次数减一
			life.innerText=ming;
			if(ming==0){
				gameover();
			}
			continue;
		}
		for(var j=0;j<balls.length;j++){                      //实现碰撞
			if(Math.abs(balls[j].x-rects[i].x)<50&&Math.abs(balls[j].y-rects[i].y)<50){
				rects.splice(rects[i].index,1);       //清除怪
				balls.splice(balls[j].index,1);       //清除球
				
				numbers+=10; //每次碰撞加十分
				scorll.innerText=numbers;
			}
		}
		drawRect(rects[i]);
	}
}


//开始新游戏
var numbers=0;  //定义得分
var ming=5;    //5次机会

var scorll=document.getElementById("scorll");
var life=document.getElementById("life");
var finallSc=document.getElementById("finalScorll");
var gameoved=document.getElementById("gameover");

life.innerText=ming;

//游戏结束
function gameover(){
	gameoved.style.transform="scale(1)";
	finallSc.innerText=numbers;
	clearInterval(timers);
}

function scale(){
	gameoved.style.transform="scale(0)";
}
var timers=0;           //定义循环timers
var newg=document.getElementById("newgame");
newg.onclick=function(){
	clearInterval(timers);
	scorll.innerText=0;
	life.innerText=5;
	rects=[];
	timers=setInterval(function(){
	Rect();
    },20);
}
