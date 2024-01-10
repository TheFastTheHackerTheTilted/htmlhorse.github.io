// Sample data for vitamins and their progress values (0 to 100)

const vitaminsData = [
	{ name: 'A', progress: 75 },
	{ name: 'B1', progress: 50 },
	{ name: 'B2', progress: 55 },
	{ name: 'B3', progress: 45 },
	{ name: 'B5', progress: 60 },
	{ name: 'B6', progress: 35 },
	{ name: 'B7', progress: 55 },
	{ name: 'B9', progress: 45 },
	{ name: 'B12', progress: 70 },
	{ name: 'C', progress: 60 },
	{ name: 'D', progress: 30 },
	{ name: 'E', progress: 20 },
	{ name: 'K', progress: 55 },
	// Add more vitamins as needed
	];

// Function to create a progress bar element
function createProgressBar(progress, limit) {
	const progressBarContainer = document.createElement('div');
	progressBarContainer.classList.add('progress-bar-container');

	// Create a background element
	const progressBarBackground = document.createElement('div');
	progressBarBackground.classList.add('progress-bar-background');

	// Create the progress bar
	const progressBar = document.createElement('div');
	progressBar.classList.add('progress-bar');
	progressBar.style.width = `${progress}%`;

	// Append the progress bar to the background, and the background to the container
	progressBarBackground.appendChild(progressBar);
	progressBarContainer.appendChild(progressBarBackground);

	return progressBarContainer;
}

// Function to create a list item with vitamin name and progress bar
function createVitaminListItem(vitamin) {
	const listItem = document.createElement('li');
	listItem.classList.add("cl_vitamin_bar");
	listItem.innerHTML = `<span>${vitamin.name}</span> `;
	listItem.appendChild(createProgressBar(vitamin.progress));
	return listItem;
}

// Function to initialize the vitamin list
function initializeVitaminList() {
	const vitaminListContainer = document.getElementById('id_vits');
	vitaminListContainer.innerHTML = "";

	// Create a list element
	const vitaminList = document.createElement('ul');
	vitaminList.setAttribute('id','id_vits_table');

	// Add each vitamin to the list
	vitaminsData.forEach((vitamin) => {
		const listItem = createVitaminListItem(vitamin);
		vitaminList.appendChild(listItem);
	});

	// Append the list to the container
	vitaminListContainer.appendChild(vitaminList);
	clickable_vits();
}

function updateVitamin(name,change){
	const vitamin = vitaminsData.find(vitamin => vitamin.name === name);
	if (vitamin) {
		vitamin.progress = Math.max(0, Math.min(100, vitamin.progress+change));
	} else {
		console.error(`Vitamin ${vitaminName} not found.`);
	}
	initializeVitaminList();
}

function reduceAllVitamins(value) {
	vitaminsData.forEach(vitamin => {
		vitamin.progress = Math.max(0, vitamin.progress - value);
	});
}

function pastTime(hours){
	reduceAllVitamins(hours);
}


function clickable_vits(){
	document.querySelectorAll('.cl_vitamin_bar').forEach(function (link) {
		link.addEventListener('click', function (event) {
			event.preventDefault();


			document.querySelectorAll('.cl_vitamin_bar').forEach(function (navLink) {
				navLink.classList.remove('active-vit');
			});


			link.classList.add('active-vit');

			var targetVit = link.querySelector('span').textContent;
			console.log("description about: "+targetVit);
			show_vit_desc(targetVit);

		});
	});
}


function close_vit_desc() {
	document.querySelector('#id_vit_desc_border').style.display = 'none';
	document.querySelectorAll('.cl_vitamin_bar').forEach(function (navLink) {
				navLink.classList.remove('active-vit');
			});
}

function show_vit_desc() {
	document.querySelector('#id_vit_desc_border').style.display = 'block';
}

function show_vit_desc(vit) {
	document.querySelector('#id_vit_desc_border').style.display = 'block';
	document.querySelector('#id_vit_desc').innerText = "Description of vitamin "+vit
}
