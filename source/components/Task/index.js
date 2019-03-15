// Core
import React, { PureComponent, createRef } from 'react';
import Checkbox from '../../theme/assets/Checkbox';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Star from '../../theme/assets/Star';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {

    state={
        isTaskEditing:  false,
        newTaskMessage: this.props.message,
    }
    taskNameInput = createRef();

    _removeTask = () => {
        this.props._removeTaskAsync(this.props.id);
    }
   _updateTask = () => {
       const { _updateTaskAsync, message } = this.props;

       if (message === this.state.newMessage) {
           this._setTaskEditingState(false);

           return null;
       }

       _updateTaskAsync(this._getTaskShape({ message: this.state.newMessage }));
       this._setTaskEditingState(false);
   }
   _setTaskEditingState= (isTaskEditing) => {
       {
           this.setState({
               isTaskEditing,
           });
           if (this.state.isTaskEditing) {
               this.taskNameInput.current.focus();
           }
       }
   }
   _updateNewTaskMessage = (e) => {
       this.setState({
           newMessage: e.target.value,
       });
   }

   _updateTaskMessageOnClick = () => {
       this._setTaskEditingState(true);
       if (this.state.isTaskEditing) {
           this._updateTask();

           return null;
       }
   }

   _updateTask = () => {
       this.props._updateTaskAsync();
       this._setTaskEditingState(false);
   }

   _updateTaskMessageOnKeyDown = (e) => {

       if (!this.state.message.length) {
           return null;
       }

       switch (e.key) {
           case 'Enter': {
               this._updateTask();
               break;
           }

           case 'Escape': {
               this._cancelUpdatingTaskMessage();
               break;
           }
           default:
               break;
       }
   }
   _removeTask = () => {
       this.props._removeTaskAsync(this.props.id);
   }
   _toggleTaskFavoriteState= () => {
       const { _updateTaskAsync, favorite } = this.props;

       const taskToUpdate = this._getTaskShape({ favorite: !favorite });

       _updateTaskAsync(taskToUpdate);
   }
   _toggleTaskCompletedState= () => {
       this.props._updateTaskAsync();
   }
   _cancelUpdatingTaskMessage = () => {
       this.setState({
           isTaskEditing:  false,
           newTaskMessage: this.props.message,
       });
   }

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    render () {
        const currentMessage = this.state.isTaskEditing ? this.state.newMessage : this.props.message;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { this.props.completed }
                        className = { Styles.toggleTaskCompletedState }
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled = { !this.props.isTaskEditing }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { currentMessage }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { this.props.favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { this.props.isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }

}
