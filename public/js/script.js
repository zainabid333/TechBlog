// Purpose: To handle the front-end logic for the post page
document.addEventListener("DOMContentLoaded", (event) => {
  const modal = document.getElementById("post-modal");
  const closeModal = document.querySelector(".close-modal");
  const postForm = document.getElementById("post-form");

  // Function to open the modal
  const openModal = () => {
    modal.classList.remove("hidden");
  };

  // Function to close the modal
  const closeModalFunc = () => {
    modal.classList.add("hidden");
  };

  // Event listener for closing the modal
  closeModal.addEventListener("click", closeModalFunc);

  // Event listener for the create post button
  const createPostButton = document.getElementById("create-post-btn");
  if (createPostButton) {
    createPostButton.addEventListener("click", () => {
      postForm.action = "/api/posts";
      postForm.method = "POST";
      postForm.querySelector('input[name="post_id"]').value = "";
      postForm.querySelector('input[name="title"]').value = "";
      postForm.querySelector('textarea[name="content"]').value = "";
      openModal();
    });
  }

  // Event listener for the edit post button
  const editPostButton = document.getElementById("edit-post-btn");
  if (editPostButton) {
    editPostButton.addEventListener("click", async (event) => {
      const postId = event.target.dataset.postId;
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (response.ok) {
          const post = await response.json();
          postForm.action = `/api/posts/${postId}`;
          postForm.method = "PUT";
          postForm.querySelector('input[name="post_id"]').value = post.id;
          postForm.querySelector('input[name="title"]').value = post.title;
          postForm.querySelector('textarea[name="content"]').value =
            post.content;
          openModal();
        } else {
          alert("Failed to load post data");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to load post data");
      }
    });
  }
  //logout button
  const logoutButton = document.getElementById("logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
});


//logout function using /api/users/logout

const logout = async () => {
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    }

    alert("You have been logged out.");
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to log out");
  }
};
