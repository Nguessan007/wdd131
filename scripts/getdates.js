// Dynamically insert the current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Display last modified date of the document
document.getElementById("lastModified").textContent = 
  "Last Modified: " + document.lastModified;
