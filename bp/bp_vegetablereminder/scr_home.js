

function closeFeedSelector(){
	var feedSelectorEl = document.getElementById('id_feed_selector');
	feedSelectorEl.style.display = 'none';
}
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('id_home_button_feed').addEventListener('click', toggleFeedSelector);
})
function toggleFeedSelector() {
	var creditsElement = document.getElementById('id_feed_selector');
	if (creditsElement.style.display === 'none' || creditsElement.style.display === '') {
		creditsElement.style.display = 'flex';
	} else {
		creditsElement.style.display = 'none';
	}
}

function avatar_interact(){
	const soundMeow = new Audio("./assets/snd_meow.mp3");
	soundMeow.play();
}

function updateMainProgressbar(){

	let prg = getAvgVit();
	console.log("pbar updated %"+prg)
	document.getElementById('id_pbar_health').style.width = `${prg}%`;
}

function gotoList(){
	closeFeedSelector();
	showPage('id_page_cookbook');
}

let cameraActive = false;
let cameraStream;
function openCamera(){
	closeFeedSelector();
	const video = document.getElementById('id_cameraPreview');
	cameraActive = true;

	navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraStream = stream;
            video.srcObject = stream;
            video.play();
            video.style.display = 'block';
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
        });

	video.style.display = 'block';
	document.getElementById('id_camera_panel').style.display = "flex";
	document.getElementById('id_stop_camera').style.display = "block";
	document.getElementById('id_cameraPreview').style.display = 'block';
	document.getElementById('id_take_image').style.display = "block";

	takeFrames();
	console.log("camera active: ",cameraActive);
}

function stopCamera() {
	cameraActive = false;
    if (cameraStream) {
        const tracks = cameraStream.getTracks();
        tracks.forEach(track => track.stop());
        document.getElementById('id_camera_panel').style.display = "none";
        document.getElementById('id_cameraPreview').style.display = 'none';
     	document.getElementById('id_stop_camera').style.display = "none";
		document.getElementById('id_take_image').style.display = "none";
    }
}

function takeImage() {
    if (cameraActive) {
        getFrame().then((imageData) => {
            processImage(imageData)
            
            let veggie = globalveggie;
            if (veggie === "Tomato") {
                console.log("Fed Tomato");
                updateVitamin("A",50)
            }
            else if (veggie === "Cucumber") {
                console.log("Fed Tomato");
                updateVitamin("C",50)
            }
            stopCamera();

            });
    }
}

function takeFrames() {
    if (cameraActive) {
        getFrame().then((imageData) => {
            // Perform further processing with the image data
            processImage(imageData);
            
            // Schedule the next frame after 3 seconds
            setTimeout(takeFrames, 3000);
        });
    }
}
function getFrame(){
	const video = document.getElementById('id_cameraPreview');
    const canvas = document.createElement('canvas'); // Create a temporary canvas
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // You can save the captured image or perform further processing here
    // For example: const imageData = canvas.toDataURL('image/png');
    const imageData = canvas.toDataURL('image/png');

    // Return the image data as a promise
    return Promise.resolve(imageData);
}

let globalveggie = "Unknown";
function processImage(imageData) {
    // Create an Image object to load the captured image
    const img = new Image();

    // Set the source of the Image object to the captured image data
    img.src = imageData;

    // Once the image is loaded, perform processing
    img.onload = function() {
        // Create a canvas for cropping
        const cropCanvas = document.createElement('canvas');
        const cropContext = cropCanvas.getContext('2d');

        // Set the dimensions of the crop canvas
        cropCanvas.width = 100; // Adjust the desired width
        cropCanvas.height = 100; // Adjust the desired height

        // Calculate the coordinates for center cropping
        const centerX = (img.width - cropCanvas.width) / 2;
        const centerY = (img.height - cropCanvas.height) / 2;

        // Draw the cropped image onto the crop canvas
        cropContext.drawImage(img, centerX, centerY, cropCanvas.width, cropCanvas.height, 0, 0, cropCanvas.width, cropCanvas.height);

        // Get the image data of the cropped canvas
        const croppedImageData = cropCanvas.toDataURL('image/png');

        // Analyze the main color of the cropped image
        const analyzedColor = analyzeColor(cropCanvas);

        // Log the analyzed color

        const detectedVegetable = detectVegetable(analyzedColor);
        globalveggie = detectedVegetable;

        console.log('Main Color:', analyzedColor);
        document.getElementById('id_detected_label').innerText = `r: ${analyzedColor.red} b: ${analyzedColor.blue} g: ${analyzedColor.green}\n${detectedVegetable}`
    	document.getElementById('id_detected_label').style.color = `rgb(${analyzedColor.red},${analyzedColor.green},${analyzedColor.blue})`
        let rv = analyzedColor.red;
        let gv = analyzedColor.green;
        let bv = analyzedColor.blue;
        let res = [rv,gv,bv]
        // console.log(res);
        updateObjectBorder();
        return res;
    };
}

// Function to analyze the main color of an image
function analyzeColor(canvas) {
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    // Initialize counters for each RGB channel
    let redSum = 0;
    let greenSum = 0;
    let blueSum = 0;

    // Iterate through the image data to calculate channel sums
    for (let i = 0; i < imageData.length; i += 4) {
        redSum += imageData[i];
        greenSum += imageData[i + 1];
        blueSum += imageData[i + 2];
    }

    // Calculate average RGB values
    const redAvg = redSum / (canvas.width * canvas.height);
    const greenAvg = greenSum / (canvas.width * canvas.height);
    const blueAvg = blueSum / (canvas.width * canvas.height);

    // Return the analyzed color as an object
    return { red: redAvg, green: greenAvg, blue: blueAvg };
}

function detectVegetable(colors){
    red = colors.red;
    green = colors.green;
    blue = colors.blue;
    if (red >= 150 && green <=150) {
        return "Tomato";
    }
    else if ( green >=150) {
        return "Cucumber";
    }
    return "Unknown";
}


function updateObjectBorder(){
    const borderobj = document.getElementById('id_object_border');
    if (globalveggie != 'Unknown') {
        borderobj.style.display = 'block';
        const randomTop = Math.floor(Math.random() * (37 - 33 + 1)) + 33 + 'vh';
        const randomLeft = Math.floor(Math.random() * (37 - 33 + 1)) + 33 + 'vw';

        // Apply the random positions to the element
        borderobj.style.bottom = randomTop;
        borderobj.style.left = randomLeft;
    }
    else{
        borderobj.style.display = 'none';
    }

}