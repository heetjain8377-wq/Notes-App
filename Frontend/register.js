const message = document.getElementById("message");

async function registerUser(){
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
    message.innerText = data.message;

    if(data.success){
        setTimeout(() => {
            window.location.href = "login.html"
        }, 1500);
    }
    }catch(error){
        console.log(error);
        message.innerText = "Something went wrong";
    }
};