

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

let cameraStream;
function openCamera(){
	closeFeedSelector();
	const video = document.getElementById('id_cameraPreview');

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
}

function stopCamera() {
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
    const video = document.getElementById('id_cameraPreview');
    const canvas = document.getElementById('id_imageCanvas');
    canvas.style.display = "block";
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;


    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    stopCamera();
    document.getElementById('id_camera_panel').style.display = "flex";
    // You can save the captured image or perform further processing here
    // For example: const imageData = canvas.toDataURL('image/png');
    const imageData = canvas.toDataURL('image/png');

    // Pass the image data to another function or perform further processing
    processImage(imageData);
}

function processImage(imageData) {
    // Implement your logic for processing the image data here
    console.log('Processing image:', imageData);
    // You can send the imageData to another function, API, etc.
}

async function loadModel() {
    const model = await tf.loadLayersModel('./assets/model/model.json');
    return model;
}

const model = await loadModel();

async function classifyImage() {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
        const imageTensor = tf.browser.fromPixels(imagePreview);
        const expandedDims = imageTensor.expandDims();

        const predictions = model.predict(expandedDims);
        const topPrediction = predictions.argMax(1).dataSync()[0];

        console.log('Top Prediction:', topPrediction);

        // Perform further actions based on the prediction
    };

    if (file) {
        reader.readAsDataURL(file);
        imagePreview.src = URL.createObjectURL(file);
    }
}