// const loginFormHandler = async (event) => {
//   event.preventDefault();

//   const username = document
//     .querySelector('input[name="username"]')
//     .value.trim();
//   const password = document
//     .querySelector('input[name="password"]')
//     .value.trim();

//   if (username && password) {
//     const response = await fetch("/login", {
//       method: "POST",
//       body: JSON.stringify({ username, password }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.replace("/");
//     } else {
//       alert("Failed to log in.");
//     }
//   }
// };

// const newPostHandler = async (event) => {
//   event.preventDefault();

//   const title = document.querySelector('input[name="title"]').value.trim();
//   const content = document
//     .querySelector('textarea[name="content"]')
//     .value.trim();

//   if (title && content) {
//     const response = await fetch("/api/posts", {
//       method: "POST",
//       body: JSON.stringify({ title, content }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert("Failed to create post.");
//     }
//   }
// };

document.addEventListener("DOMContentLoaded", (event) => {
  const editButton = document.getElementById("edit-post-btn");
  if (editButton) {
    editButton.addEventListener("click", () => {
      window.location.href = "/edit-psot/{{selectedPost.id}}";
    });
  }
  const commentForm = document.getElementById("new-comment-form");
  if (commentForm) {
    commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const content = e.target.elements.content.value;

      try {
        const response = await fetch("/api/comments", {
          method: "POST",
          body: JSON.stringify({ content, post_id: "{{selectedPost.id}}" }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.reload();
        } else {
          alert("Failed to post comment");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("An error occurred while posting the comment");
      }
    });
  }
});
