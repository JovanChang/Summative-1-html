const artsStats = document.getElementById('my_dataviz');

const artistsStats = document.getElementById('circular_barchart');

console.log(artistsStats);

console.log(artsStats);

const btn1 = document.getElementById('class_btn');

const btn2 = document.getElementById('nationality_btn');

btn1.onclick = function () {
  if (artsStats.style.display !== 'block') {
    artsStats.style.display = 'block';
  } else {
    artsStats.style.display = 'none';
  }
};

btn2.onclick = function () {
  if (artistsStats.style.display !== 'block') {
    artistsStats.style.display = 'block';
  } else {
    artistsStats.style.display = 'none';
  }
};
const reply = document.getElementById('contact_submit');
// const emailAddress = document.getElementById('exampleInputEmail1');
// const comments = document.getElementById('exampleInputComment');

reply.onclick = function () {
    window.alert('Thank you for leaving a message! You will be replied very soon');
};

// slideshow function from w3school: https://www.w3schools.com/howto/howto_js_slideshow.asp
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides (n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide (n) {
  showSlides(slideIndex = n);
}

function showSlides (n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('dot');
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}
