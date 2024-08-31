document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("createTaskForm");
    const assignedTasksList = document.getElementById("assignedTasksList");
    const completedTasksList = document.getElementById("completedTasksList");
    const myTasksList = document.getElementById("myTasksList");
    const allowedNames = ["Jyoti Gupta", "Saurab", "Aryan", "Akash", "Ankush", "Satyam"];
    const writerNameInput = document.getElementById("writerName");
    const chatMessageInput = document.getElementById("chatMessage");
    const sendButton = document.getElementById("sendButton");
    const chatMessages = document.querySelector(".chat-messages");

    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    storedMessages.forEach(message => {
        const chatMessageElement = document.createElement("div");
        chatMessageElement.className = "chat-message";
        chatMessageElement.textContent = message;
        chatMessages.appendChild(chatMessageElement);
    });

    sendButton.addEventListener("click", function () {
        const writerName = writerNameInput.value;
        const chatMessage = chatMessageInput.value;

        if (writerName && chatMessage) {
            const chatMessageElement = document.createElement("div");
            chatMessageElement.className = "chat-message";
            chatMessageElement.textContent = `${writerName}: ${chatMessage}`;
            chatMessages.appendChild(chatMessageElement);

            const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
            storedMessages.push(`${writerName}: ${chatMessage}`);
            localStorage.setItem("chatMessages", JSON.stringify(storedMessages));

            chatMessageInput.value = "";
        } else {
            alert("Please select your name and type a message.");
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskName = form.querySelector("#taskName").value;
        const assignedBy = form.querySelector("#assignedTo").value;
        const dueDate = form.querySelector("#dueDate").value;

        const newTask = document.createElement("li");
        newTask.className = "task";
        newTask.innerHTML = `
            <div class="task-info">
                <h4>${taskName}</h4>
                <p class="task-due-date">Due on: ${dueDate}</p>
                <p class="task-assigne">Assigned by: ${assignedBy}</p>
            </div>
            <div class="task-actions">
                <button class="btn-start">Start Task</button>
                <button class="btn-complete">Task Completed</button>
            </div>
            <div class="comment-section">
                <textarea class="comment-input" placeholder="Add a comment"></textarea>
                <button class="comment-submit">Add Comment</button>
                <select class="commenter-names">
                    <option value="Jyoti Gupta">Jyoti Gupta</option>
                    <option value="Saurab">Saurab</option>
                    <option value="Aryan">Aryan</option>
                    <option value="Akash">Akash</option>
                    <option value="Ankush">Ankush</option>
                    <option value="Satyam">Satyam</option>
                </select>
            </div>
            <div class="github-link">
                <label for="githubLink">GitHub Link:</label>
                <input type="text" class="github-link-input">
            </div>
        `;

        const startTaskButton = newTask.querySelector(".btn-start");
        const completeTaskButton = newTask.querySelector(".btn-complete");
        const commentInput = newTask.querySelector(".comment-input");
        const commentSubmitButton = newTask.querySelector(".comment-submit");
        const githubLinkInput = newTask.querySelector(".github-link-input");
        const commenterNames = newTask.querySelector(".commenter-names");

        startTaskButton.addEventListener("click", function () {
            startTaskButton.style.backgroundColor = "blue";
        });

        completeTaskButton.addEventListener("click", function () {
            newTask.style.display = "none";
            completedTasksList.appendChild(newTask);
        });

        commentSubmitButton.addEventListener("click", function () {
            const comment = commentInput.value;
            if (comment) {
                const commentElement = document.createElement("p");
                commentElement.className = "comment";
                commentElement.textContent = `${commenterNames.value}: ${comment}`;
                newTask.appendChild(commentElement);
                commentInput.value = "";
            } else {
                alert("Please type a comment.");
            }
        });

        githubLinkInput.addEventListener("change", function () {
            console.log("GitHub link changed to: ", githubLinkInput.value);
        });

        myTasksList.appendChild(newTask);
    });
});
