//187 //MACHINE GALLERY SCRIPT
(function() {
const videoData = {
  "Production Machinery": [
    { src: "WhatsApp Video 2025-06-04 at 11.50.30_b9a2c72f.mp4", desc: "🌄 Sunrise Campfire Breakfast Juicy Burger Cookout" },
    { src: "WhatsApp Video 2025-06-04 at 11.50.30_3f975cc3.mp4", desc: "🍔 Juicy Burger Cookout" },
    { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "🌮 Street Taco Fiesta" }
  ],
  "Agricultural Machinery": [
    { src: "WhatsApp Video 2025-06-04 at 11.50.30_b9a2c72f.mp4", desc: "🌅 Field Machine Sunrise" },
    { src: "WhatsApp Video 2025-06-04 at 11.50.30_3f975cc3.mp4", desc: "🌾 Harvester at Work" }
  ]
};

let sectionCount = 1;

Object.entries(videoData).forEach(([title, videos,i]) => {
  const section = document.createElement("section");
  section.className = "Carousel_No" + sectionCount++;
   if (i === 0) section.id = "carousel-section"; // top section container
  if (title === "Production Machinery") section.id = "production-machines";
  if (title === "Agricultural Machinery") section.id = "agricultural-machines";

  const header = document.createElement("h2");
  header.className = "carousel_headers";
  header.textContent = title;
  header.style.color = "rgb(165, 237, 20)";
  header.style.backgroundColor = "transparent";

  const wrapper = document.createElement("div");
  wrapper.className = "carousel-wrapper";
  const leftBtn = document.createElement("button");
  leftBtn.className = "arrow-btn arrow-left";
  leftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  const rightBtn = document.createElement("button");
  rightBtn.className = "arrow-btn arrow-right";
  rightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

  const carousel = document.createElement("div");
  carousel.className = "carousel";
  const track = document.createElement("div");
  track.className = "carousel-track";

  const realSlides = [];
  const allSlides = [];

  function createSlide(src, desc) {
    const slideContainer = document.createElement("div");
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    const video = document.createElement("video");
    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.loop = false;
    video.controls = true;

    const orderBtn = document.createElement("a");
    orderBtn.href = "contacts.html";
    orderBtn.className = "order-btn";
    orderBtn.textContent = "Order Now";

    const replayBtn = document.createElement("button");
    replayBtn.className = "replay-btn";
    replayBtn.innerHTML = '<i class="fas fa-rotate-right"></i>';
    replayBtn.onclick = () => {
      video.currentTime = 0;
      video.play();
      slide.classList.remove("ended");
    };

    video.addEventListener("ended", () => slide.classList.add("ended"));
    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        slide.classList.remove("ended");
      } else {
        video.pause();
      }
    });

    const descDiv = document.createElement("div");
    descDiv.className = "description-outside";
    descDiv.textContent = desc;

    slide.append(video, orderBtn, replayBtn);
    slideContainer.append(slide, descDiv);
    return { slideContainer, slide };
  }

  // Clone last → beginning
  const firstClone = createSlide(videos[0].src, videos[0].desc);
  track.appendChild(firstClone.slideContainer);
  allSlides.push(firstClone.slide);

  videos.forEach(({ src, desc }) => {
    const { slideContainer, slide } = createSlide(src, desc);
    track.appendChild(slideContainer);
    realSlides.push(slide);
    allSlides.push(slide);
  });

  // Clone first → end
  const lastClone = createSlide(videos[videos.length - 1].src, videos[videos.length - 1].desc);
  track.appendChild(lastClone.slideContainer);
  allSlides.push(lastClone.slide);

  let index = 1; // start from first real slide (after clone)

  function updateFocus(instant = false) {
    allSlides.forEach((slide, i) => {
      const vid = slide.querySelector("video");
      slide.classList.toggle("focused", i === index);
      if (i === index && wrapper.matches(':hover')) {
        vid.play();
      } else {
        vid.pause();
      }
    });

    const shift = (wrapper.clientWidth / 2) - 135 - index * (realSlides[0].offsetWidth + 20);
    track.style.transition = instant ? "none" : "transform 0.5s ease";
    track.style.transform = `translateX(${shift}px)`;
  }

  function jumpToRealSlide() {
    if (index === 0) {
      index = realSlides.length;
      updateFocus(true);
    } else if (index === realSlides.length + 1) {
      index = 1;
      updateFocus(true);
    }
  }

  track.addEventListener("transitionend", jumpToRealSlide);

  leftBtn.onclick = () => {
    if (index <= 0) return;
    index--;
    updateFocus();
  };

  rightBtn.onclick = () => {
    if (index >= allSlides.length - 1) return;
    index++;
    updateFocus();
  };

  let startX = 0;
  wrapper.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  wrapper.addEventListener("touchend", e => {
    const deltaX = e.changedTouches[0].clientX - startX;
    if (deltaX > 50) leftBtn.click();
    else if (deltaX < -50) rightBtn.click();
  });

  let hovered = false;
  wrapper.addEventListener("mouseenter", () => { hovered = true; updateFocus(); });
  wrapper.addEventListener("mouseleave", () => { hovered = false; updateFocus(); });

  document.addEventListener("keydown", e => {
    if (!hovered) return;
    if (e.code === "ArrowLeft") leftBtn.click();
    else if (e.code === "ArrowRight") rightBtn.click();
    else if (e.code === "Space") {
      const vid = allSlides[index].querySelector("video");
      if (vid.paused) {
        vid.play();
        allSlides[index].classList.remove("ended");
      } else {
        vid.pause();
      }
      e.preventDefault();
    }
  });

  carousel.appendChild(track);
  wrapper.append(leftBtn, carousel, rightBtn);
  section.append(header, wrapper);
  const container = document.getElementById("carousel-container");
container.appendChild(section);
  updateFocus(true); // initialize without animation
});

})();

