let homeworkDates = [];
let testDates = [];

function addEntry() {
    let entryType = document.getElementById("entryType").value;
    let entryDateInput = document.getElementById("entryDate");
    let entryDate = entryDateInput.value;

    if (entryDate) {
        let formattedDate = new Date(entryDate);
        formattedDate.setDate(formattedDate.getDate() + 1); // Correct date to fix off-by-one issue

        if (entryType === "homework") {
            homeworkDates.push(formattedDate);
            updateHomeworkList();
        } else if (entryType === "test") {
            testDates.push(formattedDate);
            updateTestDateList();
            predictNextTestDate();
        }

        // Clear the date input field after adding the entry
        entryDateInput.value = "";
    } else {
        alert("Please select a date!");
    }
}

function updateHomeworkList() {
    let homeworkList = document.getElementById("homeworkList");
    homeworkList.innerHTML = "";

    homeworkDates.forEach((date) => {
        let li = document.createElement("li");
        li.textContent = date.toDateString();
        homeworkList.appendChild(li);
    });
}

function updateTestDateList() {
    let testDateList = document.getElementById("testDateList");
    testDateList.innerHTML = "";

    testDates.forEach((date) => {
        let li = document.createElement("li");
        li.textContent = date.toDateString();
        testDateList.appendChild(li);
    });
}

function predictNextTestDate() {
    if (testDates.length < 2) {
        document.getElementById("predictedTestDate").textContent = "Not enough data to predict.";
        return;
    }

    let intervals = [];
    for (let i = 1; i < testDates.length; i++) {
        let diff = (testDates[i] - testDates[i - 1]) / (1000 * 3600 * 24); // days difference
        intervals.push(diff);
    }

    let averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    let lastTestDate = testDates[testDates.length - 1];
    let nextTestDate = new Date(lastTestDate);
    nextTestDate.setDate(lastTestDate.getDate() + Math.round(averageInterval));
    
    document.getElementById("predictedTestDate").textContent = nextTestDate.toDateString();
}
