<script setup>
    import {computed, ref} from 'vue';
    import {useStore} from 'vuex';
    import MovieThumb from './MovieThumb.vue';
    import Pagination from './Pagination.vue';

    const globalStore = useStore();
    const selectedGenre = computed(() => globalStore.getters['movieStore/getSelectedGenres']);
    const movies = computed(() => globalStore.getters['movieStore/getMovies']);
    const totalMovies = computed(() => globalStore.getters['movieStore/getTotalMovies']);
    const itemsPerPagePreferences = computed(() => globalStore.getters['preferencesStore/getItemsPerPage']);
    const itemsPerPage = ref(itemsPerPagePreferences.value)
    const currPage = computed(() => globalStore.getters.getCurrPage);
    
    async function updateItemsPerPage(){
        const apiPagesNeeded = Math.ceil(itemsPerPage.value/20)
        if(apiPagesNeeded > 1) {
            globalStore.dispatch('movieStore/setPagesPerRequest', apiPagesNeeded)
            globalStore.dispatch('movieStore/fetchMovies', { genre:selectedGenre.value, page:currPage.value })
        }
        globalStore.dispatch('preferencesStore/setItemsPerPagePreference', itemsPerPage.value)
    }

    // function to autoscrolltop

    function previousPage(){
        globalStore.dispatch('goToPage', currPage.value-1)
        // call autoscrolltop
    };
    function nextPage(){
        const nextPage = currPage.value+1
        if (nextPage * itemsPerPage.value > movies.value.length) {
            globalStore.dispatch('movieStore/fetchMovies', { genre:selectedGenre.value, page:nextPage })
        }
        globalStore.dispatch('goToPage', nextPage)
        // call autoscrolltop
    };
</script>

<template>
    <div v-if="movies.length">
        <div class="flex justify-center space-x-3">
            <h3>Showing 
                <input v-model="itemsPerPage" type="number" min="1" @change="updateItemsPerPage"
                class="w-14 h-6 p-1 bg-gray-400 rounded border-2 border-gray-300"/>
                results per page.</h3>
            <h5>Items {{((currPage-1)*itemsPerPage)+1 }} - {{ ((currPage)*itemsPerPage)}}</h5>
        </div>
        <div class="p-6 flex justify-center flex-wrap w-full">
            <MovieThumb v-for="movie in movies.slice((currPage-1)*itemsPerPage, (currPage-1)*itemsPerPage + itemsPerPage)" :key="movie.id" :movie="movie" />
        </div>
        <Pagination class="flex justify-center space-x-3"
            :currPage="currPage" :totalPages="Math.ceil(totalMovies/currPage)"
            @goToPrevious="previousPage" @goToNext="nextPage">
        </Pagination> <!-- lock in footer-->
    </div>
    <p v-else class="grid h-screen place-items-center">Please select a genre.</p>
</template>