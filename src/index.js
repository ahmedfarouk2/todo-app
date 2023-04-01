/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import './styles/style.css';
import moment from 'moment';

window.addEventListener('load', () => {
  setTimeout(() => {
    const projectNames = document.querySelectorAll('li');
    for (let i = 0; i < projectNames.length; i++) {
      projectNames[i].addEventListener('click', () => {
        setTimeout(() => {
          const outerTaskDiv = document.querySelector('.main-task-div');
          const mainTaskDiv = document.createElement('div');
          mainTaskDiv.classList.add('new-tasks');
          outerTaskDiv.append(mainTaskDiv);
          const projectName = projectNames[i].innerText;
          const savedTasks = JSON.parse(localStorage.getItem(`${projectName}`) || '[]');
          for (let j = 0; j < savedTasks.length; j++) {
            mainTaskDiv.innerHTML += savedTasks[j];
          }
          const newTask = document.querySelectorAll('.tasks');
          const finishedCheckbox = document.querySelectorAll('#finished');
          for (let z = 0; z < finishedCheckbox.length; z++) {
            finishedCheckbox[z].addEventListener('click', () => {
              setTimeout(() => {
                newTask[z].remove();
              }, 1000);
              const tasksDiv = document.querySelectorAll('.tasks');
              const divArr = JSON.parse(localStorage.getItem(`${projectName}`));
              const indexTaskName = JSON.parse(localStorage.getItem(`${projectName}`)).indexOf(tasksDiv[z].outerHTML);
              divArr.splice(indexTaskName, 1);
              localStorage.setItem(`${projectName}`, JSON.stringify(divArr));
            });
          }
        }, 2000);
      });
    }
  }, 500);
});

window.addEventListener('load', () => {
  setTimeout(() => {
    const projectNames = document.querySelectorAll('li');
    for (let i = 0; i < projectNames.length; i++) {
      const xButtonForm = document.querySelector('.x-button');
      const main = document.querySelector('main');
      projectNames[i].addEventListener('click', (e) => {
        main.innerText = '';
        const h1 = document.createElement('h1');
        const div = document.createElement('div');
        div.classList.add('main-task-div');
        const div2 = document.createElement('div');
        h1.innerText = `Welcome to project ${projectNames[i].innerText}`;
        div.innerHTML = '<span class ="addNewTask">Add a new task</span>';
        div2.innerText = 'Delete This Project';
        div2.classList.add('delete-project');
        main.append(h1);
        main.append(div);
        main.append(div2);
        const deleteProjectBtn = document.querySelector('.delete-project');
        deleteProjectBtn.addEventListener('click', (e) => {
          projectNames[i].remove();
          main.innerText = '';
          const liArr = JSON.parse(localStorage.getItem('Projects'));
          const indexProjectName = JSON.parse(localStorage.getItem('Projects')).indexOf(projectNames[i].outerHTML);
          liArr.splice(indexProjectName, 1);
          localStorage.setItem('Projects', JSON.stringify(liArr));
        });
        const addNewTask = document.querySelector('.addNewTask');
        addNewTask.addEventListener('click', (e) => {
          const newTaskForm = document.querySelector('.tasks-form-container');
          const submitTaskButton = document.querySelector('#submit-task-btn');
          setTimeout(() => {
            newTaskForm.classList.add('task-form-appear');
          }, 1);
          newTaskForm.style.display = 'flex';
          xButtonForm.addEventListener('click', (e) => {
            e.preventDefault();
            newTaskForm.style.display = 'none';
            newTaskForm.classList.remove('project-form-appear');
          });
          submitTaskButton.addEventListener('click', (e) => {
            const taskName = document.querySelector('#task-name');
            const taskDescription = document.querySelector('#task-description');
            const taskDate = moment().format(document.querySelector('#task-duedate').value);
            e.preventDefault();
            const div1 = document.createElement('div');
            div1.classList.add('new-tasks');
            div1.innerHTML = `<div class ="tasks"><span>Task Name: ${taskName.value}</span><span>Task Description: ${taskDescription.value}</span><span>Task Date: ${taskDate}</span><span><input type="checkbox" id="finished"></span></div>`;
            div.append(div1);
            let divArr = JSON.parse(localStorage.getItem(`${projectNames[i].innerText}`) || '[]');
            divArr.push(div1.innerHTML);
            localStorage.setItem(`${projectNames[i].innerText}`, JSON.stringify(divArr));
            divArr = [];
            newTaskForm.style.display = 'none';
            newTaskForm.classList.remove('tasks-form-appear');
            const newTask = document.querySelectorAll('.tasks');
            const finishedCheckbox = document.querySelectorAll('#finished');
            for (let z = 0; z < finishedCheckbox.length; z++) {
              finishedCheckbox[z].addEventListener('click', (e) => {
                newTask[z].remove();
              });
            }
          }, { once: true });
        });
      });
    }
  });
}, 1000);
