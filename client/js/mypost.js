// Function to display success or error messages

const showNotification = (message, type) => {
  const notificationElement =
    type === "success"
      ? document.getElementById("success")
      : document.getElementById("error");
  notificationElement.textContent = message;
  notificationElement.style.display = "block";

  // Hide the notification after a certain duration (e.g., 3 seconds)
  setTimeout(() => {
    notificationElement.style.display = "none";
  }, 3000); // 3000 milliseconds = 3 seconds
};

// Function to fetch CSRF token
const getCsrfToken = async () => {
  try {
    const response = await fetch("http://localhost:8000/csrf-token", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      showNotification(
        "Failed to fetch CSRF token: " + response.status,
        "error"
      );
    }

    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    showNotification("Error during fetching CSRF token:", error);
    // Handle the error appropriately, e.g., show an error message to the user
  }
};

// Function to submit form and fetch blog posts
const submitForm = () => {
  const savedTime = localStorage.getItem("expirationTime");
  const currentTime = Date.now();
  if (currentTime > new Date(savedTime).getTime()) {
    //clear storage
    localStorage.clear();
    //navigate to login
    window.location.href = "../html/login.html";
  } else {
    fetch("http://localhost:8000/blog/user", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          data?.data?.forEach((item) => {
            const blogPost = `

                <div class="post-box" key=${item.id}>
                <!-- <img src="images/img1.jpg" alt="" class="post-img" /> -->
                <!-- <h2 class="category">Tech</h2> -->
                <a href="#" class="post-title">${item.title}</a>
                <span class="post-date">12 Feb 2022</span>
                <p class="post-description">
                ${item.body}
                </p>
                <div class="blog-btns">
                    <button
                    class="delete-btn"
                    data-id="${item.id}"
                    >
                    Delete
                    </button>
                    <a
                    href="../html/post.html"
                    class="update-btn"
                    data-item='${JSON.stringify(item)}'
                    >Update</a
                    >
                </div>
                </div>

            `;

            document.getElementById("blogs-section").innerHTML += blogPost;
          });

          document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", deleteBlogPost);
          });

          document.querySelectorAll(".update-btn").forEach((btn) => {
            btn.addEventListener("click", updateBlogPost);
          });
        } else {
          showNotification(
            data.error + " No Post, Please create post",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};

// Function to delete a blog post
const deleteBlogPost = async (e) => {
  const csrfToken = await getCsrfToken();
  const postId = e.target.dataset.id;
  fetch(`http://localhost:8000/blog/${postId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrfToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.statusCode === 200) {
        showNotification(data.message, "success");
        // Remove the deleted blog post card from the UI
        e.target.closest(".post-box").remove();
      } else {
        // showNotification(data.error + " Please Sign In", "error");
        // window.location.href = "../html/login.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Function to update a blog post
const updateBlogPost = (e) => {
  e.stopPropagation();
  const blogItem = JSON.parse(e.target.getAttribute("data-item"));
  console.log(blogItem);
  localStorage.setItem("blogItem", JSON.stringify(blogItem));
};

// Function to handle logout
const handleLogout = () => {
  document.cookie = "";
  localStorage.clear();

  fetch("http://localhost:8000/user/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode === 200) {
        showNotification(data.message, "success");
        window.location.href = "../html/login.html";
      }
    });
};

// Event listener to load form submission and blog posts on page load
window.addEventListener("load", submitForm);

// Event listener for logout button click
document.getElementById("logout").addEventListener("click", handleLogout);
