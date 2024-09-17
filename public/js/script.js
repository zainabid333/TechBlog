document.addEventListener("DOMContentLoaded", (event) => {


  const editPostForm = document.getElementById("edit-post-form");
  if (editPostForm) {
    editPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const postId = document
        .getElementById("update-post-btn")
        .getAttribute("data-post-id");
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        });
        if (response.ok) {
          // Redirect to dashboard after successful update
          document.location.replace("/dashboard");
        } else {
          alert("Failed to update post.");
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    });
  }
  const newPost = document.getElementById("new-post-btn");
  if (newPost) {
    newPost.addEventListener("click", () => {
      document.location.replace("/dashboard/new-post");
    });
  }
  const viewPostButtons = document.querySelectorAll(".view-post-btn");
  viewPostButtons.forEach((button) => {
    button.addEventListener("click", viewPost);
  });
  const deletePostButtons = document.querySelectorAll(".delete-post-btn");
  deletePostButtons.forEach((button) => {
    button.addEventListener("click", deletePost);
  });
  const editPostButtons = document.querySelectorAll(".edit-post-btn");
  editPostButtons.forEach((button) => {
    button.addEventListener("click", editPost);
  });
});
const viewPost = async (event) => {
  event.preventDefault();
  const postId = event.target.getAttribute("data-id");
  console.log(postId);
  document.location.replace(`/api/posts/${postId}`);
};

const deletePost = async (event) => {
  event.preventDefault();
  const postId = event.target.getAttribute("data-id");
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const editPost = async (event) => {
  event.preventDefault();
  const postId = event.target.getAttribute("data-id");
  document.location.replace(`/api/posts/edit-post/${postId}`);
};
