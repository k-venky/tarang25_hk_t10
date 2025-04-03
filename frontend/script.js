const API_BASE_URL = "http://localhost:2000";

// Load header and footer dynamically
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
  await fetchInternshipCount();
  await fetchInternships();
});

// 🔹 Load header and footer
async function loadComponents() {
  document.getElementById("header").innerHTML = await fetchText(
    "components/header.html"
  );
  document.getElementById("footer").innerHTML = await fetchText(
    "components/footer.html"
  );
}

// 🔹 Fetch text content
async function fetchText(url) {
  const response = await fetch(url);
  return response.text();
}

// 🔹 SIGNUP FUNCTION
// document.addEventListener("submit", async (event) => {
//     if (event.target.id === "signup-form") {
//         event.preventDefault();
//         const name = document.getElementById("name").value;
//         const email_id = document.getElementById("email").value;
//         const phone = document.getElementById("phone").value;
//         const password = document.getElementById("password").value;

//         const response = await fetch(`${API_BASE_URL}/auth/register`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, email_id, phone, password }),
//         });

//         if (response.ok) {
//             alert("Signup successful! Redirecting to login...");
//             window.location.href = "login.html";
//         } else {
//             alert("Signup failed. Try again!");
//         }
//     }
// });

// 🔹 LOGIN FUNCTION
document.addEventListener("submit", async (event) => {
  if (event.target.id === "login-form") {
    event.preventDefault();

    const email_id = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_id, password }),
      });

      const data = await response.json();

      if (data.code === 200 && data.status === "success" && data.data) {
        const { role, name, email_id } = data.data; // Extract user info

        // Store user info in localStorage
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email_id);

        alert("Login successful! Redirecting...");
        window.location.href = "index.html"; // Redirect to home page
      } else {
        alert(data.message || "Invalid credentials! Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later.");
    }
  }
});

// 🔹 GET INTERNSHIP COUNT
async function fetchInternshipCount() {
  try {
    const response = await fetch(`${API_BASE_URL}/internship/count`);
    const data = await response.json();
    document.getElementById("internship-count").textContent = data.count;
  } catch (error) {
    console.error("Error fetching internship count:", error);
  }
}

// 🔹 GET ALL INTERNSHIPS
async function fetchInternships() {
  try {
    const response = await fetch(`${API_BASE_URL}/internship/10/1`);
    const data = await response.json();

    console.log("API Response:", data); // Debugging

    if (!data) {
      console.error("No data received from API");
      return;
    }

    if (Array.isArray(data.data)) {
      displayInternships(data.data);
    } else if (data.internships && Array.isArray(data.internships)) {
      displayInternships(data.internships);
    } else {
      console.error("Unexpected API response format:", data);
    }
  } catch (error) {
    console.error("Error fetching internships:", error);
  }
}

// 🔹 DISPLAY INTERNSHIPS
function displayInternships(internships) {
  const internshipList = document.getElementById("internship-list");
  internshipList.innerHTML = ""; // Clear previous results

  if (!internships || internships.length === 0) {
    internshipList.innerHTML = `<p class="text-center text-muted">No internships available.</p>`;
    return;
  }

  internships.forEach((internship) => {
    // Format the created_at date
    const postedDate = new Date(internship.created_at).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    internshipList.innerHTML += `
            <div class="col-md-4">
                <div class="card shadow-sm p-3 mb-4">
                    <img src="${internship.image_link}" class="card-img-top" alt="Internship Image" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${internship.title}</h5>
                        <p class="card-text">${internship.description}</p>
                        <p><b>Company:</b> ${internship.company}</p>
                        <p><b>Location:</b> ${internship.location}</p>
                        <p class="text-muted"><b>Posted on:</b> ${postedDate}</p>
                        <button class="btn btn-primary apply-btn" onclick="applyInternship('${internship.id}')">Apply Now</button>
                    </div>
                </div>
            </div>
        `;
  });
}

// 🔹 APPLY INTERNSHIP (Functionality Placeholder)
function applyInternship(internshipId) {
  alert(`Applying for internship ID: ${internshipId}`);
}

// 🔹 POPULATE FILTER OPTIONS
function populateFilters(internships) {
  const locationFilter = document.getElementById("location-filter");
  const companyFilter = document.getElementById("company-filter");

  let locations = new Set();
  let companies = new Set();

  internships.forEach(({ location, company }) => {
    locations.add(location);
    companies.add(company);
  });

  locationFilter.innerHTML =
    `<option value="">Select Location</option>` +
    [...locations]
      .map((loc) => `<option value="${loc}">${loc}</option>`)
      .join("");
  companyFilter.innerHTML =
    `<option value="">Select Company</option>` +
    [...companies]
      .map((comp) => `<option value="${comp}">${comp}</option>`)
      .join("");
}

// 🔹 FILTER INTERNSHIPS
async function filterInternships() {
  const location = document.getElementById("location-filter").value;
  const company = document.getElementById("company-filter").value;

  let url = `${API_BASE_URL}/internship/10/1`;
  const params = new URLSearchParams();
  if (location) params.append("location", location);
  if (company) params.append("company", company);

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    const internships = await response.json();
    displayInternships(internships);
  } catch (error) {
    console.error("Error filtering internships:", error);
  }
}

