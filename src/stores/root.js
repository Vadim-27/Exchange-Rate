
import { defineStore } from 'pinia';
import axios from 'axios';
import { EXCHANGE_RATE_URL } from '@/contacts';

export const useRootStore = defineStore("root", {
    state: () => ({
        exchangeState: [],
    }),
    actions: {
        async getExchangeRate() {
            const data = await axios.get(EXCHANGE_RATE_URL);
            console.log("Data from exchange rate API:", data);
            this.exchangeState = data.data;
        }
    }
})

