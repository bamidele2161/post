// Retrieve input field values
const title = document.getElementById("title");
const body = document.getElementById("body");

const checkSession = () => {
  const savedTime = localStorage.getItem("expirationTime");
  const currentTime = Date.now();
  if (currentTime > new Date(savedTime).getTime()) {
    //clear storage
    localStorage.clear();
    //navigate to login
    window.location.href = "../html/login.html";
  }
};

// Function to display success or error messages
const showMessage = (message, type, redirectURL) => {
  const notificationElement =
    type === "success"
      ? document.getElementById("success")
      : document.getElementById("error");

  notificationElement.textContent = message;
  notificationElement.style.display = "block";

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notificationElement.style.display = "none";
    if (type === "success" && redirectURL) {
      window.location.href = redirectURL;
    }
  }, 3000);
};

// Function to fetch CSRF token
const getCsrfToken = async () => {
  try {
    const response = await fetch("http://localhost:8000/csrf-token", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      showMessage("Failed to fetch CSRF token: " + response.status, "error");
    }

    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    showMessage("Error during fetching CSRF token:", "error", null);
  }
};

// Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const csrfToken = await getCsrfToken();

  // Create data object to send to endpoint
  const data = {
    title: title.value,
    body: body.value,
  };

  // Send POST request to create a new blog post
  fetch(`http://localhost:8000/blog`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrfToken,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode === 200) {
        showMessage(data?.message, "success", "../html/mypost.html");
      } else if (data.statusCode === 400) {
        showMessage(data?.error, "error", null);
      } else {
        // showMessage(
        //   data.error + " Please Sign In",
        //   "error",
        //   "../html/login.html"
        // );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

//Function to update form
const handleUpdate = async (localBlog) => {
  // Populate form fields with blog item details

  // Create data object to send to endpoint
  const csrfToken = await getCsrfToken();
  const data = {
    title: title.value,
    body: body.value,
  };

  // Send PUT request to update blog post
  fetch(`http://localhost:8000/blog/${localBlog.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrfToken,
    },
    body: JSON.stringify(data), // Convert data to JSON format
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode === 200) {
        showMessage(data?.message, "success", "../html/mypost.html");
        localStorage.removeItem("blogItem");
      } else {
        // showMessage(data.error + " Please Sign In", "error");
        // window.location.href = "../html/login.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Retrieve blog item from local storage
const localBlog = JSON.parse(localStorage.getItem("blogItem"));

// Check if a blog item exists in local storage
if (localBlog !== null) {
  title.value = localBlog.title;
  body.value = localBlog.body;
  // Add event listener to update blog post when publish button is clicked
  document
    .getElementById("submit-btn")
    .addEventListener("click", () => handleUpdate(localBlog));
} else {
  // If no blog item exists in local storage, add event listener to submit form
  document.getElementById("submit-btn").addEventListener("click", handleSubmit);
}

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
      console.log(data);
      if (data.statusCode === 200) {
        showMessage(data?.message, "success", "../html/login.html");
      } else {
        // Handle other cases if needed
      }
    });
};

// Add event listeners

window.addEventListener("load", checkSession); // check session when the window loads
document.getElementById("logout").addEventListener("click", handleLogout);
