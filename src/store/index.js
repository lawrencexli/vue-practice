import { defineStore } from 'pinia';
import axios from 'axios';

export const useMainStore = defineStore('main', {
    state: () => ({
        message: "Hello World!"
    }),
    actions: {
        async fetchMessage() {
            try {
              const response = await axios.get('http://localhost:8080/greeting');
              this.message = response.data.message;
            } catch (error) {
              console.error('Failed to fetch message:', error);
            }
        }
    }
});
