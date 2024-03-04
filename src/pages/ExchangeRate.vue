<script setup>
import {useRootStore} from '../stores/root.js';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

const rootStore = useRootStore();
rootStore.getExchangeRate();

const { exchangeState } = storeToRefs(rootStore);

const filter = ref('');
const sortBy = ref('asc');
const pageSize = 20;
const currentPage = ref(1);


const filteredExchange = computed(() => {
  const regex = new RegExp(filter.value, 'i');
  return exchangeState.value.filter(item => regex.test(item.txt));
});
const toggleSort = () => {
  sortBy.value = sortBy.value === 'asc' ? 'desc' : 'asc';
};

const sortExchangeByRate = () => {
  const sortedArray = filteredExchange.value.slice().sort((a, b) => {
    if (sortBy.value === 'asc') {
      return a.rate - b.rate;
    } else {
      return b.rate - a.rate;
    }
  });
  return sortedArray;
};

const paginatedExchange = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = currentPage.value * pageSize;
  return sortExchangeByRate().slice(startIndex, endIndex);
});
const nextPage = () => {
  if (currentPage.value < Math.ceil(filteredExchange.value.length / pageSize)) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

</script>
<template  >
    <div class="wrapper">
    <input class="filter" type="text" v-model="filter" placeholder="Фільтр за назвою валюти">
    <table class="wrapperTable">
      <thead class="wrapperThead" >
        <tr class="wrapperTr">
          <th class="wrapperTr-th first">txt</th>
          <th class="wrapperTr-th second" >
            rate<button class="btnRate" @click="toggleSort">{{sortBy}}</button></th>
          <th class="wrapperTr-th">cc</th>
          <th class="wrapperTr-th">exchangedate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedExchange" :key="item.r030">
          <td class="first">{{ item.txt }}</td>
          <td>{{ item.rate }}</td>
          <td>{{ item.cc }}</td>
          <td>{{ item.exchangedate }}</td>
        </tr>
      </tbody>
    </table>
    <div class="wrapperPagination">
        <button @click="prevPage">Prev</button> 
        <div>{{ currentPage }}</div>
        <button @click="nextPage">Next</button>
    </div>
    </div>
</template>



<style lang="scss" scoped>
.wrapper{
    display: flex;
    flex-direction: column;
}
.filter{
    display: block;
    width: 350px;
    padding: 10px;
    border: 2px solid black;
    border-radius: 3px;
    margin-bottom: 20px;
}
 .wrapperTable{
    border: 5px solid black;
    width: 1000px;
    text-align: start;
} 
.wrapperThead{
    border: 2px solid black;
  
    text-align: start;
}
.wrapperTr{
    border: 2px solid black;
  
    text-align: start;
}
.wrapperTr-th{
    border-right: 5px solid black;
    border-bottom: 5px solid black;
   
    text-align: start;
} 
tr {
  border-top: 2px solid black;
}

td {
  /* border-right: 2px solid black; */
  border-top: 2px solid black;
  padding: 8px;
  text-align: start;
}
td:not(:last-child) {
  border-right: 2px solid black;
}
.btnRate{
    margin-left: 120px;
}
.first{
    width: 500px;
}
.second{
    width: 200px;
}

.wrapperPagination{
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}
</style>