//MACHINE GALLERY SCRIPT
(function() {
const galleryData = {
  "Agricultural Machines": {
     "clearing": {
        videos: [
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Tractor tilling land A" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Modern tractor features B" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Tractor in field C" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Tractor tilling land D" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Modern tractor features E" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Tractor in field F" }
        ],
        images: [
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor model A" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor model B" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor working" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor model d" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor model e" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor working f" }
        ]
      },
    "harvesting": {
        videos: [
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Tractor tilling land" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Modern tractor features" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Tractor in field" }
        ],
        images: [
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor model A" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor model B" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor working" }
        ]
      }
  },
  "Production Machines": {
     "woodwork": {
        videos: [
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Tractor tilling land" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Modern tractor features" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Tractor in field" }
        ],
        images: [
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor model A" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor model B" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor working" }
        ]
      },
    "harvesting": {
        videos: [
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Tractor tilling land" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Modern tractor features" },
          { src: "WhatsApp Video 2025-06-04 at 11.50.15_83d5e660.mp4", desc: "Tractor in field" }
        ],
        images: [
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor model A" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor model B" },
          { src: "360_F_205876015_hYYs7ugqoU8QAobSS3TbnGQ92qyS5gEc.jpg", desc: "Tractor working" }
        ]
      }
  }
};

function createMainAlbums(data) {
  const container = document.getElementById("gallery");
  Object.entries(data).forEach(([mainTitle, subAlbums], mainIdx) => {
    const mainDiv = document.createElement("div");
    mainDiv.className = "main-album";

    const title = document.createElement("h2");
    title.textContent = mainTitle;

    const viewBtn = document.createElement("button");
    viewBtn.textContent = "View More";
    viewBtn.className = "view-more";

    const subTabContainer = document.createElement("div");
    subTabContainer.className = "sub-tabs";

    const subContentWrapper = document.createElement("div");

    // ...existing code...
viewBtn.addEventListener("click", () => {
  subTabContainer.innerHTML = "";
  subContentWrapper.innerHTML = "";
  Object.entries(subAlbums).forEach(([subTitle, media], subIdx) => {
    const tabBtn = document.createElement("button");
    tabBtn.textContent = subTitle;
    // Generate a unique ID for each tab
    tabBtn.id = `tab-${mainTitle.replace(/\s+/g, '-')}-${subTitle.replace(/\s+/g, '-')}-${subIdx}`;
    if (subIdx === 0) tabBtn.classList.add("active");
    subTabContainer.appendChild(tabBtn);

    const subContent = document.createElement("div");
    subContent.className = "sub-album-content";
    // Also give the content a unique id if needed
    subContent.id = `content-${mainTitle.replace(/\s+/g, '-')}-${subTitle.replace(/\s+/g, '-')}-${subIdx}`;
    if (subIdx === 0) subContent.classList.add("active");

    const videoSection = createCarousel(media.videos, true);
    const imageSection = createCarousel(media.images, false);
    subContent.append(videoSection, imageSection);
    subContentWrapper.appendChild(subContent);

    tabBtn.addEventListener("click", () => {
      [...subTabContainer.children].forEach(btn => btn.classList.remove("active"));
      [...subContentWrapper.children].forEach(tab => tab.classList.remove("active"));
      tabBtn.classList.add("active");
      subContent.classList.add("active");
     window.location.hash = tabBtn.id;
});

// Auto-activate tab if hash matches
if (window.location.hash === `#${tabBtn.id}`) {
  tabBtn.click();
}
  });
});
// ...existing code...

    mainDiv.append(title, viewBtn, subTabContainer, subContentWrapper);
    container.appendChild(mainDiv);
  });
}

