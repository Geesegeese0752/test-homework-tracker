let testDates = [];

function addTestDate() {
    let testDateInput = document.getElementById("testDate");
    let testDate = testDateInput.value;

    if (testDate) {
        testDates.push(new Date(testDate));
        updateTestDateList();
        predictNextTestDate();
    }
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
    nextTestDate.setDate(lastTestDate.getDate() + averageInterval);

    document.getElementById("predictedTestDate").textContent = nextTestDate.toDateString();
}
