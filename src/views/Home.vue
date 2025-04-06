<script setup>
import SearchBar from '../components/SearchBar.vue'
import MovieList from '../components/MovieList.vue'
</script>

<template>
    <header>
        <SearchBar @update-filters="updateFilters" />
    </header>

    <main>
        <MovieList />
    </main>
</template>