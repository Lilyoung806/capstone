let mainCanvas;
let circlearray = [];
let display_size = 800;
let width = display_size;
let height = display_size;
let outer_radius = display_size/2;
let middle = [width/2, height/2];
let max_iterations = 10000;
let further_iterations =  10000;

let min_radius = 4;
let max_radius = 8;
let x = 0;
let y = 0;
let pixelval = 0;

let biggest_possible_radius;
let distance_to_origin;
let color;
let background_color;

let Matrix = [];
let test_answers = [];
let test_inputs = [];
let test_results = [];
let test_num = 0;

let random_val;



function newDrawloop() {
    background_color = "#FFFFFF";
    density = 1000;
    radiusscaling = 1;

    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);
    
    for (let i=0; i<(density * circlearray.length/1000); i++) {
        let thing = circlearray[i];
        thing.drawCircle(ctx,radiusscaling);
    }

    mirrorCanvasToImage();
}



function moreCircles() { // appends onto existing circlearray and Matrix
    calculateCircles(further_iterations);
    assignColors();
}



function redrawCircles() { // creates a new circlearray and Matrix
    min_radiustemp = "2";
    max_radiustemp = "10";
    min_radius = Math.min(min_radiustemp,max_radiustemp);
    max_radius = Math.max(min_radiustemp,max_radiustemp);

    Matrix = [];
    circlearray = [];

    for (let i = 0; i < (Math.floor(width/(max_radius)) + 2); i++) {
        Matrix[i] = [];

        for (let j = 0; j < (Math.floor(height/(max_radius)) + 2); j++) {
            Matrix[i][j] = new Set();
        }
    }
    
    customImage();
    calculateCircles(max_iterations);
    assignColors();
    moreCircles()
}



function calculateCircles(iterations){
    const circleWorker = new Worker('./color_draw_worker.js');

    doCrop = "on";

    circleWorker.postMessage([circlearray,Matrix, iterations,doCrop, min_radius, max_radius, width, height, outer_radius, middle])
    circleWorker.onmessage = (e) => {

        circlearray = e.data[0];

        for (let i = 0; i < circlearray.length;i++ ){
            circlearray[i] = new myCircle(circlearray[i].x, circlearray[i].y, circlearray[i].radius);
        }
        
        Matrix = e.data[1];

        assignColors();
    }
}



function customImage(){
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(99);
    random_val = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);

    test_answers[test_num] = random_val;

    let canvas = document.getElementById("referenceCanvas");
    canvas.width = width;
    canvas.height = height;

    let ctx = canvas.getContext('2d', { willReadFrequently: true });
    let number = random_val; //랜덤 숫자
    
    ctx.textAlign= "center";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white"
    
    ctx.font = "300px Arial";
    ctx.fillText(number, width/2, 500);
    
    assignColors();
}



function assignColors(){
    let canvas = document.getElementById("referenceCanvas");
    let ctx = canvas.getContext("2d",{ willReadFrequently: true });
    let pixel;
    
    let scalingx = (canvas.width/width);
    let scalingy = (canvas.height/height);

    let firstcolor;
    let secondcolor;

    if (test_num == 0) {
        firstcolor = hexToRgb("#746745");
        secondcolor = hexToRgb("#a60107");
    }

    else if (test_num == 1) {
        firstcolor = hexToRgb("#2e6930");
        secondcolor = hexToRgb("#f86d08");
    }

    else if (test_num == 2) {
        firstcolor = hexToRgb("#4d2b80");
        secondcolor = hexToRgb("#559e9d");
    }

    let newX, newY;

    for (selectedCircle of circlearray) {
        newX = Math.floor(selectedCircle.x * scalingx);
        newY = Math.floor(selectedCircle.y * scalingy);
        
        pixel = ctx.getImageData(newX,newY,1,1).data;

        if (pixel[0] + pixel[1] + pixel[2] <= 30) {
            selectedCircle.isBlack = true;
            selectedCircle.color = firstcolor.slice();
            selectedCircle.changedColor = firstcolor.slice();
        }

        else {
            selectedCircle.isBlack = false;
            selectedCircle.color = secondcolor.slice();
            selectedCircle.changedColor = secondcolor.slice();
        }
    }

    apply_shifts();
}



