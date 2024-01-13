document.addEventListener("DOMContentLoaded", function() {
	function showPage(pageId) {
		document.querySelectorAll('.page').forEach(function (page) {
			page.style.display = 'none';
		});
		document.getElementById(pageId).style.display = 'block';
		if (pageId === "id_page_health"){
			initializeVitaminList();
		}
		if (pageId === "id_page_cookbook"){
			loadFilter();
			showAllRecipes();
		}
	}


	document.querySelectorAll('#navigation a').forEach(function (link) {
		link.addEventListener('click', function (event) {
			event.preventDefault();

		// Remove the 'active' class from all links
			document.querySelectorAll('.nav-link').forEach(function (navLink) {
				navLink.classList.remove('active');
			});

		// Add the 'active' class to the clicked link
			link.classList.add('active');

			var targetPageId = link.getAttribute('href').substring(1);
			showPage(targetPageId);
		});

		showPage("id_page_home");
	});
});