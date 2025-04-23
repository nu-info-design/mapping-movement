const svgFiles = [
    "svgs/t_home.svg",
    "svgs/t_tuvalu1.svg",
    "svgs/t_tuvalu2.svg",
    "svgs/t_tuvalu3.svg",
    "svgs/t_islands.svg",
    "svgs/t_internal.svg",
    "svgs/t_2024.svg",
    "svgs/t_speculated.svg",
    "svgs/t_ending.svg"
  ];
  
  let currentIndex = 0;
  const container = document.getElementById("svg-container");
  
  // === Load SVG by index from svgFiles array ===
  async function loadSVG(index) {
    const file = svgFiles[index];
    try {
      const res = await fetch(file);
      const text = await res.text();
      container.innerHTML = text;
      currentIndex = index;
      setupSVGInteractions();
    } catch (err) {
      console.error("Error loading SVG:", err);
    }
  }
  
  // === Load SVG directly from a file path (not using index) ===
  async function loadSVGByPath(path) {
    try {
      const res = await fetch(path);
      const text = await res.text();
      container.innerHTML = text;
      setupSVGInteractions();
    } catch (err) {
      console.error("Error loading SVG:", err);
    }
  }
  
  // === Attach event listeners to clickable island circles ===
  function setupSVGInteractions() {
    const clickableIslands = ["niutao", "nanumanga", "nukulaelae", "funa", "nanumea", "nui", "vai", "nuku", "niulakita"]; // Add more as needed
  
    clickableIslands.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("click", () => {
          const path = `svgs/t_${id}.svg`;
          loadSVGByPath(path);
        });
      }
    });
  }

    
  // === Arrow key navigation through svgFiles array ===
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % svgFiles.length;
      loadSVG(currentIndex);
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + svgFiles.length) % svgFiles.length;
      loadSVG(currentIndex);
    }
  });

  const years = [2024, 2020, 2015, 2010, 2005, 2000, 1995, 1990, "speculated"]; 
    const svgContainer = document.getElementById("svg-container");
    const dropdownContainer = document.querySelector(".dropdown-container");
    const yearSelect = document.getElementById("yearSelect");

    // Populate dropdown with years
    years.forEach(year => {
        let option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    // Function to load SVG based on the year
    function loadSVG(svgFile) {
        console.log(`Loading SVG: ${svgFile}`); // Debugging log to see the loaded file

        fetch(svgFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error("SVG file not found");
                }
                return response.text();
            })
            .then(data => {
                svgContainer.innerHTML = data;
                attachClickListeners(); // Reattach click listeners after SVG is loaded
                checkSVGForDropdown(svgFile); // Check dropdown visibility
            })
            .catch(error => {
                console.error("Error loading SVG:", error);
            });
    }

    // Switch SVG based on selected year
    function updateSVG(selectedYear) {
        console.log(`Updating to SVG for year: ${selectedYear}`); // Debugging log to check the selected year
        loadSVG(`svgs/t_${selectedYear}.svg`);
    }

    // Show or hide dropdown based on SVG name
    function checkSVGForDropdown(svgFile) {
        console.log(`Checking dropdown for: ${svgFile}`); // Debugging log to check file passed

        const showDropdownFor = [
            "svgs/t_2024.svg", "svgs/t_2020.svg", "svgs/t_2015.svg", "svgs/t_2010.svg", 
            "svgs/t_2005.svg", "svgs/t_2000.svg", "svgs/t_1995.svg", "svgs/t_1990.svg", "svgs/t_speculated.svg"
        ];

        // Only show dropdown for specific SVGs
        if (showDropdownFor.includes(svgFile)) {
            dropdownContainer.style.display = "inline"; // Show dropdown
        } else {
            dropdownContainer.style.display = "none"; // Hide dropdown for other SVGs
        }
    }

    yearSelect.addEventListener("change", (event) => {
        updateSVG(event.target.value);
    });
  
  // === Initial load ===
  loadSVG(currentIndex);

