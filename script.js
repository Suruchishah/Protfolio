document.getElementById("year").textContent = new Date().getFullYear();

function showPlaceholder(event, item) {
  event.preventDefault();
  alert(item + " is a placeholder. Replace the href="#" with your real link.");
  return false;
}