// Load header and footer dynamically
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
});

// 🔹 Load header and footer
async function loadComponents() {
  document.getElementById("header").innerHTML = await fetchText(
    "components/header.html"
  );
  document.getElementById("footer").innerHTML = await fetchText(
    "components/footer.html"
  );
}

// 🔹 Fetch text content
async function fetchText(url) {
  const response = await fetch(url);
  return response.text();
}

// 🔹 SIGNUP FUNCTION
document.addEventListener("submit", async (event) => {
  if (event.target.id === "signup-form") {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email_id = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value; // Get selected role

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email_id, phone, password, role }),
      });

      const data = await response.json();

      if (data.code === 200 && data.status === "success") {
        alert("Signup successful! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Signup failed. Try again!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again later.");
    }
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
  updateNavbar();
});

// 🔹 Update Navbar Based on Role (Without Token)
function updateNavbar() {
  const navLinks = document.getElementById("nav-links");
  navLinks.innerHTML = ""; // Clear existing links

  const role = localStorage.getItem("role");
  console.log("User role:", role); // Debugging output

  if (role === "admin") {
    navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="post_internship.html">Post Internship</a></li>
            <li class="nav-item"><a class="nav-link btn btn-danger text-white" href="#" onclick="logout()">Logout</a></li>
        `;
  } else if (role === "student") {
    navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link btn btn-danger text-white" href="#" onclick="logout()">Logout</a></li>
        `;
  } else {
    navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
            <li class="nav-item"><a class="nav-link btn btn-warning text-dark" href="register.html">Sign Up</a></li>
        `;
  }
}

// 🔹 LOGOUT FUNCTION
function logout() {
  localStorage.clear(); // Remove all stored user data
  alert("Logged out successfully!");
  window.location.href = "login.html"; // Redirect to login page
}

// 🔹 Attach Logout Event to Button
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await fetchInternships();
});

// Store all internships globally
let internships = [];

// Fetch all internships from API
async function fetchInternships() {
  try {
    const response = await fetch("http://localhost:2000/internship/10/1");
    const data = await response.json();

    if (data.code === 200) {
      internships = data.data; // Store all internships
      displayInternships(internships);
      populateFilters(internships);
    } else {
      console.error("Failed to fetch internships");
    }
  } catch (error) {
    console.error("Error fetching internships:", error);
  }
}

// Display internships in UI
function displayInternships(filteredInternships) {
  const internshipList = document.getElementById("internship-list");
  const internshipCount = document.getElementById("internship-count");

  internshipList.innerHTML = "";
  internshipCount.innerText = filteredInternships.length;

  if (filteredInternships.length === 0) {
    internshipList.innerHTML = `<p class="text-center text-muted">No internships available.</p>`;
    return;
  }

  filteredInternships.forEach((internship) => {
    const image = internship.image_link
      ? `<img src="${internship.image_link}" class="card-img-top internship-img" alt="Internship Image" >`
      : `<img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png" class="card-img-top internship-img" alt="Default Image" >`; // Default image fallback

    const reviews = `
            <p class="text-warning">
                ★★★★☆ (4.2/5) <span class="text-muted">(${
                  internship.id * 5
                } reviews)</span>
            </p>
        `;
    const card = `
            <div class="col-md-4 col-lg-3">
                <div class="card shadow-sm h-100 d-flex flex-column">
                    ${image}
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><a href="internship-details.html?id=${internship.id}" class="text-decoration-none">
 ${internship.title} <span class="badge bg-info">View</span>
 </a></h5>
                        <p class="card-text flex-grow-1"><b>Company:</b> ${internship.company}</p>
                        <p class="card-text"><b>Location:</b> ${internship.location}</p>
                        <p class="card-text">${internship.description}</p>
                        ${reviews}
                        <button class="btn btn-primary mt-auto">Apply Now</button>
                    </div>
                </div>
            </div>
        `;
    internshipList.innerHTML += card;
  });
}
// 🔹 Apply Internship Function (For Now, Just Shows an Alert)
function applyInternship(id) {
  alert("Applied for Internship ID:", id);
}

// Populate filters dynamically
function populateFilters(internships) {
  const locationFilter = document.getElementById("location-filter");
  const companyFilter = document.getElementById("company-filter");

  const locations = new Set(internships.map((item) => item.location));
  const companies = new Set(internships.map((item) => item.company));

  locationFilter.innerHTML = `<option value="">Select Location</option>`;
  companyFilter.innerHTML = `<option value="">Select Company</option>`;

  locations.forEach((location) => {
    locationFilter.innerHTML += `<option value="${location}">${location}</option>`;
  });

  companies.forEach((company) => {
    companyFilter.innerHTML += `<option value="${company}">${company}</option>`;
  });
}

// Filter internships
function filterInternships() {
  const selectedLocation = document.getElementById("location-filter").value;
  const selectedCompany = document.getElementById("company-filter").value;

  const filtered = internships.filter((internship) => {
    return (
      (selectedLocation === "" || internship.location === selectedLocation) &&
      (selectedCompany === "" || internship.company === selectedCompany)
    );
  });

  displayInternships(filtered);
}
