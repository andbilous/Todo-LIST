import { MAIN_URL, TOKEN } from './config';
export const api = {

    async fetchTasks () {
        const response=   await fetch(MAIN_URL, {
            method:  'GET',
            headers: new Headers({
                'Authorization': TOKEN,
            }),
        });
        const { data: tasks } =await response.json();

        if (response.status.ok) {
            return tasks;
        } throw new Error('Error while fetching');
    },

    async createTask () {
        const response=   await fetch(MAIN_URL, {
            method:  'POST',
            headers: {
                'Authorization': TOKEN,
                'Content-Type':  'application/json',
            },
        });
        const { data: task } =await response.json();

        if (response.status.ok) {
            return task;
        } throw new Error('Task creation error');
    },
    async updateTask () {
        const response=  await fetch(MAIN_URL, {
            method:  'PUT',
            headers: {
                'Authorization': TOKEN,
                'Content-Type':  'application/json',
            },
        });
        const { data: [updatedTask] } = await response.json();

        if (response.status.ok) {
            return updatedTask;
        } throw new Error('Task updating error');
    },
    async removeTask () {
        const response=  await fetch(MAIN_URL, {
            method:  'DELETE',
            headers: {
                'Authorization': TOKEN,
            },
        });

        if (!response.status.ok) {
            throw new Error('Task deletion error');
        }
    },
    async completeAllTasks () {

    },
};
