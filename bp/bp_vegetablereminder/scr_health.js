// Sample data for vitamins and their progress values (0 to 100)

const vitaminsData = [
   { name: 'Vitamin A', progress: 75 },
   { name: 'Vitamin B', progress: 50 },
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
   listItem.textContent = `${vitamin.name} `;
   listItem.appendChild(createProgressBar(vitamin.progress));
   return listItem;
}

// Function to initialize the vitamin list
function initializeVitaminList() {
   const vitaminListContainer = document.getElementById('id_page_health');
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