document.addEventListener("DOMContentLoaded", (event) => {
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
  document.location.replace(`/api/posts/view/${postId}`);
};

const updatePost = document.getElementById("update-post-btn");
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
