// Script for the homepage typing effect
document.addEventListener("DOMContentLoaded", function() {
  if (document.querySelector(".typeMachinery")) {
    new Typed(".typeMachinery", {
      strings: [
        "AGRICULTURAL", "Harvesting", "planting", "irrigation",
        "PRODUCTION", "Woodwork", "Packaging", "Plastic", "Garment"
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
      showcursor: false
    });
  }
});


// Script for the Machinery page tabs and search
document.addEventListener("DOMContentLoaded", function() {
  if (!document.getElementById("machineContent")) return;

  const tabsData = {
    production: {
      woodwork: [
        {
          title: "CNC Routers",
          description: "High-quality industrial grade equipment",
          img: "images/cnc.jpg",
          link: "products.html#cnc"
        },
        {
          title: "Edge Banders",
          description: "Precise trimming and edging machines",
          img: "images/edgebander.jpg",
          link: "products.html#edgebander"
        }
      ],
      packaging: [
        {
          title: "Sealing Machines",
          description: "Heat-sealing industrial packaging units",
          img: "images/sealer.jpg",
          link: "products.html#sealers"
        }
      ]
    },
    agricultural: {
      planting: [
        {
          title: "Seed Drills",
          description: "Precision sowing equipment",
          img: "images/seeddrill.jpg",
          link: "products.html#seeddrills"
        }
      ],
      clearing: [
        {
          title: "Ploughs",
          description: "Field-clearing and tilling machines",
          img: "images/plough.jpg",
          link: "products.html#ploughs"
        }
      ]
    }
  };

  const mainTabs = document.querySelectorAll(".main-tab");
  const subTabsContainers = {
    production: document.getElementById("sub-tabs-production"),
    agricultural: document.getElementById("sub-tabs-agricultural")
  };
  const machineContent = document.getElementById("machineContent");
  const searchInput = document.getElementById("searchInput");

  let currentMain = "production";
  let currentSub = null;

  function createSubTabs(section) {
    const container = subTabsContainers[section];
    container.innerHTML = "";
    Object.keys(tabsData[section]).forEach(sub => {
      const btn = document.createElement("button");
      btn.className = "sub-tab";
      btn.style.position = "relative";
      btn.style.paddingRight = "90px";
      btn.textContent = sub.charAt(0).toUpperCase() + sub.slice(1);
      btn.dataset.sub = sub;

      const galleryBtn = document.createElement("button");
      galleryBtn.textContent = "View Gallery";
      galleryBtn.type = "button";
      galleryBtn.className = "galleryBtn";
      galleryBtn.style.marginLeft = "300px";
      galleryBtn.style.marginBottom = "7rem";
      galleryBtn.style.position = "absolute";
      galleryBtn.style.right = "8px";
      galleryBtn.style.top = "50%";
      galleryBtn.style.transform = "translateY(-50%)";
      galleryBtn.style.cursor = "pointer";

      let mainAlbum = section === "production" ? "Production Machines" : "Agricultural Machines";
      let subAlbum = sub;
      let tabId = `tab-${mainAlbum.replace(/\s+/g, '-')}-${subAlbum.replace(/\s+/g, '-')}-0`;
      galleryBtn.onclick = (e) => {
        e.stopPropagation();
        window.open(`products.html#${tabId}`);
      };

      btn.appendChild(galleryBtn);

      btn.onclick = function () {
        container.querySelectorAll(".sub-tab").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentSub = sub;
        renderMachines();
      };

      container.appendChild(btn);
    });
    const first = container.querySelector(".sub-tab");
    if (first) {
      first.click();
    }
  }

  function renderMachines() {
    const search = searchInput.value.toLowerCase();
    const list = tabsData[currentMain][currentSub] || [];
    const filtered = list.filter(item =>
      item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search)
    );
    machineContent.innerHTML = "";
    filtered.forEach(item => {
      const div = document.createElement("div");
      div.className = "machine";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}" />
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <a href="${item.link}">View Demo</a>
      `;
      machineContent.appendChild(div);
    });
  }

  mainTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      mainTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentMain = tab.dataset.section;
      Object.values(subTabsContainers).forEach(c => c.classList.remove("active"));
      subTabsContainers[currentMain].classList.add("active");
      machineContent.innerHTML = "";
      createSubTabs(currentMain);
    });
  });

  document.querySelectorAll(".trending span").forEach(span => {
    span.onclick = () => {
      searchInput.value = span.dataset.search;
      renderMachines();
    };
  });

  searchInput.addEventListener("input", renderMachines);

  createSubTabs(currentMain);
  renderMachines();
});

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