/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import moment from 'moment';

const newProjectButton = document.querySelector('.new-project');
const newProjectForm = document.querySelector('.project-form-container');
const xButtonForm = document.querySelector('.x-button');
const submitProjectButton = document.querySelector('#submit-project-btn');
const projectName = document.querySelector('#project-name');
const newProjectSpace = document.querySelector('.new-project-insertion');

window.addEventListener('load', (e) => {
  const savedProjectNames = JSON.parse(localStorage.getItem('Projects' || '[]'));
  for (let i = 0; i < savedProjectNames.length; i++) {
    newProjectSpace.innerHTML += savedProjectNames[i];
  }
});

function classAddingFormAppear() {
  newProjectForm.classList.add('project-form-appear');
}

function projectFormAppear() {
  newProjectForm.style.display = 'flex';
  setTimeout(classAddingFormAppear, 1);
}

function closeProjectForm(e) {
  e.preventDefault();
  newProjectForm.style.display = 'none';
  newProjectForm.classList.remove('project-form-appear');
}

function submitProjectName(e) {
  e.preventDefault();
  const li = document.createElement('li');
  li.innerText = projectName.value;
  newProjectSpace.append(li);
  newProjectForm.style.display = 'none';
  const liArr = JSON.parse(localStorage.getItem('Projects') || '[]');
  liArr.push(li.outerHTML);
  localStorage.setItem('Projects', JSON.stringify(liArr));
  newProjectForm.classList.remove('project-form-appear');
  const projectNames = document.querySelectorAll('li');
  for (let i = 0; i < projectNames.length; i++) {
    const main = document.querySelector('main');
    projectNames[i].addEventListener('click', () => {
      main.innerText = '';
      const h1 = document.createElement('h1');
      const div = document.createElement('div');
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
          const newTask = document.querySelectorAll('.new-tasks');
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
}

newProjectButton.addEventListener('click', projectFormAppear);
xButtonForm.addEventListener('click', closeProjectForm);
submitProjectButton.addEventListener('click', submitProjectName);
