var prediction_1;
var prediction_2;

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});
var camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+ '"/>';
    });
}

console.log("ml5 version - ", ml5.version);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FroqgQVLK/model.json', modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        //document.getElementById("result_emotion_name").innerHTML = results[0].label;
    }
}
