function back(){
    window.location="index.html";
}
function preload(){
    loadImage("medicine.jpg");
}
img="";
status="";
object=[];
function draw(){
image(img,0,0,640,420);
if (status !=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(img, gettheresults);
    for (i=0; i<object.length; i++){
        document.getElementById("status").innerHTML="Status: Object Detected";
        document.getElementById("noofobjdetect").innerHTML="No. of objects detected are: "+object.length;
        fill(r,g,b);
        percent=floor(object[i].confidence * 100);
        text(object[i].label+ " " +percent+ "%" ,object[i].x, object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }
}
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: detecting objects";
}
function modelLoaded(){
    console.log("The model has been loaded. Thank you for your patience:)");
    status=true;
    objectDetector.detect(img, gettheresults);
}
function gettheresults(error, results){
if (error) {
    console.error();(error);
}
else {
console.log(results);
object=results;
}
}