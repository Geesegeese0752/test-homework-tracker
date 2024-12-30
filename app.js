let subjects = {};

function addSubject() {
    const newSubjectInput = document.getElementById("newSubject");
    const subjectName = newSubjectInput.value.trim();

    if (!subjectName) {
        alert("Subject name cannot be empty.");
        return;
    }

    if (subjects[subjectName]) {
        alert("Subject already exists.");
        return;
    }

    subjects[subjectName] = { tests: [], homework: [] };
    updateSubjectList();
    newSubjectInput.value = "";
    alert(`Subject "${subjectName}" added successfully!`);
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

    renderTaskList();
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
        alert("Task name and date cannot be empty.");
        return;
    }

    const task = { name: taskName, date: new Date(taskDate) };

    if (taskType === "test") {
        subjects[selectedSubject].tests.push(task);
    } else if (taskType === "homework") {
        subjects[selectedSubject].homework.push(task);
    }

    renderTaskList();
    alert(`${taskType === "test" ? "Test" : "Homework"} added successfully to "${selectedSubject}".`);
}

function renderTaskList() {
    const taskListContainer = document.getElementById("taskListContainer");
    taskListContainer.innerHTML = "";

    for (const subject in subjects) {
        const subjectSection = document.createElement("div");
        subjectSection.className = "subject-section";

        const subjectTitle = document.createElement("h4");
        subjectTitle.textContent = subject;
        subjectSection.appendChild(subjectTitle);

        const testList = document.createElement("ul");
        testList.innerHTML = "<strong>Tests:</strong>";
        subjects[subject].tests.forEach((test) => {
            const li = document.createElement("li");
            li.textContent = `${test.name} - ${test.date.toDateString()}`;
            testList.appendChild(li);
        });

        const homeworkList = document.createElement("ul");
        homeworkList.innerHTML = "<strong>Homework:</strong>";
        subjects[subject].homework.forEach((homework) => {
            const li = document.createElement("li");
            li.textContent = `${homework.name} - ${homework.date.toDateString()}`;
            homeworkList.appendChild(li);
        });

        subjectSection.appendChild(testList);
        subjectSection.appendChild(homeworkList);
        taskListContainer.appendChild(subjectSection);
    }
}
