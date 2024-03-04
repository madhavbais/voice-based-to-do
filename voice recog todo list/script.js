if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    let taskInput = document.querySelector('#taskInput');
    let taskList = document.querySelector('#taskList');

    recognition.onresult = (event) => {
        let translate = event.results[0][0].transcript;
        taskInput.value = translate;
        addTask();
    };

    recognition.onend = () => {
        recognition.stop();
    };

    function addTask() {
        let taskText = taskInput.value.trim();

        if (taskText !== '') {
            let taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${taskText}</span><button id="deleteBtn" onclick="deleteTask(this)">Delete</button>
            `;
            taskList.appendChild(taskItem);
            taskInput.value = '';
        }
    }

    function deleteTask(e) {
        let liParent = e.parentNode;
       
             taskList.removeChild(liParent);
        
       
    }

    taskInput.addEventListener('focus', () => {
        recognition.start();
    });

    button.addEventListener('click', () => {
        addTask();
    });
} else {
    alert('Your browser does not support speech recognition.');
}