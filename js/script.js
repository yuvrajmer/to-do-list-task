const input = document.getElementById("input");
const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const emptyMsg = document.getElementById("emptyMsg");
const errorMsg = document.getElementById("errorMsg");
const toast = document.getElementById("toast");


let editLi = null;

const defaultPlaceholder = input.placeholder;

function handleTask() {
    const taskText = input.value.trim();

    if (taskText === "") {
        input.classList.add("input-error");
        input.value = "";
        input.placeholder = "Please enter your task";
        input.focus();
        return;
    }

    input.classList.remove("input-error");
    input.placeholder = defaultPlaceholder;

    if (editLi) {
        editLi.querySelector(".task-text").textContent = taskText;
        editLi = null;
        addBtn.textContent = "Add";

        showToast("Task updated successfully ✔");
    } else {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="actions">
                <button class="btn edit-btn" onclick="editTask(this)">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn delete-btn" onclick="removeTask(this)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        list.appendChild(li);
    }

    input.value = "";
    emptyMsg.style.display = "none";
}


function editTask(button) {
    editLi = button.closest("li");
    input.value = editLi.querySelector(".task-text").textContent;
    addBtn.textContent = "Update";
    input.focus();
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function removeTask(button) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    const li = button.closest("li");

    if (li === editLi) {
        editLi = null;
        addBtn.textContent = "Add";
        input.value = "";
    }

    li.remove();
    if (!list.children.length) emptyMsg.style.display = "block";
}

