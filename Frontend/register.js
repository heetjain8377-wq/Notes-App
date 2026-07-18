const message = document.getElementById("message");
const registerBtn = document.getElementById("registerBtn");
const loaderContainer = document.querySelector(".loaderContainer");

registerBtn.addEventListener("click", async() => {

    loaderContainer.style.display = "flex";
    registerBtn.disabled = true;
    registerBtn.style.cursor = "not-allowed";
    registerBtn.style.opacity = "0.7";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const response = await fetch(`${API_URL}/api/auth/register`, {
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({
            name,
            email,
            password
        })
    });

    const data = await response.json();

    loaderContainer.style.display = "none";

    message.innerText = data.message;

    registerBtn.style.cursor = "pointer";
    registerBtn.style.opacity = "1";
    registerBtn.disabled = false;

    if(data.success){
        setTimeout(() => {
            window.location.href = "login.html"
        }, 1500);
    }
    }catch(error){
        console.log(error);
        message.innerText = "Something went wrong";
    }
});