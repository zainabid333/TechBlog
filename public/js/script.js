const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document
    .querySelector('input[name="username"]')
    .value.trim();
  const password = document
    .querySelector('input[name="password"]')
    .value.trim();

  if (username && password) {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document
    .querySelector('input[name="username"]')
    .value.trim();
  const password = document
    .querySelector('input[name="password"]')
    .value.trim();

  if (username && password) {
    const response = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
};

const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value.trim();
  const content = document
    .querySelector('textarea[name="content"]')
    .value.trim();

  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post.");
    }
  }
};

// document
//   .querySelector("#new-post-form")
//   .addEventListener("submit", newPostHandler);

// const deleteButtons = document.querySelectorAll(".delete-btn");

// deleteButtons.forEach((button) => {
//   button.addEventListener("click", async (event) => {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/posts/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert("Failed to delete post.");
//     }
//   });
// });

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
