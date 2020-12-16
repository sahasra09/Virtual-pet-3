var database ,dog,dog1,dog2
var position
var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
var gameState="g";
var texti=20;
var home;
var feedTime;
var hrTime;
hrTime=0;
feedTime=0;
var bg;
var bgImg;
var garden;
var bathroom;
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
  bg=loadImage("images/dig.jpg");
  garden=loadImage("garden.jpg");
  bathroom=loadImage("Bathroom.jpg")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
//  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
  
 

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
feed = createButton("FEED DRAGO")
feed.position(500,15)

add = createButton("ADD FOOD")
///add.color("yellow")
add.position(400,15)
add.mousePressed(AddFood)
  feed.mousePressed(()=>{
    FeedDog()
    
    feedTime=minute();
    hrTime=hour();
  }
  )

  home=new Game();
  home.hey();
} 



function draw(){
  background(46,139,87);

  
 foodobject.display();
 
 fill("black")
 text("Last fed:"+hrTime+":"+feedTime,600,200,300,20);
  

  fill(255,255,254);
 textSize(15);
 if(hrTime+1===hour()){
  dog.visible=false;
  add.hide();
  feed.hide();
  foodobject.visible=false;
  image(bg,500,250,1000,500)
}
  else{
    dog.visible=true;
    feed.show();
    add.show();

  }
   
  if(hrTime+2===hour()){
    dog.visible=false;
    add.hide();
    feed.hide();
    foodobject.visible=false;
    image(garden,500,250,1000,500)
  }
    else{
      dog.visible=true;
      feed.show();
      add.show();
  
    }
    if(hrTime+3===hour()){
      dog.visible=false;
      add.hide();
      feed.hide();
      foodobject.visible=false;
      image(bathroom,500,250,1000,500)
    }
      else{
        dog.visible=true;
        feed.show();
        add.show();
    
      }
 //tieme();
   drawSprites();

}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
 
  
}

function showError(){
  console.log("Error in writing to the database");
}


function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
//function tieme(){
 
//}
function FeedDog(){

//dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock()
  
   
 })
 
}
