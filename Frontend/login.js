const message = document.getElementById("message");
const loginBtn = document.getElementById("loginBtn");
const loaderContainer = document.querySelector(".loaderContainer");

loginBtn.addEventListener("click", async() => {
    loaderContainer.style.display = "flex";
    loginBtn.disabled = true;
    loginBtn.style.cursor = "not-allowed";
    loginBtn.style.opacity = "0.7";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({
                email, 
                password
            })
        })

        const data = await response.json();

        loaderContainer.style.display = "none";

        message.innerText = data.message;

        loginBtn.style.cursor = "pointer";
        loginBtn.style.opacity = "1";
        loginBtn.disabled = false;

        if(data.success){
            localStorage.setItem("token", data.token);

            setTimeout(() => {
                window.location.href = "note.html";
            }, 1500);
        }
    }catch(error){
        console.log(error);
        message.innerText = "Something went wrong"
    }
});