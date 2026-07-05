const notesContainer = document.getElementById("notesContainer");
const logoutBtn = document.getElementById("logoutBtn");

async function loadNotes(){
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/note/`, {
        method : "GET",
        headers : {Authorization : `Bearer ${token}`}
    });

    const data = await response.json();
    console.log(data);

    notesContainer.innerHTML = "";

    data.notes.forEach((note) => {
        notesContainer.innerHTML += `
        <div>
        <h3 class="note-card">Title :${note.title}</h3>

        <p class="note-card">Content :${note.content}</p>

        <div class="note-actions">
        <button onclick="editNote('${note._id}')">Edit</button>
        <button onclick="deleteNote('${note._id}')">Delete</button>
        </div>

        <hr>
        </div>
        `
    })
};

loadNotes();

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", createNote);

async function createNote(){
    const token = localStorage.getItem("token");

    const title = titleInput.value;
    const content = contentInput.value;

    if(title == "" || content == ""){
        alert("Enter Something");
    }

    const response = await fetch(`${API_URL}/api/note/create-note`, {
        method : "POST",
        headers : {
            "Content-Type":"application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({
            title,
            content
        })
    });

    const data = await response.json();

    console.log(data);

    loadNotes();
};

async function deleteNote(id){
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/note/delete-note/${id}`, {
        method : "DELETE",
        headers : {Authorization : `Bearer ${token}`}
    });

    const data = await response.json();
    
    loadNotes();
};

async function editNote(id){
    const token = localStorage.getItem("token");

    const newTitle = prompt("Enter new title");
    const newContent = prompt("Enter new content");

    const response = await fetch(`${API_URL}/api/note/update-note/${id}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({
            title : newTitle,
            content : newContent
        })
    })

    const data = await response.json();

    loadNotes();
};

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");

    setTimeout(() => {
        window.location.href = "login.html"
    }, 1500);
});