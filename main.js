status = "";
objects=[];
function preload() {
}
function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectname = document.getElementById("objectname").value
}
function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("numberofobjects").innerHTML = "Number of objects detected are: " + objects.length;
            fill(255,0,0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if (objects[i].label == objectname) {
            objectDetector.detect(gotResults);
            video.stop();
            var synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(objectname + " has been found");
            synth.speak(utterThis);
            document.getElementById("status").innerHTML = objectname + " has been found";
        }
    }
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
function modelLoaded() {
    console.log("model is loaded");
    status = true;
}