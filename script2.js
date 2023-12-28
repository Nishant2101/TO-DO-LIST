// Event listener for the "Add Todo" button
document.querySelector(".btn-danger").addEventListener("click", createList);

// Array to store input values
let inputArray = [];

// Function to create a new todo
function createList() {
  // Get input and error message elements
  var input = document.querySelector(".inputs");
  var errorMessage = document.querySelector(".error-message");

  // Check for empty input
  if (input.value === "") {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";

    // Get existing todos from local storage
    var existingData = localStorage.getItem("input");
    var inputArray = existingData ? JSON.parse(existingData) : [];

    // Get parent element and create todo elements
    var parentElement = document.querySelector(".main-section");
    var div1 = document.createElement("div");
    div1.className = "todo";
    var div2 = document.createElement("div");
    div2.className = "paragraph";
    div2.textContent = input.value;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn button";
    button.textContent = "X";

    // Append todo elements to the DOM
    parentElement.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(button);

    // Add new todo to the array and update local storage
    inputArray.push(input.value);
    localStorage.setItem("input", JSON.stringify(inputArray));

    // Clear input value
    input.value = "";
  }
}

// Function to load todos from local storage
function loadData() {
  // Get saved todos from local storage
  var inputLoad = localStorage.getItem("input");
  var user_input = inputLoad ? JSON.parse(inputLoad) : [];

  // Display todos on the page
  var parentElement = document.querySelector(".main-section");
  for (let a = 0; a < user_input.length; a++) {
    if (user_input[a] == "") {
      document.querySelector(".error-message").style.display = "block";
    } else {
      document.querySelector(".error-message").style.display = "none";

      // Create todo elements for each saved todo
      var div1 = document.createElement("div");
      div1.className = "todo";
      var div2 = document.createElement("div");
      div2.className = "paragraph";
      div2.textContent = user_input[a];
      var button = document.createElement("button");
      button.type = "button";
      button.className = "btn button";
      button.textContent = "X";

      // Append todo elements to the DOM
      parentElement.appendChild(div1);
      div1.appendChild(div2);
      div1.appendChild(button);
    }
  }
}

// Load saved todos on page load
loadData();

// Event listener for todo deletion
document.querySelector(".outer").addEventListener("click", function (e) {
  deleteButton(e);
});

// Function to handle todo deletion
function deleteButton(event) {
  // Get all delete buttons
  var btn_array = document.querySelectorAll(".button");

  // Loop through delete buttons
  btn_array.forEach((element, index) => {
    // Check if the clicked element is a delete button
    if (event.target == element) {
      // Get todos from local storage
      var inputDelete = localStorage.getItem("input");
      var input1 = inputDelete ? JSON.parse(inputDelete) : [];

      // Remove deleted todo from array and update local storage
      input1.splice(index, 1);
      localStorage.setItem("input", JSON.stringify(input1));

      // Remove todo element from the DOM
      event.target.parentElement.remove();
    }
  });
}
