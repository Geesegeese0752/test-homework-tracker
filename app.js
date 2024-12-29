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
    const subjectSelect = document.getElementById("subjectSelect");
    const selectedSubject = subjectSelect.value;
    const dateInput = document.getElementById("dateInput").value;
    const dateType = document.getElementById("dateType").value;

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
        subjects[selectedSubject].testDates.push(date);
    } else {
        subjects[selectedSubject].homeworkDates.push(date);
    }

    updateDateLists(selectedSubject);
    predictNextTestDate(selectedSubject);
}

function updateDateLists(subject) {
    const testDateList = document.getElementById("testDateList");
    const homeworkDateList = document.getElementById("homeworkDateList");
    const currentSubject = document.getElementById("currentSubject");

    testDateList.innerHTML = "";
    homeworkDateList.innerHTML = "";
    currentSubject.textContent = subject;

    subjects[subject].testDates.forEach((date) => {
        const li = document.createElement("li");
        li.textContent = date.toDateString();
        testDateList.appendChild(li);
    });

    subjects[subject].homeworkDates.forEach((date) => {
        const li = document.createElement("li");
        li.textContent = date.toDateString();
        homeworkDateList.appendChild(li);
    });
}

function predictNextTestDate(subject) {
    const testDates = subjects[subject].testDates;

    if (testDates.length < 2) {
        document.getElementById("predictedTestDate").textContent = "Not enough data to predict.";
        return;
    }

    let intervals = [];
    for (let i = 1; i < testDates.length; i++) {
        let diff = (testDates[i] - testDates[i - 1]) / (1000 * 3600 * 24); // days difference
        intervals.push(diff);
    }

    const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const lastTestDate = testDates[testDates.length - 1];
    const nextTestDate = new Date(lastTestDate);
    nextTestDate.setDate(lastTestDate.getDate() + averageInterval);

    document.getElementById("predictedTestDate").textContent = nextTestDate.toDateString();
}
