let subjects = {}; // Object to hold subjects with their tasks

// Function to add a new subject to the subject list
function addSubject() {
    const subjectInput = document.getElementById('subjectInput');
    const subjectName = subjectInput.value.trim();

    if (subjectName !== '') {
        if (!subjects[subjectName]) {
            // Initialize the subject with empty arrays for tests and homework
            subjects[subjectName] = { tests: [], homework: [] };
            
            // Update the subject dropdown
            const subjectSelect = document.getElementById('subjectSelector');
            const newOption = document.createElement('option');
            newOption.value = subjectName;
            newOption.textContent = subjectName;
            subjectSelect.appendChild(newOption);

            // Update the subjects list with the new subject
            renderSubjectsList();
            subjectInput.value = ''; // Clear the input
        } else {
            alert('Subject already exists.');
        }
    } else {
        alert('Please enter a subject name');
    }
}

// Function to add a task (homework/test) to the selected subject
function addTask() {
    const subjectSelect = document.getElementById('subjectSelector');
    const taskName = document.getElementById('taskName').value.trim();
    const taskDate = document.getElementById('taskDate').value;
    const taskType = document.getElementById('taskType').value;

    const selectedSubject = subjectSelect.value;

    if (selectedSubject && taskName !== '' && taskDate !== '') {
        const task = { name: taskName, date: new Date(taskDate).toDateString(), rawDate: new Date(taskDate) };

        // Add the task to the appropriate subject (homework or test)
        if (taskType === 'homework') {
            subjects[selectedSubject].homework.push(task);
        } else {
            subjects[selectedSubject].tests.push(task);
        }

        // Update the subject's task list and render the overview
        renderSubjectsList();

        // Clear the input fields
        document.getElementById('taskName').value = '';
        document.getElementById('taskDate').value = '';
        document.getElementById('taskType').value = 'homework';
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to render the list of subjects with their tasks
function renderSubjectsList() {
    const subjectsListContainer = document.getElementById('subjectsList');
    subjectsListContainer.innerHTML = ''; // Clear existing list

    // Loop through each subject and display their homework and tests
    for (const subject in subjects) {
        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject');
        
        const subjectHeader = document.createElement('h4');
        subjectHeader.textContent = subject;
        subjectDiv.appendChild(subjectHeader);

        const taskList = document.createElement('div');
        
        // Display Homework
        if (subjects[subject].homework.length > 0) {
            const homeworkList = document.createElement('ul');
            homeworkList.innerHTML = '<strong>Homework:</strong>';
            subjects[subject].homework.forEach(task => {
                const li = document.createElement('li');
                const taskDate = new Date(task.rawDate);
                const currentDate = new Date();

                // Check if the task date is in the past (overdue)
                if (taskDate < currentDate) {
                    li.style.textDecoration = 'line-through';  // Strike-through overdue tasks
                    li.style.color = 'gray';  // Make overdue tasks appear gray
                }

                li.textContent = `${task.name} - ${task.date}`;
                homeworkList.appendChild(li);
            });
            taskList.appendChild(homeworkList);
        }

        // Display Tests
        if (subjects[subject].tests.length > 0) {
            const testList = document.createElement('ul');
            testList.innerHTML = '<strong>Tests:</strong>';
            subjects[subject].tests.forEach(task => {
                const li = document.createElement('li');
                const taskDate = new Date(task.rawDate);
                const currentDate = new Date();

                // Check if the task date is in the past (overdue)
                if (taskDate < currentDate) {
                    li.style.textDecoration = 'line-through';  // Strike-through overdue tasks
                    li.style.color = 'gray';  // Make overdue tasks appear gray
                }

                li.textContent = `${task.name} - ${task.date}`;
                testList.appendChild(li);
            });
            taskList.appendChild(testList);
        }

        subjectDiv.appendChild(taskList);
        subjectsListContainer.appendChild(subjectDiv);
    }
}
