// Core
import React, { Component } from 'react';
import Task from '../Task/index';
import { FlipMove, FlipMovePropConverter } from 'react-flip-move';
// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST/api'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import { async } from 'q';

import Spinner from '../Spinner/index';

export default class Scheduler extends Component {
        state= {
            tasks:           [],
            newTaskMessage:  '',
            tasksFilter:     '',
            isTasksFetching: false,
        };

    _updateTaskAsync= async (task) => {
        this._setTasksFetchingState(true);
        await api.updateTask(task);
        this._setTasksFetchingState(false);
    };
  _fetchTasksAsync = async () => {
      this._setTasksFetchingState(true);
      if (this.state.newTaskMessage==='') {
          return null;
      }
      this.setState({ tasks: await api.fetchTasks() });
      this._setTasksFetchingState(false);
  };
    _updateTasksFilter= (e) => {
        this.setState({
            tasksFilter: e.target.value.toLowerCase(),
        });
    }
    _updateNewTaskMessage= (e) => {
        //  e.preventDefault();
        this.setState({
            newTaskMessage: e.target.value,
        });
    }
    _getAllCompleted = (e) => {
        this.state.tasks.map((task) => {
            if (!task.completed) {
                return false;
            }

            return true;
        });
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
            tasks:          this.state.tasks.push(newTask),
            newTaskMessage: '',
        });
        this._setTasksFetchingState(false);
    }

    _removeTaskAsync = async (e) => {
        this._setTasksFetchingState(true);
        await api.removeTask(e.target.id);
        this._setTasksFetchingState(false);
    }

    _completeAllTasksAsync= async (e) => {
        this._setTasksFetchingState(true);
        const notCompletedTasks=[];

        for (let i=0; i<this.state.tasks.length; i++) {
            if (!this.state.tasks[i].completed) {
                notCompletedTasks.push(this.state.tasks[0]);
            }
        }
        await api.completeAllTasks(notCompletedTasks);
        this.state.tasks.map((task) => {
            if (!task.completed) {
                api.completeAllTasks(task);
            }

            return task.completed=true;
        });

        return null;
    }

    _setTasksFetchingState = (arg) => {
        this.setState({
            isTasksFetching: arg,
        });
    }
    render () {
        return (
            <section
                className = { Styles.Scheduler }>
                <Spinner isSpinning>
                    <div className = { Styles.Spinner } />
                </Spinner>
                <main>
                    <header>
                        <h1>
                      Планировщик задач
                        </h1>
                        <input
                            onChange = { this._updateTasksFilter }
                            placeholder = 'Поиск'
                            type = 'search'
                            value = ''
                        />
                    </header>
                    <section>
                        <form
                            onSubmit = { this._createTaskAsync }>
                            <input
                                className = { this._createTaskAsync }
                                maxLength = { 50 }
                                onChange = { this._updateNewTaskMessage }
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = ''
                            />
                            <button>
                Добавить задачу
                            </button>
                        </form>
                    </section>
                </main>
            </section>
        );
    }
}
