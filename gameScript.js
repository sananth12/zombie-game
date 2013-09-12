

   var canv=document.getElementById("myCanvas");
   var cty=canv.getContext("2d");
   var bbb=new Image(); 
   bbb.src="images/info2.png";
   bbb.onload=function(){cty.drawImage(bbb,0,0,500,500,0,0,502,500);};

(function() {

var canvas = null;
var img = null,image=null,imgd=null,img2=null,img3=null;
var isnuke=false;
var blaston=false;
var imgb=null;
var ctx = null;
var imageReady = false;
var tt,weapon=0;
var nubomb;
var d,dir,a,gun,disp=0;
var mag;
var zombie_array=new Array();
var candy_array=new Array();
var t;
var jx=new Array();
var mx,my;
var bf=0;
var ss;
var xf=0;
var ns;
var house=new Image();
var bs;
var gun=new Array();
var ammo=0;
var candycount=0;
var begin_game=false;
/*//*/

 mx=mx||-1; 
  canvas=document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  
  img = new Image();
  img.src = 'images/main.png';
  imgb=new Image();
  imgb.src='images/bomb2.png'
  imgc=new Image();
imgc.src='images/candy1.png';
  
  loaded();

//*/
function candy(x,y)
{
this.ncx=x;
this.ncy=y;
}
function get(event)
 {
 mx=event.clientX;
my=event.clientY; 
 }

var hero={
x:100,
y:100,
axe:0,
axe_x:0,
frame:0,
left:function()
  {
  hero.x-=3;
  if(hero.x<=0)
    hero.x=0;
  hero.frame+=1;
  if(hero.frame>=2)
  hero.frame=0;
  },
right:function()
  {
  hero.x+=3;
  if(hero.x>=485)
    hero.x=485;
  hero.frame+=1;
  if(hero.frame>=2)
  hero.frame=0;
  }
};

//////////////// Bullet ///////
function bullet()
{
  if(mx)
  {
    if(mx!=-1)
    {
      this.dx=hero.x;
      this.dy=hero.y; 
      this.ox=mx-hero.x;
      this.oy=my-hero.y;
      this.mag=(mx-hero.x)*(mx-hero.x)+(my-hero.y)*(my-hero.y);
      this.mag=Math.sqrt(this.mag);
      ctx.beginPath();
      ctx.arc(this.dx,this.dy,5,0*Math.PI,2*Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.stroke();
      }
    }
  }
bullet.prototype.shoot = function()
  {
  ctx.strokeStyle = 'black'; 
  ctx.fillStyle = 'red';  
  ctx.beginPath();
  ctx.arc(this.dx,this.dy,5,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(this.dx,this.dy,3,0,2*Math.PI);
  ctx.fillStyle = 'orange';
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = 'black';

  this.dx+=10*this.ox/this.mag;
  this.dy+=10*this.oy/this.mag;
  };
///////////////////////////////

function zombie(x,type)
{
   this.x=x;
   this.y=500;
   this.walk='up';
   this.fps=0; // sprite frame
   this.max_fps=3;
   this.x_img=0;
   this.y_img=0;
   this.x_inc=0;
   this.die=false;
   this.img=new Image();
   if(type==1)
   {
       this.img.src="images/ZombieSheet2.png";
       this.x_img=196;
       this.y_img=96;
       this.x_inc=31;
       this.max_fps=2;
   }
   this.draw = function() 
  {   
      if(this.walk=='up')
      ctx.drawImage(this.img,(this.x_inc*this.fps)+this.x_img,this.y_img,30,30,this.x,this.y,30,30);
      else if(this.walk=='right')
      ctx.drawImage(this.img,(this.x_inc*this.fps)+this.x_img,this.y_img,25,32,this.x,this.y,25,30);
      else if(this.walk=='left')
      ctx.drawImage(this.img,(this.x_inc*this.fps)+this.x_img,this.y_img,25,32,this.x,this.y,25,30);     
  }
}
zombie.prototype.update = function() 
{
   if(this.fps<this.max_fps)
   {  
      if(this.die==false)
      {
         if(this.walk=='right')
        this.x+=2+(disp/50)%25;
        
        if(this.walk=='left')
        this.x-=2+(disp/50)%25;
        
        if(this.walk=='up')
        this.y-=2+(disp/50)%25;
        
        
        this.fps++;
      }
      else
      {
        this.y+=20;
        this.fps++;
      }
   }
   else
   {
         this.fps=0;
   }

   /* Checking if reached floor */
   if(this.y<=100)
   {
      if(this.x<hero.x)
      {
        this.walk='right';
        this.x_img=295;
        this.y_img=65;
        this.x_inc=28;
      }
     else{
      this.walk='left';
      this.x_img=295;
      this.y_img=33;
      this.x_inc=28;
     }
   }
 };

//end of constructor

///// scoring  //////

function score()
{
  var kills=0;
  return function(x) {
  
    kills+=1;
    return kills;
  }
  function say_score()
  {return kills;}
}
var SCORE= score();
/////////  end //////////////////

//throwing jack 
//jack 
function jack(id)
  {
    this.y=hero.y+30;
    this.id=id;
    this.x=hero.x;
    this.img=new Image();
    this.img.src='images/jack.png';
    this.done=false;
    this.draw = function() 
    {
      ctx.drawImage(this.img,0,0,79,79,this.x,this.y,24,24);
    }
  }
jack.prototype.fall = function() 
{
  this.y+=20;
};
  /////////
  ///////////////nuke
  function nuke()
  {
  this.x=hero.x;
  this.y=hero.y;
  this.img=new Image;
  this.radius=50;
  this.img.src='images/bomb2.png';
   this.ns=0;
   }
nuke.prototype.draw=function()
{  
if(this.ns==0)
{this.x=hero.x;this.y=hero.y;
}
ctx.drawImage(this.img,0,0,167,302,this.x,this.y,25,40);
this.ns++; 
 }
nuke.prototype.drop=function()
{
this.y+=20;
}
nuke.prototype.blast=function(x,y)
{
this.begx=this.begx||this.x;
this.begy=this.begy||this.y;
    ctx.beginPath();
    ctx.arc(this.begx,this.begy,this.radius,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'grey';
    ctx.arc(this.begx,this.begy,this.radius-50,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = 'black';
    
    if(this.radius>250) 
    {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.arc(this.begx,this.begy,this.radius-150,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = 'black';
    }
       

this.radius+=10;
    }
  ///////////////

function ignite()
{
   begin_game=true;
   tt=setInterval(redraw,100);
}


function onload()
{
  mx=mx||-1; 
  canvas=document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  
  img = new Image();
  img.src = 'images/main.png';
  imgb=new Image();
  imgb.src='images/bomb.jpg'
  imgc=new Image();
imgc.src='images/candy1.png';
  
  nubomb=new nuke();
 
 img2.onload=loaded();
  hero.x=100;
   a=new dragon();
//  a.draw();
 // a.createfireball();

  xf=0;

 }
function loaded() {
  imageReady = true;
  d=3;

  /*

   Instructions image and start button*/
  
  
     
  /*
  */
  if(begin_game)
  tt=setInterval(redraw,100);
}
///////////////
 function getammo()
  {
  if(candycount<1 && Math.abs(mx-207)<52 && Math.abs(my-560)<23)
  {
     alert("You have no candies left!");
  }
  if(candycount>0 && Math.abs(mx-207)<52 && Math.abs(my-560)<23)
  {
     //alert(mx);
     //alert(my);
  ammo+=candycount;
  candycount=0;
  
  }

  }
 function getcandy()
 {
  get(event);

 for(i=0;i<candy_array.length;i++)
  {
  if(candy_array[i]!=null)
  {
  if(Math.abs(mx-candy_array[i].ncx)<45&&Math.abs(my-candy_array[i].ncy)<45)
  {
    candy_array[i]=null;
    candycount+=1;
    disp=SCORE();
    
  }
  
  }
  }
 
 }
//////////////
var rain=0;
var run=false;
window.addEventListener("keypress", function(event){
  
  var key=event.keyCode;
  run=false;
  if(key==32)
  {
   bf=1;
  }
    if(key==97)
    {
    hero.left();
    d=1;
    }
    if(key==100)
    {
    hero.right();
    d=2;
    }
    if( (key==115 && d==2 )|| (key==115 &&d==1) )
    {
      // WEAPONS
       rain++;
       run=true;
       if(d==1)
      {
      hero.left();
      }
      if(d==2)
      {
      hero.right();
      d=2;
      }
    }

  //jack 
  if(key==115)
    {
  
       if(rain%8==0 && run==true){
       //console.log(rain);
       t=++t||1;
       jx[t]=new jack(t);
       }
       if(run==false)
       {t=++t||1;
       jx[t]=new jack(t);
       } 
       
    }
  });

window.addEventListener("keyup",function(){ d=3;});
var q;

////////////////////////// REDRAW **********************
nubomb=new nuke();
function redraw()
 { 
  
  if(nubomb){
 if(nubomb.radius>=500||nubomb.y>=2000 &&blaston==false)
 {
 blaston=false;
  isnuke=false;
 delete nubomb;
 nubomb=new nuke();
 }
}
   ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* ########################## */
  var bb=new Image(); 
  bb.src="images/black.png";
  ctx.drawImage(bb,0,0,500,471,0,0,500,500);
  /* ##########################*/
  /*  SCORING    */
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0,500,35);
  ctx.fillStyle = 'white';
  ctx.font = '12pt Calibri';
  ctx.fillText("Score:  "+disp,210,20);
  ctx.drawImage(imgc,10,2,30,30);
  ctx.fillText(" X "+candycount,40,20);
  ctx.beginPath();
  ctx.arc(420,17,10,0,2*Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(420,17,6,0,2*Math.PI);
  ctx.fillStyle = 'orange';
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = 'white';  
  ctx.fillText(" x "+ammo,430,20); 
  if(blaston==true)
 {nubomb.blast(100,500);
  }
 if(isnuke==true)
  {
  nubomb.drop();
  nubomb.draw();
  }
  if(bf==1)
  {
     if(ammo)
    { 
      bs=++bs||1; 
      gun[bs]=new bullet(); 
      bf=0;
      ammo--;
    }
    else
      {
       
     }
   }
   
   for(var g=1;g<=bs;g=g+1)
  { 
  gun[g].shoot();
  }
   
  ctx.beginPath();
      ctx.moveTo(0,hero.y+33);
      ctx.lineTo(canvas.width,hero.y+33);
      ctx.stroke();

  ///  Gun?  ////
  ctx.beginPath();
   ctx.moveTo(hero.x,hero.y+15);
    mag=(hero.x-mx)*(hero.x-mx)+(hero.y+15-my)*(hero.y+15-my);
    mag=Math.sqrt(mag);
    ctx.lineTo((30*mx+mag*hero.x)/(mag+30),(my*30+mag*(hero.y+15))/(mag+30));
    ctx.stroke();
  
  /////////////// 
  if (imageReady)
  {  
    //a.movefireball();
    if(d==1)
    {
    ctx.drawImage(img,(35*hero.frame)+95,32,30,35,hero.x,hero.y,35,35);
    }
    else if(d==2)
    {
    ctx.drawImage(img,(35*hero.frame)+95,64,30,35,hero.x,hero.y,35,35);
    }
    else if(d==3)
    {
      ctx.drawImage(img,35+95,0,30,35,hero.x,hero.y,35,35);
    }
  }
  ////////// Drawing+creating zombies  -- Ananth -- //////////////////
  
  var probability=Math.floor((Math.random()*20)+1);
  if(probability<(5+(disp/25)))
  {
    var temp=new zombie( Math.floor((Math.random()*450)+1),1);
    zombie_array.push(temp);
  }
  for(i=0;i<candy_array.length;i++)
  {
  if(candy_array[i]!=null)
  {
  ctx.drawImage(imgc,candy_array[i].ncx,candy_array[i].ncy,35,35);
  }
  }
 /* for(var i=0;i<zombie_array.length;i++)
  {
       zombie_array[i].update();
       zombie_array[i].draw();
       if(zombie_array[i].y<50)
       {
         zombie_array.splice(i,1);
       }
  }*/
  for(var i=0;i<zombie_array.length ;i++)
  { 
  var v=0;
  if(zombie_array[i].die != true ) 
  { if(zombie_array[i].x*zombie_array[i].x+zombie_array[i].y*zombie_array[i].y-nubomb.radius*nubomb.radius<0 && blaston==true)
 { zombie_array[i].die=true;}
  for(var t=1;t<=bs;t++)
  {
  if(Math.abs(zombie_array[i].x+7.5-gun[t].dx)<15 && Math.abs(zombie_array[i].y+7.5-gun[t].dy)<15)
    {
    v=1;
    zombie_array[i].die=true;
    disp=SCORE();
   //var ncandy=new candy(zombie_array[i].x,zombie_array[i].y);
   //candy_array.push(ncandy);
    break;
    }
  }
  if(v!=1)
  {
  zombie_array[i].update();
    zombie_array[i].draw();   
   }
  } 
    if(nubomb)
    if(Math.abs(zombie_array[i].x-nubomb.x)<25 &&Math.abs(zombie_array[i].y-nubomb.y)<25 && isnuke==true &&zombie_array[i].die!=true)
    blaston=true;
  }

  for(var q=1;q<jx.length;q=q+1) // Prinring jacks
  {
    if(jx[q].done==false){
    jx[q].draw();
    jx[q].fall();  }

   /* if(jx[q].y>500)
       {
         jx.splice(q,1);
       }   */  
  }
  //////////////////////// Check for contact (requires optimization) ////////

  for(var i=0;i<zombie_array.length;i++)
    {
      //console.log(zombie_array[i].y);
   for(var q=1;q<jx.length;q=q+1) 
      {
        if(jx[q].x >= zombie_array[i].x-24 && jx[q].x<= zombie_array[i].x+30 &&  jx[q].y>=zombie_array[i].y-24 && jx[q].y<zombie_array[i].y+26 &&jx[q].done==false && zombie_array[i].die==false )
        {
          zombie_array[i].die=true;
          var ncandy=new candy(zombie_array[i].x,zombie_array[i].y);
           candy_array.push(ncandy);
          jx[q].done=true;
          disp=SCORE();
          //alert(SCORE());
          jx[q].y=1600;
        }
    
    }
    
    //       GAME OVER ? //


    if( ( zombie_array[i].x<hero.x+30 && zombie_array[i].x>hero.x-15 ) && zombie_array[i].y<hero.y+30 && zombie_array[i].die==false)
    {

            //alert("Game OVER");
             ctx.fillStyle = 'black';
             ctx.fillRect(0, 0, canvas.width, canvas.height);
             ctx.font = '18pt Rockwell';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText("GAME OVER.",canvas.width/2 -80,canvas.height/2 -50);
            ctx.fillText("SCORE : "+disp,canvas.width/2 -80,canvas.height/2 );
            clearInterval(tt);

    }

  }
  ////////////////////////////////////////////////////////////////////

  if(weapon>0)
  {
  // axe was getting thrown too close from the body fixed that based on direction to be thrown
  if(weapon==1)
  {
    if(dir>0)
    {
   ctx.drawImage(image,82*hero.axe,440,76,100,hero.axe_x+5,hero.y,50,25);
      }
   else
      ctx.drawImage(image,82*hero.axe,440,76,100,hero.axe_x-15,hero.y,50,25);
   
   if(hero.axe<7)
        {
          hero.axe++;
          hero.axe_x+=20*dir;
        }
      else
      {
        hero.axe=0;
        hero.axe_x+=20*dir;
      }
      
    if(hero.axe_x>canvas.width)
        weapon=0;

  }
  }
          
  }
 function nukethem()
 {
  
  if(candycount>25 && Math.abs(mx-307)<52 && Math.abs(my-560)<23)
  {isnuke=true;
   candycount-=25;
  }
 else if( Math.abs(mx-307)<52 && Math.abs(my-560)<23)
 alert('u need 25 candies');
 }

 window.addEventListener("click",function(event){
  get(event);
  getcandy();
  getammo();
  nukethem();
  if(begin_game==false)
    ignite();
  
}); 

 
window.addEventListener("mousemove",function(event){
  get(event);

 
});
}());
function intro()
{
   var canv=document.getElementById("myCanvas");
   var cty=canv.getContext("2d");
   var bbb=new Image(); 
   bbb.src="images/info2.png";
   cty.drawImage(bbb,0,0,500,500,0,0,502,500);
}
