// Purpose: To handle the front-end logic for the post page
document.addEventListener("DOMContentLoaded", (event) => {
  const newPost = document.getElementById("new-post-btn");
  newPost.addEventListener("click", () => {
    document.location.replace("/dashboard/new-post");
  });

  const viewPostButtons = document.querySelectorAll("view-post-btn");
  viewPostButtons.forEach((button) => {
    button.addEventListener("click", viewPost);
  });

  const deletePostButtons = document.getElementsByClassName ("delete-post-btn");
  deletePostButtons.forEach((button) => {
    button.addEventListener("click", deletePost);
  });
});

const viewPost = async (event) => {
  console.log("View post");
  event.preventDefault();
  const postId = event.target.getAttribute("data-post-id");
  await fetch(`/posts/${postId}`, {
    method: "GET",
  });
  document.location.replace(`/post/${postId}`);
  return postId;
  // Redirect to the post page
};

const deletePost = async (event) => {
  console.log("Delete post");
  event.preventDefault();
  const postId = event.target.getAttribute("data-post-id");
  await fetch(`/posts/${postId}`, {
    method: "DELETE",
  });
  document.location.replace("/dashboard");
};
