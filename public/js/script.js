// Purpose: To handle the front-end logic for the post page
document.addEventListener("DOMContentLoaded", (event) => {
  const viewPostButtons = document.querySelectorAll("view-post-btn");
  viewPostButtons.forEach((button) => {
    button.addEventListener("click", viewPost);
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
  console.log("View post");
  console.log(postId);
  return postId;
  // Redirect to the post page
};
