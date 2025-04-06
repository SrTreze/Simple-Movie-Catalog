<script setup>  
  const emit = defineEmits(['goToPrevious', 'goToNext']);

  const props = defineProps({
    currPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  });
  
    function goToPrevious(){
        emit('goToPrevious')
    };
    function goToNext(){
        emit('goToNext')
    };
</script>
<template>
  <div>

    <button @click="goToPrevious" :disabled="currPage == 1">Prev</button>
    <span>Page {{ currPage }} of {{ totalPages }}</span> <!-- change currPage to input with default val = currPage-->
    <button @click="goToNext" :disabled="currPage == totalPages">Next</button>
  </div>
  </template>
  
  <style scoped>
  
  </style>