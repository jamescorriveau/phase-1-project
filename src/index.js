const darkMode = document.querySelector("#light-dark");
const body = document.querySelector("body")

let darkModeToggle = false

darkMode.addEventListener("click", () => {
    darkModeToggle = !darkModeToggle
    console.log(darkModeToggle)
    
    body.style.backgroundColor = "black"
    body.style.color = "white"
    if(darkModeToggle == true) {
        body.style.backgroundColor = "black"
        body.style.color = "white" 
    } else {
        body.style.backgroundColor = "white"
        body.style.color = "black" 
    }
})

const reportButton = document.querySelector(".report-button")
const submitButton = document.querySelector("#btns")
const form = document.querySelector("#myForm")

reportButton.addEventListener("click", (e) => {
    console.log('button clicked')
    e.preventDefault();
    openForm();
})
myForm.addEventListener("click", (e) => {
    e.preventDefault();
})

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}



