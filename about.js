// Script for partner logos carousel
document.addEventListener("DOMContentLoaded", function() {
  const partners = [
    { src: "images/partner1.png", alt: "Partner 1" },
    { src: "images/partner2.png", alt: "Partner 2" },
    { src: "images/partner3.png", alt: "Partner 3" },
    { src: "images/partner4.png", alt: "Partner 4" },
    { src: "images/partner5.png", alt: "Partner 5" }
    // Add more partners here
  ];

  const partnersTrack = document.getElementById("partnersTrack");
  if (partnersTrack) {
    // Duplicate the logos for seamless looping
    const allPartners = partners.concat(partners);
    allPartners.forEach(partner => {
      const img = document.createElement("img");
      img.src = partner.src;
      img.alt = partner.alt;
      partnersTrack.appendChild(img);
    });
  }
});
