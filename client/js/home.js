// Initialize variables
let blogList;
const searchInput = document.getElementById("searchQuery");

// Function to fetch data from the server
const fetchData = () => {
  fetch("http://localhost:8000/blog", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode === 200) {
        // Store fetched data in the blogList variable
        blogList = data.data;
        // Filter and render data based on search query
        filterData(searchInput.value);
      } else {
        console.error("Failed to fetch data");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Function to filter data based on search query
const filterData = (searchQuery) => {
  // Filter the blogList based on the search query
  const filteredList =
    searchQuery !== ""
      ? blogList.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : blogList;

  // Render the filtered data
  renderData(filteredList);
};

// Function to render data to the UI
const renderData = (data) => {
  const blogsSection = document.getElementById("blogs-section");
  // Clear previous data
  blogsSection.innerHTML = "";

  // Iterate through each item in the data and create blog card HTML
  data.forEach((item) => {
    const blogPost = `
        <div class="post-box tech" key=${item.id}>
            <!-- <img src="images/img1.jpg" alt="" class="post-img" /> -->
            <!-- <h2 class="category">Tech</h2> -->
            <a href="../html/details.html" class="post-title" data-id="${
              item.id
            }">${item.title}</a>
            <span class="post-date">${item.created_at.slice(0, 10)}</span>
            <p class="post-description">
            ${item.body}
            </p>
            <div class="profile">
            <p class="profile-img">T</p>
            <span class="profile-name">Taye</span>
            </div>
        </div>
      
      `;

    // Append each blog card to the blogs section
    blogsSection.innerHTML += blogPost;

    document.querySelectorAll(".post-title").forEach((btn) => {
      btn.addEventListener("click", viewPost);
    });
  });

  // Add event listeners to the read buttons
  document.querySelectorAll(".read-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const selectedId = e.target.dataset.id;
      // Store selected blog ID in local storage
      localStorage.setItem("selectedId", JSON.stringify(selectedId));
    });
  });
};

//function to view post details
const viewPost = async (e) => {
  const postId = e.target.dataset.id;
  localStorage.setItem("postId", JSON.stringify(postId));
};

// Fetch data when the window loads
window.addEventListener("load", fetchData);

// Listen for input changes on the search input
searchInput.addEventListener("input", () => {
  // Filter and render data based on the search input value
  filterData(searchInput.value);
});
