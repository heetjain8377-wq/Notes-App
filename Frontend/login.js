const message = document.getElementById("message");

async function loginUser(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({
                email, 
                password
            })
        })

        const data = await response.json();
        message.innerText = data.message;

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
};