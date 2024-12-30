let subjects = {};

function addSubject() {
    const newSubjectInput = document.getElementById("newSubject");
    const subjectName = newSubjectInput.value.trim();

    if (!subjectName) {
        alert("Please enter a subject name.");
        return;
    }

    if (subjects[subjectName]) {
        alert("Subject already exists.");
        return;
    }

    subjects[subjectName] = { tests: [], homework: [] };
    newSubjectInput.value = "";
    updateSubjectList();
    renderTaskList();
}

function updateSubjectList() {
    const subjectSelect = document.getElementById("subjectSelect");
    subjectSelect.innerHTML = '<option value="">Select a subject</option>';

    for (const subject in subjects) {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    }
}

function addTask() {
    const selectedSubject = document.getElementById("subjectSelect").value;
    const taskType = document.getElementById("taskType").value;
    const taskName = document.getElementById("taskName").value.trim();
    const taskDate = document.getElementById("taskDate").value;

    if (!selectedSubject) {
        alert("Please select a subject.");
        return;
    }

    if (!taskName || !taskDate) {
        alert("Please provide both task name and date.");
        return;
    }

    const task = { name: taskName, date: new Date(taskDate).toDateString() };

    if (taskType === "test") {
        subjects[selectedSubject].tests.push(task);
    } else {
        subjects[selectedSubject].homework.push(task);
    }

    renderTaskList();
    alert(`Added ${taskType} to ${selectedSubject}.`);
}

function renderTaskList() {
    const taskListContainer = document.getElementById("taskListContainer");
    taskListContainer.innerHTML = "";

    for (const subject in subjects) {
        const subjectDiv = document.createElement("div");
        subjectDiv.classList.add("subject");

        const subjectHeader = document.createElement("h4");
        subjectHeader.textContent = subject;
        subjectDiv.appendChild(subjectHeader);

        const testList = document.createElement("ul");
        testList.innerHTML = "<strong>Tests:</strong>";
        subjects[subject].tests.forEach((test) => {
            const li = document.createElement("li");
            li.textContent = `${test.name} - ${test.date}`;
            testList.appendChild(li);
        });

        const homeworkList = document.createElement("ul");
        homeworkList.innerHTML = "<strong>Homework:</strong>";
        subjects[subject].homework.forEach((homework) => {
            const li = document.createElement("li");
            li.textContent = `${homework.name} - ${homework.date}`;
            homeworkList.appendChild(li);
        });

        subjectDiv.appendChild(testList);
        subjectDiv.appendChild(homeworkList);
        taskListContainer.appendChild(subjectDiv);
    }
}
