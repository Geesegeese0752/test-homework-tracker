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
}

function addDate() {
    const selectedSubject = document.getElementById("subjectSelect").value;
    const dateType = document.getElementById("dateType").value;
    const dateInput = document.getElementById("dateInput").value;

    if (!selectedSubject) {
        alert("Please select a subject.");
        return;
    }

    if (!dateInput) {
        alert("Please select a date.");
        return;
    }

    const date = new Date(dateInput);

    if (dateType === "test") {
        subjects[selectedSubject].tests.push(date);
        updateTestList(selectedSubject);
    } else if (dateType === "homework") {
        const homeworkName = document.getElementById("homeworkName").value.trim();

        if (!homeworkName) {
            alert("Please enter a homework name.");
            return;
        }

        subjects[selectedSubject].homework.push({ name: homeworkName, date: date });
        updateHomeworkList(selectedSubject);
    }
}

function updateTestList(subject) {
    const testDateList = document.getElementById("testDateList");
    testDateList.innerHTML = "";

    subjects[subject].tests.forEach((testDate) => {
        const li = document.createElement("li");
        li.textContent = testDate.toDateString();
        testDateList.appendChild(li);
    });
}

function updateHomeworkList(subject) {
    const homeworkList = document.getElementById("homeworkList");
    homeworkList.innerHTML = "";

    subjects[subject].homework.forEach((homework) => {
        const li = document.createElement("li");
        li.textContent = `${homework.name} - ${homework.date.toDateString()}`;
        homeworkList.appendChild(li);
    });
}

document.getElementById("dateType").addEventListener("change", (event) => {
    const homeworkNameField = document.getElementById("homeworkNameField");
    if (event.target.value === "homework") {
        homeworkNameField.style.display = "block";
    } else {
        homeworkNameField.style.display = "none";
    }
});