function createCarousel(items, isVideo) {
  const section = document.createElement("div");
  section.className = "carousel-section";
  section.tabIndex = 0;

  const wrapper = document.createElement("div");
  wrapper.className = "carousel-wrapper";

  const container = document.createElement("div");
  container.className = "carousel-container";

  let index = 0;

  function render() {
    container.innerHTML = "";
    const prev = (index - 1 + items.length) % items.length;
    const next = (index + 1) % items.length;

    [prev, index, next].forEach((i, pos) => {
      const item = document.createElement("div");
      item.className = "carousel-item";
      if (isVideo) {
  item.classList.add("video-card");
}
      if (pos === 1) item.classList.add("centered");

      const media = isVideo ? document.createElement("video") : document.createElement("img");
      media.src = items[i].src;
      if (isVideo) {
        media.controls = true;
        media.muted = true;
        media.autoplay = pos === 1;
        if (pos !== 1) media.classList.add("blurred");
      }

      const desc = document.createElement("div");
      desc.className = "carousel-description";
      desc.textContent = items[i].desc;

      if (isVideo && pos === 1) {
        const replay = document.createElement("button");
        replay.className = "replay-btn";
        replay.innerHTML = '<i class="fas fa-redo-alt"></i>';
        const order = document.createElement("button");
        order.className = "order-btn";
        order.textContent = "Order Now";
        order.onclick = () => window.location = "contacts.html";

        media.onended = () => {
          replay.style.display = "block";
          order.style.display = "block";
        };
        replay.onclick = () => {
          media.play();
          replay.style.display = "none";
          order.style.display = "none";
        };
        item.append(order, replay);
      }

      item.append(media, desc);
      container.appendChild(item);
    });
  }

  const left = document.createElement("i");
  left.className = "fa fa-chevron-left arrow left";
  left.onclick = () => { index = (index - 1 + items.length) % items.length; render(); };

  const right = document.createElement("i");
  right.className = "fa fa-chevron-right arrow right";
  right.onclick = () => { index = (index + 1) % items.length; render(); };

  wrapper.append(left, container, right);
  section.appendChild(wrapper);

 render(); // Render immediately so carousels show when tab is clicked

let isRendered = false;
section.addEventListener("mouseenter", () => {
  if (!isRendered) {
    render();
    isRendered = true;
  }
});

let activeCarousel = null;

document.addEventListener("mouseover", (e) => {
  const carousel = e.target.closest(".carousel-section");
  if (carousel) activeCarousel = carousel;
});

document.addEventListener("focusin", (e) => {
  const carousel = e.target.closest(".carousel-section");
  if (carousel) activeCarousel = carousel;
});

document.addEventListener("keydown", (e) => {
  if (!activeCarousel) return;

  const left = activeCarousel.querySelector(".arrow.left");
  const right = activeCarousel.querySelector(".arrow.right");
  const centerVid = activeCarousel.querySelector(".centered video");

  switch (e.code) {
    case "ArrowLeft":
      left?.click();
      e.preventDefault();
      break;
    case "ArrowRight":
      right?.click();
      e.preventDefault();
      break;
    case "Space":
      if (centerVid) {
        centerVid.paused ? centerVid.play() : centerVid.pause();
        e.preventDefault();
      }
      break;
  }
});


  return section;
}

createMainAlbums(galleryData);
// ...existing code...
// On page load, if there's a hash, simulate a click on the matching tab
window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;
  if (hash) {
    // Extract main album and sub-album from the hash
    const match = hash.match(/^#tab-([^]+?)-([^]+?)-(\d+)$/);
    if (match) {
      const mainAlbumId = match[1];
      // Find the main album div
      const mainAlbums = document.querySelectorAll('.main-album');
      for (const mainDiv of mainAlbums) {
        const h2 = mainDiv.querySelector('h2');
        if (h2 && h2.textContent.replace(/\s+/g, '-') === mainAlbumId) {
          // Click the "View More" button to show sub-tabs
          const viewBtn = mainDiv.querySelector('.view-more');
          if (viewBtn) viewBtn.click();
          // Wait a tick for sub-tabs to render, then click the tab
          setTimeout(() => {
            const tab = document.getElementById(hash.replace('#', ''));
            if (tab) tab.click();
          }, 100);
          break;
        }
      }
    }
  }
});
// ...existing code...
window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;
  if (hash.startsWith("#tab-")) {
    // Try to find the tab button by ID
    const tabBtn = document.getElementById(hash.replace('#', ''));
    if (tabBtn) {
      // If the subalbum tab is not visible, click the "View More" button of the parent album first
      let mainAlbumDiv = tabBtn.closest('.main-album');
      if (!mainAlbumDiv) {
        // If not found, search all main albums for a matching tab
        document.querySelectorAll('.main-album').forEach(mainDiv => {
          if (mainDiv.querySelector(`#${hash.replace('#', '')}`)) {
            mainAlbumDiv = mainDiv;
          }
        });
      }
      if (mainAlbumDiv) {
        const viewBtn = mainAlbumDiv.querySelector('.view-more');
        if (viewBtn && !tabBtn.offsetParent) {
          viewBtn.click();
          setTimeout(() => tabBtn.click(), 100);
        } else {
          tabBtn.click();
        }
      } else {
        tabBtn.click();
      }
    }
  }
});
})();