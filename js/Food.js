class Food{
constructor(){
    this.foodStock=20
    this.lastFed=10



this.image=loadImage("images/Milk.png")
}
display(){
var x=80 
var y =100

imageMode(CENTER)
image(this.image,720,220,70,70)

if (this.foodStock!=0){
//% gives us the remainder ,it is divisible by 
for(var i =0;i<this.foodStock;i++){
    if(i%10==0){
        x=80
        y=y+50
    }
    image(this.image,x,y,50,50)
    x=x+30
}

}

}
getFoodStock(){
return this.foodStock


}
updateFoodStock(foodStock){
this.foodStock=foodStock

}
deductFood(){
if(this.foodStock>0){
    this.foodStock=this.foodStock-1
}

}
bedroom(){
background(bedroom,550,500)

}
garden(){
    background(garden,550,500)
 
 } 
  washroom(){
background(washroom,550,500)
        
        }
}