// Sample data for vitamins and their progress values (0 to 100)

const vitaminsData = [
    { name: 'A', progress: 75, benefit: 'Improves vision', defEff: 'Night blindness', sources: 'Carrots, Sweet potatoes' },
    { name: 'B1', progress: 50, benefit: 'Aids in energy metabolism', defEff: 'Beriberi', sources: 'Whole grains, Legumes' },
    { name: 'B2', progress: 55, benefit: 'Supports growth and red blood cell production', defEff: 'Ariboflavinosis', sources: 'Dairy products, Leafy greens' },
    { name: 'B3', progress: 45, benefit: 'Lowers cholesterol levels', defEff: 'Pellagra', sources: 'Meat, Nuts' },
    { name: 'B5', progress: 60, benefit: 'Helps convert food into energy', defEff: 'Hypoglycemia', sources: 'Avocado, Chicken' },
    { name: 'B6', progress: 35, benefit: 'Supports brain development and function', defEff: 'Anemia, neurological symptoms', sources: 'Bananas, Potatoes' },
    { name: 'B7', progress: 55, benefit: 'Promotes healthy skin, hair, and nails', defEff: 'Dermatitis, hair loss', sources: 'Eggs, Nuts' },
    { name: 'B9', progress: 45, benefit: 'Important for cell division and DNA synthesis', defEff: 'Neural tube defects in unborn babies', sources: 'Leafy greens, Citrus fruits' },
    { name: 'B12', progress: 70, benefit: 'Supports nerve function and the production of DNA and red blood cells', defEff: 'Pernicious anemia', sources: 'Meat, Dairy products' },
    { name: 'C', progress: 60, benefit: 'Boosts the immune system and aids in collagen production', defEff: 'Scurvy', sources: 'Citrus fruits, Strawberries' },
    { name: 'D', progress: 30, benefit: 'Helps the body absorb calcium', defEff: 'Rickets, osteomalacia', sources: 'Sunlight, Fatty fish' },
    { name: 'E', progress: 20, benefit: 'Acts as an antioxidant', defEff: 'Rare, may lead to nerve and muscle damage', sources: 'Nuts, Seeds' },
    { name: 'K', progress: 55, benefit: 'Aids in blood clotting and bone health', defEff: 'Hemorrhage, osteoporosis', sources: 'Leafy greens, Fish' },
];


function getAvgVit(){
	let allPrg = 0;
	const vitCount = 13;
	vitaminsData.forEach((vitamin) => {
		allPrg += vitamin.progress;
	});
	let res = Math.round(allPrg/vitCount)
	return res;
}

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
	updateMainProgressbar();
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
		updateVitamin(vitamin.name,-value)
	});
}

function pastTime(hours){
	console.log("Time passed: "+hours)
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

function show_vit_desc(target) {
	const vit = vitaminsData.find(vitamin => vitamin.name === target);
	document.querySelector('#id_vit_desc_border').style.display = 'block';
	document.querySelector('#id_vit_desc').innerText = `Common Vitamin ${target} Sources:\n`+vit.sources;
	document.querySelector('#id_vit_read_more').setAttribute('onclick',`readMoreVit('${target}')`)
}

function readMoreVit(target){
	console.log("Read more about: "+target);
	close_vit_desc();
	document.querySelector('#id_detail_vit').style.display = 'block';

	const vit = vitaminsData.find(vitamin => vitamin.name === target);
	document.querySelector('#id_vit_title').innerText = "Vitamin "+vit.name;

	document.querySelector('#id_vit_benefits').innerText = vit.benefit;

	document.querySelector('#id_vit_def').innerText = vit.defEff;
	document.querySelector('#id_vit_src').innerText =  vit.sources;

	document.querySelector('#id_vit_show_recipes').setAttribute('onclick',`goToCookbook('${vit.name}')`);
}

function readMoreVitClose(){
	document.querySelector('#id_detail_vit').style.display = 'none';
}

function goToCookbook(vit){
	readMoreVitClose();
	showPage('id_page_cookbook');
	loadFilter(vit);
}