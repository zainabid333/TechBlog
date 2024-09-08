// Purpose: To handle the front-end logic for the post page
document.addEventListener("DOMContentLoaded", (event) => {
  //logout button
  const logoutButton = document.getElementById("logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }

  //edit post button
  const editButton = document.getElementById("edit-post-btn");
  if (editButton) {
    editButton.addEventListener("click", () => {
      window.location.href = `/edit-post/{{selectedPost.id}}`;
    });
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
