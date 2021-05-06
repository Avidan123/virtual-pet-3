//Create variables here
var dog,happyDog,database,foodS,foodStock
var feedDog,addFood,fedTime,lastFed,foodObj
var gameState,readState
var bedroom,garden,washroom
var sadDog
function preload()
{
	//load images here
  dog=loadImage("images/dogImg.png")
 happyDog=loadImage("images/dogImg1.png")
bedroom=loadImage("images/BedRoom.png")
garden=loadImage("images/Garden.png")
washroom=loadImage("images/WashRoom.png")
sadDog=loadImage("images/Lazy.png")
}

function setup() {
	createCanvas(1000,500);
  
  doggo=createSprite(800,200,50,50)
  doggo.addImage(dog)
  doggo.scale=0.2

  
  database=firebase.database()
 foodObj=new Food()

foodStock=database.ref('Food')
foodStock.on("value",readStock)

feed=createButton("Feed the dog")
feed.position(700,95)
feed.mousePressed(feedDog)

addFood=createButton("add food ")
addFood.position(800,95)
addFood.mousePressed(addFoods)

readState=database.ref('gameState')
readState.on("value",function(data){
gameState=data.val()
})
}


function draw() {  
background(46,136,87)
 
foodObj.display()
  
  fedTime=database.ref('feedTime')
  fedTime.on("value",function(data){
lastFed=data.val()
  })

  fill(255,255,254)
  textSize(15)
 /* if (lastFed>=12){
    text("lastFeed:"+lastFed%12+"PM",350,30)
  }
  else if( text("lastFeed:12 AM",350,30)){

  }
  else{
    text("lastFeed:"+lastFed+"AM",350,30)
  }*/

if(gameState!="hungry"){
  feed.hide()
  addFood.hide()
//doggo.remove()
}else{
  feed.show()
  addFood.show()
  doggo.addImage(sadDog)
}
currentTime=hour()
if(currentTime==lastFed+1){
  update("playing")
  foodObj.garden()
}
else if(currentTime==lastFed+2){
  update("sleeping")
  foodObj.bedroom()
}
else if(currentTime>lastFed+2 && currentTime<=(lastFed+4)){
  update("bathing")
  foodObj.washroom()
}
else{
  update("hungry")
  foodObj.display()
}

  drawSprites();


}


function readStock(data){
foodS=data.val()

}

/*function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })*/

function addFoods(){
foodS++
database.ref('/').update({
  Foood:foodS
})
}
function feedDog(){
doggo.addImage(happyDog)

foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  Foood:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}
