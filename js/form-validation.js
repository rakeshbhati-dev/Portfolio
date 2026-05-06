const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");
const btn = form.querySelector(".form-submit");

const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const project = document.getElementById("project");
const message = document.getElementById("message");

// Helper: show error
function showError(input, message) {
  input.classList.add("error");

  let small = input.parentElement.querySelector(".error-text");
  if (!small) {
    small = document.createElement("small");
    small.className = "error-text";
    input.parentElement.appendChild(small);
  }
  small.textContent = message;
}

// Helper: clear error
function clearError(input) {
  input.classList.remove("error");
  const small = input.parentElement.querySelector(".error-text");
  if (small) small.remove();
}

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isValid = true;

  // Clear previous errors
  [fname, lname, email, project, message].forEach(clearError);

  // First Name
  if (fname.value.trim() === "") {
    showError(fname, "First name is required");
    isValid = false;
  }

  // Email
  if (email.value.trim() === "") {
    showError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError(email, "Enter a valid email");
    isValid = false;
  }

  // Project
  if (!project.value) {
    showError(project, "Please select a project type");
    isValid = false;
  }

  // Message
  if (message.value.trim() === "") {
    showError(message, "Message is required");
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showError(message, "Message should be at least 10 characters");
    isValid = false;
  }

  if (!isValid) return;

  // ✅ If valid → send form
  btn.disabled = true;
  btn.textContent = "Sending...";

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      msg.classList.add("show");
      form.reset();

      setTimeout(() => {
        msg.classList.remove("show");
      }, 4000);

    } else {
      alert("Something went wrong.");
    }

  } catch (error) {
    alert("Network error.");
  }

  btn.disabled = false;
  btn.textContent = "Send Message →";
});
