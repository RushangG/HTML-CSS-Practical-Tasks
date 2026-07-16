
//class for task
class Task {

    // constructor for task class
    constructor(task_name, description = '', id = Date.now(), status = false, date = new Date()) {
        this.task_name = task_name;
        this.description = description;
        this.date = date;
        this.id = id;
        this.status = status;
    }

    toggleStatus() {
        this.status = !this.status;
    }

}

//class for to-do list
class ToDoList {

    constructor() {



        this.taskInput = document.getElementById('task');
        this.taskCard = document.getElementById('task-card');
        this.taskMessage = document.getElementById('task-message');
        this.descriptionInput = document.getElementById('description');

        this.addTaskButton = document.getElementById('add-task');

        this.addTaskButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.addTask();
        });



        this.fetchLocalStorageTasks();
        this.showTasks();


    }

    //update local storage
    updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    //add local storage task only
    fetchLocalStorageTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.tasks = storedTasks.map(task => new Task(task.task_name, task.description, task.id, task.status, task.date));
    }

    // add task to the list
    addTask() {
        const taskName = this.taskInput.value.trim();
        const taskDescription = this.descriptionInput.value.trim();
        if (taskName === '' || taskDescription === '') {
            this.taskMessage.textContent = 'Please enter a task and description';
            this.taskMessage.style.color = 'red';

            return;
        }

        const taskId = this.addTaskButton.dataset.taskId;
        if (taskId) {
            const taskIndex = this.tasks.findIndex(task => task.id == taskId);
            if (taskIndex !== -1) {
                this.tasks[taskIndex].task_name = taskName;
                this.tasks[taskIndex].description = taskDescription;
                this.tasks[taskIndex].date = new Date();
                this.tasks[taskIndex].status = false; // Reset status to pending when edited
            }


            this.taskMessage.textContent = 'Task updated successfully';



        }
        else {

            const newTask = new Task(taskName, taskDescription, Date.now(), false, new Date());
            this.tasks.push(newTask);
            this.taskMessage.textContent = 'Task added successfully';

        }
        this.updateLocalStorage();

        this.taskMessage.style.color = 'green';


        setTimeout(() => {
            this.taskMessage.textContent = '';
        }, 2000);

        this.resetForm();
        this.showTasks();
    }

    //display tasks on the page
    showTasks() {

        this.taskCard.innerHTML = ''; // Clear existing tasks

        if (this.tasks.length === 0) {
            this.taskCard.innerHTML = '<p>No tasks available.</p>';
            return;
        }

        this.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-card-item');

            taskElement.innerHTML = `
                    <h3 ${task.status ? 'style="text-decoration: underline line-through;"' : ''}>${task.task_name}</h3>
                    <p ${task.status ? 'style="text-decoration: line-through;"' : ''}>${task.description}</p>
                    <p>Status: ${task.status ? 'Completed' : 'Pending'}</p>
                    <p>Date: ${new Date(task.date).toLocaleString()}</p>
                    <label>
                        <input  type="checkbox" ${task.status ? 'checked' : ''} class="status-checkbox">
                        <span>${task.status ? 'Completed' : 'Pending'}</span>
                    </label>
                    <button class="edit-button" >Edit</button>
                    <button class="delete-button" >Delete</button> 
                    
                   `;

            const checkbox = taskElement.querySelector('.status-checkbox');

            checkbox.addEventListener('change', () => {
                this.toggleTaskStatus(task.id);
            });

            const editTask = taskElement.querySelector('.edit-button');
            editTask.addEventListener('click', () => {
                this.editTask(task.id);
            });

            const deleteTask = taskElement.querySelector('.delete-button');
            deleteTask.addEventListener('click', () => {
                this.deleteTask(task.id);
            })

            this.taskCard.appendChild(taskElement);


        });
    }

    //toggle task status
    toggleTaskStatus(Id) {
        const task = this.tasks.find(task => task.id == Id);
        if (task) {
            task.toggleStatus();
            this.updateLocalStorage();
            this.showTasks();
        }
    }


    // reset form after adding or updating task
    resetForm() {
        this.taskInput.value = '';
        this.descriptionInput.value = '';
        this.addTaskButton.textContent = 'Add Task';
        delete this.addTaskButton.dataset.taskId;
    }

    // edit task by id
    editTask(Id) {
        const task = this.tasks.find(task => task.id == Id);

        if (!task) {
            alert('Task not found');
            return;
        }
        else {
            this.taskInput.value = task.task_name;
            this.descriptionInput.value = task.description;
            this.addTaskButton.textContent = 'Update Task';
            this.addTaskButton.dataset.taskId = Id;

        }
    }

    // delete task by id
    deleteTask(Id) {


        const taskIndex = this.tasks.findIndex(task => task.id == Id);

        if (taskIndex === -1) {
            alert('Task not found');
            return;
        }
        else if (confirm('Are you sure you want to delete this task?')) {
            this.tasks.splice(taskIndex, 1);
            this.updateLocalStorage();
            this.showTasks();
            this.resetForm();
        }
    }


};


// Initialize the ToDoList when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    new ToDoList();
})
