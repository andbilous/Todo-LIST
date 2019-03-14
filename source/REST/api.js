import { MAIN_URL, TOKEN } from './config';
export const api = {

    async fetchTasks () {
        await fetch(MAIN_URL, {
            method:  'GET',
            headers: new Headers({
                'Authorization': TOKEN,
            }),
        }).then((response) => {
            if (response.ok) {
                return response.text();
            }
        });
    },
    async createTask () {
        await fetch(MAIN_URL, {
            method:  'POST',
            headers: {
                'Authorization': TOKEN,
            },
        }).then((response) => {
            if (response.ok) {
                return response.text();
            }
        });
    },
    async updateTask () {
        await fetch(MAIN_URL, {
            method:  'GET',
            headers: {
                'Authorization': TOKEN,
            },
        }).then((response) => {
            if (response.ok) {
                return response.text();
            }
        });
    },
    async removeTask () {
        await fetch(MAIN_URL, {
            method:  'GET',
            headers: {
                'Authorization': TOKEN,
            },
        }).then((response) => {
            if (response.status===200) {
                return response.text();
            }
        });
    },
    async completeAllTasks () {

    },
};
