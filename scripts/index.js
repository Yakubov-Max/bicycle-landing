const headerDropdownButton = document.querySelector(".header__burger-button")
const headerDropdownContent = document.querySelector(".header__burger-content")

const headerDropdownLinks = document.querySelectorAll(".header__burger-link")

headerDropdownButton.addEventListener("click", handleDropdownButton)

headerDropdownLinks.forEach(element => {
  element.addEventListener("click", handleDropdownButton)
})

// close/open header dropdown
function handleDropdownButton() {
  headerDropdownContent.classList.toggle("header__burger-content_opened")
  headerDropdownButton.classList.toggle("header__burger-button_opened")
}

