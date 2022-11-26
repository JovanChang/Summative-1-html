const Arts_Stats = document.getElementById("artworks_stats")

const btn = document.getElementById("press")

btn.onclick = function () {
   if (Arts_Stats.style.display !== "none") {
    Arts_Stats.style.display = "none";
   } else {
    Arts_Stats.style.display = "block"
   }
  };

const reply = document.getElementById("contact_submit")

reply.onclick = function () {
  window.alert("Thank you for leaving a message! You will be replied very soon")
};

//slideshow function from w3school: https://www.w3schools.com/howto/howto_js_slideshow.asp
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}