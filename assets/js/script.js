$(document).ready(function () {
	AOS.init();
	// open invitation
	$('.btn-open').click(function() {
		$('html').removeClass('invitation-closed');
		$('#invitation_cover').hide("slow", function() {
            // Animation complete.
        });
	  });
	// story-carousel
	if ($('.story-carousel').length) {
		$('.story-carousel').owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			dots: false,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			active: true,
			smartSpeed: 1000,
			autoplay: false,
			items: 1,
			navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
		});
	}
	// countdown
	// Set the date we're counting down to
	var countDownDate = new Date("February 3, 2025 15:00:00").getTime();

	// Update the count down every 1 second
	var x = setInterval(function () {

		// Get today's date and time
		var now = new Date().getTime();

		// Find the distance between now and the count down date
		var distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result in the element with id="demo"
		document.getElementById("wf-hari").innerHTML = days;
		document.getElementById("wf-jam").innerHTML = hours;
		document.getElementById("wf-menit").innerHTML = minutes;
		document.getElementById("wf-detik").innerHTML = seconds;

		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("demo").innerHTML = "EXPIRED";
		}
	}, 1000);

	// lightbox
	const imageGrid = document.querySelector(".image-grid");
	const links = imageGrid.querySelectorAll("a");
	const imgs = imageGrid.querySelectorAll("img");
	const lightboxModal = document.getElementById("lightbox-modal");
	const bsModal = new bootstrap.Modal(lightboxModal);
	const modalBody = document.querySelector(".modal-body .container-fluid");

	for (const link of links) {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const currentImg = link.querySelector("img");
			const lightboxCarousel = document.getElementById("lightboxCarousel");
			if (lightboxCarousel) {
				const parentCol = link.parentElement.parentElement;
				const index = [...parentCol.parentElement.children].indexOf(parentCol);
				const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
				bsCarousel.to(index);
			} else {
				createCarousel(currentImg);
			}
			bsModal.show();
		});
	}

	function createCarousel(img) {
		const markup = `
    <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="false">
      <div class="carousel-inner">
        ${createSlides(img)}
      </div> 
      <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
       <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `;

		modalBody.innerHTML = markup;
	}

	function createSlides(img) {
		let markup = "";
		const currentImgSrc = img.getAttribute("src");

		for (const img of imgs) {
			const imgSrc = img.getAttribute("src");
			const imgAlt = img.getAttribute("alt");
			const imgCaption = img.getAttribute("data-caption");

			markup += `
    <div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}">
      <img src=${imgSrc} alt=${imgAlt}>
      ${imgCaption ? createCaption(imgCaption) : ""}
    </div>
    `;
		}

		return markup;
	}

	function createCaption(caption) {
		return `<div class="carousel-caption">
     <p class="m-0">${caption}</p>
    </div>`;
	}
});