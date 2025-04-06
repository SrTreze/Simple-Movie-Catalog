<script setup>
  import { defineProps, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  const router=useRouter()

  const props = defineProps({
    movie: {
      type: Object,
      required: true,
    },
  });
  
  const viewDetails = (id) => {
    router.push({ name: 'movieModal', params: {id} });
  };
  const addToFav = () => {
    console.log('will add to favs');
  };
  </script>
  <template>
    <div class="movie-card flex-1 flex h-60">
      <img :src="'https://image.tmdb.org/t/p/original'+movie.backdrop_path" :alt="movie.title" class="movie-card_poster" />
      <div class="movie-card_details">
          <h2 class="movie-card_title">{{ movie.title }}</h2>
          <h4 v-if="movie.original_language != 'en'" class="movie-card_subtitle">{{ movie.original_language }} | {{ movie.original_title }}</h4>
          <p class="movie-card_description h-20 text-wrap truncate">{{ movie.overview }}</p>
          <p class="movie-card_year">{{ movie.release_date }}</p>
          <div class="flex block marginb-0">
            <button @click="viewDetails(movie.id)">View Details</button>
            <button @click="addToFav">+</button>
          </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .movie-card {
    display: flex;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-width: 300px;
    max-width: 400px;
    margin: 10px;
    overflow: hidden;
    transition: transform 0.2s ease;
  }
  
  .movie-card:hover {
    transform: scale(1.05);
  }
  
  .movie-card_poster {
    width: 100px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .movie-card_details {
    padding: 15px;
  }
  
  .movie-card_title {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  }
  
  .movie-card_year {
    color: #888;
    margin: 5px 0;
  }
  
  .movie-card_description {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
  }
  
  button {
    padding: 6px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>