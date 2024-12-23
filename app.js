// Array to store test dates
const testDates = [];

// Function to add a test date
function addTestDate() {
    const testDateInput = document.getElementById("testDate").value;

    if (!testDateInput) {
        alert("Please select a date.");
        return;
    }

    // Correctly parse the input date in local time
    const [year, month, day] = testDateInput.split("-");
    const testDate = new Date(year, month - 1, day); // Month is zero-indexed in JavaScript
    testDates.push(testDate);

    updateTestDateList();
    predictNextTestDate();
}

// Function to update the displayed list of test dates
function updateTestDateList() {
    const testDateList = document.getElementById("testDateList");
    testDateList.innerHTML = "";

    testDates.forEach(date => {
        const listItem = document.createElement("li");
        listItem.textContent = date.toDateString();
        testDateList.appendChild(listItem);
    });
}

// Function to predict the next test date
function predictNextTestDate() {
    if (testDates.length < 2) {
        document.getElementById("predictedTestDate").textContent =
            "Not enough test dates to predict the next one.";
        return;
    }

    // Sort dates and calculate average interval
    const sortedDates = testDates.sort((a, b) => a - b);
    let totalInterval = 0;

    for (let i = 1; i < sortedDates.length; i++) {
        totalInterval += (sortedDates[i] - sortedDates[i - 1]);
    }

    const averageInterval = totalInterval / (sortedDates.length - 1);
    const lastTestDate = sortedDates[sortedDates.length - 1];
    const predictedDate = new Date(lastTestDate.getTime() + averageInterval);

    document.getElementById("predictedTestDate").textContent =
        `The next test date might be around: ${predictedDate.toDateString()}`;
}
