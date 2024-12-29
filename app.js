let subjects = {};

function addSubject() {
    const newSubjectInput = document.getElementById("newSubject");
    const subjectName = newSubjectInput.value.trim(); // Get the trimmed subject name

    if (!subjectName) {
        alert("Subject name cannot be empty.");
        return;
    }

    if (subjects[subjectName]) {
        alert("Subject already exists.");
        return;
    }

    // Add the new subject to the subjects object
    subjects[subjectName] = { testDates: [], homeworkDates: [] };

    // Update the dropdown list
    updateSubjectList();

    // Clear the input field
    newSubjectInput.value = "";

    // Alert the user of the addition
    alert(`Subject "${subjectName}" added successfully!`);
}

function updateSubjectList() {
    const subjectSelect = document.getElementById("subjectSelect");

    // Clear the existing dropdown options
    subjectSelect.innerHTML = '<option value="">Select a subject</option>';

    // Add all subjects to the dropdown
    for (const subject in subjects) {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    }
}
