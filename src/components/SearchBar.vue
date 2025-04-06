<script setup>
import { ref, computed } from 'vue';
import {useStore} from 'vuex';

const globalStore = useStore();
const genres = computed(() => globalStore.state.movieStore.genres);

const emit = defineEmits(['update-filters']);
const selectedGenre = ref('')
const search = ref('');
const selectedYear = ref('');

const updateFilters = () => {
  emit('update-filters', { genre: selectedGenre.value, year: selectedYear.value });
};

async function fetchByGenre(){
    if (selectedGenre.value) {
        globalStore.dispatch('movieStore/fetchMovies', {genre:selectedGenre.value})
        globalStore.dispatch('movieStore/updateSelectedGenre', selectedGenre.value)
    }
}
</script>

<template>
    <div class="flex justify-center items-center m-2.5">
        <label>Select a genre:</label>
        <select v-model="selectedGenre" @change="fetchByGenre"
        class="w-48 h-8 p-1 rounded-lg border-2 border-gray-300" >
            <option value="">All Genres</option>
            <option v-for="genre in genres" :value="genre.id">{{genre.name}}</option>
        </select>
        <div class="vb"></div>
        <div class="filters">
            <input v-model="search" type="text" placeholder="Search" @change="updateFilters"
            class="w-50 h-7 p-1 rounded-lg border-2 border-gray-300">
            <input v-model="selectedYear" type="number" placeholder="Year" @change="updateFilters"
            class="w-30 h-7 p-1 rounded-lg border-2 border-gray-300">
            <!-- add for genre (cuz movies can have more then one), rated-r-->
        </div>
    </div>
</template>

<style scoped>

label {
    margin-right: .5rem;
}

select {
    background-color:rgb(155, 155, 155);
}
.vb{
    border: 2px solid rgba(0, 0, 0, 0.5);
    height: 40px;
    border-radius: 2px;
    margin: 0 5px 0 5px;
}
</style>