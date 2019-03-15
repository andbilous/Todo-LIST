// Core
import React, { Component } from 'react';
import Task from '../Task/index';
import Checkbox from '../../theme/assets/Checkbox';
// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST/api'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import { async } from 'q';
import { sortTasksByGroup } from '../../instruments';

import Spinner from '../Spinner/index';

export default class Scheduler extends Component {
        state= {
            tasks:           [],
            newTaskMessage:  '',
            tasksFilter:     '',
            isTasksFetching: false,
        };

        componentDidMount () {
            this._fetchTasksAsync();
        }

    _updateTaskAsync= async (updatedTask) => {
        this._setTasksFetchingState(true);
        const taskToBeUpdated= await api.updateTask(updatedTask);
        const indexOfTaskToReplace = this.state.tasks.indexOf(this.state.tasks.find((task) => task.id === taskToBeUpdated.id));
        const newTaskList = [...this.state.tasks.filter((task) => task.id !== updatedTask.id)];

        newTaskList.splice(indexOfTaskToReplace, 0, newTaskList);

        this.setState({
            tasks: sortTasksByGroup(newTaskList),
        });
        this._setTasksFetchingState(false);
    };

  _fetchTasksAsync = async () => {
      this._setTasksFetchingState(true);
      const tasks = await api.fetchTasks();

      this.setState({ tasks: sortTasksByGroup(tasks) });
      this._setTasksFetchingState(false);
  };

    _updateTasksFilter= (e) => {
        this.setState({
            tasksFilter: e.target.value.toLowerCase(),
        });
    }

    _updateNewTaskMessage= (e) => {
        this.setState({
            newTaskMessage: e.target.value,
        });
    }

    _getAllCompleted = () => {
        this.state.tasks.every(
            (task) => task.completed);
    }

    _createTaskAsync = async (e) => {
        e.preventDefault();
        if (!this.state.newTaskMessage==='') {
            await api.createTask(this.state.newTaskMessage);
        } else {
            return null;
        }
        this._setTasksFetchingState(true);
        const newTask=  api.createTask(this.state.newTaskMessage);

        this.setState({
            tasks:          sortTasksByGroup([newTask, ...tasks]),
            newTaskMessage: '',
        });
        this._setTasksFetchingState(false);
    }

    _removeTaskAsync = async (taskId) => {
        this._setTasksFetchingState(true);
        await api.removeTask(taskId);
        this.setState({
            tasks:           tasks.filter((task) => task.id !== taskId),
            isTasksFetching: false,
        });
        this._setTasksFetchingState(false);
    }

    _completeAllTasksAsync= async () => {
        if (this._getAllCompleted()) {
            return null;
        }
        this._setTasksFetchingState(true);
        await api.completeAllTasks(this.state.tasks);
        this.setState({
            tasks: sortTasksByGroup(tasks.map((task) => ({
                ...task, completed: true,
            }))),
        });
        this._setTasksFetchingState(false);
    }

    _setTasksFetchingState = (fetchingState) => {
        this.setState({
            isTasksFetching: fetchingState,
        });
    }

    render () {
        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { this.state.isTasksFetching } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                onChange = { this._updateNewTaskMessage }
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = { this.state.newTaskMessage }
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                                {todoList}
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            onClick = { this._completeAllTasksAsync }
                            checked = { allCompleted }
                        />
                        <span className = { Styles.completeAllTasks }>Все задачи выполнены</span>
                    </footer>
                </main>
            </section>
        );
    }
}