function apply_shifts(){
    colorshift_intervall = 5;
    brightness_range = 0;
    gradient_range = 0.25;

    if (test_num == 0) {
        fcolor = hexToRgb("#746745");
        scolor = hexToRgb("#a60107");
    }

    else if (test_num == 1) {
        fcolor = hexToRgb("#2e6930");
        scolor = hexToRgb("#f86d08");
    }

    else if (test_num == 2) {
        fcolor = hexToRgb("#4d2b80");
        scolor = hexToRgb("#559e9d");
    }
    
    for (selectedCircle of circlearray){
        selectedCircle.changedColor = selectedCircle.color.slice();

        gradientshift(selectedCircle,gradient_range,fcolor,scolor);
        colorschwift(selectedCircle,colorshift_intervall);
        lightshift(selectedCircle,brightness_range);
    }

    newDrawloop();
}



function myShuffle(array) {
    array.sort(() => Math.random() - 0.5);
}



// helper function for handling color inputs
function hexToRgb(h) {
    return['0x'+h[1]+h[2]|0,'0x'+h[3]+h[4]|0,'0x'+h[5]+h[6]|0]
}


function mirrorCanvasToImage() {
    document.getElementById('target').src = displayCanvas.toDataURL();
}



let displayCanvas = document.getElementById("displayCanvas");
mirrorCanvasToImage();
displayCanvas.width = width;
displayCanvas.height = height;
let ctx = displayCanvas.getContext("2d", { willReadFrequently: true })

let buffer
let bufferCanvas = document.getElementById("bufferCanvas");
bufferCanvas.width = width;
bufferCanvas.height = height;
let bufferctx = bufferCanvas.getContext("2d", { willReadFrequently: true });



for (let i = 0; i < (Math.floor(width/(max_radius)) + 2); i++) {
    Matrix[i] = []

    for (let j = 0; j < (Math.floor(height/(max_radius)) + 2); j++) {
        Matrix[i][j] = new Set();
    }
}



function test_collect() {
    if (test_num < 2) {
        test_inputs[test_num] = document.getElementById("test_input").value;
        test_num += 1;
        reset_input = document.getElementById("test_input");
        reset_input.value = "";
        redrawCircles();
    }

    else if (test_num == 2) {
        test_inputs[test_num] = document.getElementById("test_input").value;
        test_num += 1;
        reset_input = document.getElementById("test_input");
        reset_input.value = "";
        test_result();
    }

    else {
        test_result();
    }
}



function test_result() {

    document.getElementById("test_zone").style.display = 'none';
    document.getElementById("test_result").style.display = 'block';

    for (let i = 0; i < 3; i++) {
        if(test_answers[i] != test_inputs[i]) {
            if (i == 0) {
                document.getElementById("red_result").innerText = '적색약 : 의심됨';
                document.getElementById("suggest").innerText = '가까운 안과에 방문하여 진단 받는 것을 권장합니다.';
            }
            
            if (i == 1) {
                document.getElementById("green_result").innerText = '녹색약 : 의심됨';
                document.getElementById("suggest").innerText = '가까운 안과에 방문하여 진단 받는 것을 권장합니다.';
            }
            
            if (i == 2) {
                document.getElementById("blue_result").innerText = '청색약 : 의심됨';
                document.getElementById("suggest").innerText = '가까운 안과에 방문하여 진단 받는 것을 권장합니다.';
            }
        }

        else {
            if (i == 0) {
                document.getElementById("red_result").innerText = '적색약 : 정상';
            }
            
            if (i == 1) {
                document.getElementById("green_result").innerText = '녹색약 : 정상';
            }
            
            if (i == 2) {
                document.getElementById("blue_result").innerText = '청색약 : 정상';
            }
        }
    }
}



function test_reset() {
    test_answers = [];
    test_inputs = [];
    test_results = [];
    test_num = 0;

    document.getElementById("suggest").innerText = '' 

    document.getElementById("test_zone").style.display = 'block';
    document.getElementById("test_result").style.display = 'none';

    redrawCircles();
}