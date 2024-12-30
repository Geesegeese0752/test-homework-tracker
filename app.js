// Function to add a new subject to the subject list
function addSubject() {
    const subjectInput = document.getElementById('newSubject');
    const subjectName = subjectInput.value.trim();

    if (subjectName !== '') {
        // Create a new subject element in the subject list
        const subjectSelect = document.getElementById('subjectSelect');
        
        // Create new option element for the subject
        const newOption = document.createElement('option');
        newOption.value = subjectName;
        newOption.textContent = subjectName;
        
        // Append the new option to the dropdown
        subjectSelect.appendChild(newOption);
        
        // Also update the subjects list below the form
        const subjectsList = document.getElementById('subjectsList');
        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject');
        subjectDiv.innerHTML = `
            <h4>${subjectName}</h4>
        `;
        subjectsList.appendChild(subjectDiv);
        
        // Clear the input field after adding the subject
        subjectInput.value = '';
    } else {
        alert('Please enter a subject name');
    }
}

// Function to add a task (homework/test)
function addTask() {
    const subjectSelect = document.getElementById('subjectSelect');
    const taskName = document.getElementById('taskName').value.trim();
    const taskDate = document.getElementById('taskDate').value;
    const taskType = document.getElementById('taskType').value;

    if (subjectSelect.value && taskName !== '' && taskDate !== '') {
        // Add task to the reminders section
        const upcomingTasks = document.getElementById('upcomingTasks');
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <strong>${taskName}</strong><br>
            <em>Subject: ${subjectSelect.value}</em><br>
            <em>Type: ${taskType}</em><br>
            <em>Due Date: ${taskDate}</em>
        `;
        upcomingTasks.appendChild(taskItem);

        // Clear the input fields after adding the task
        document.getElementById('taskName').value = '';
        document.getElementById('taskDate').value = '';
        document.getElementById('taskType').value = 'homework';
    } else {
        alert('Please fill in all the fields.');
    }
}
