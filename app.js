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

    subjects[subjectName] = { testDates: [], homeworkDates: [] };
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
    subjects[selectedSubject][`${dateType}Dates`].push(date);
    updateDateList(selectedSubject, dateType);
    if (dateType === "test") {
        predictNextTestDate(selectedSubject);
    }
}

function updateDateList(subject, dateType) {
    const dateList = document.getElementById("dateList");
    dateList.innerHTML = "";

    subjects[subject][`${dateType}Dates`].forEach((date) => {
        const li = document.createElement("li");
        li.textContent = `${dateType === "test" ? "Test" : "Homework"}: ${date.toDateString()}`;
        dateList.appendChild(li);
    });
}

function predictNextTestDate(subject) {
    const testDates = subjects[subject].testDates;

    if (testDates.length < 2) {
        document.getElementById("predictedTestDate").textContent = "Not enough data to predict.";
        return;
    }

    const intervals = [];
    for (let i = 1; i < testDates.length; i++) {
        const diff = (testDates[i] - testDates[i - 1]) / (1000 * 3600 * 24);
        intervals.push(diff);
    }

    const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const lastTestDate = testDates[testDates.length - 1];
    const nextTestDate = new Date(lastTestDate);
    nextTestDate.setDate(lastTestDate.getDate() + averageInterval);

    document.getElementById("predictedTestDate").textContent = `Predicted: ${nextTestDate.toDateString()}`;
}
