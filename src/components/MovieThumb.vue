<script setup>
  import { defineProps, computed } from 'vue';
  import {useStore} from 'vuex';
  import { useRouter } from 'vue-router';
  const router=useRouter()
  const globalStore = useStore();

  const props = defineProps({
    movie: {
      type: Object,
      required: true,
    },
  });
  const isFavorite = computed(() => globalStore.getters['preferencesStore/getIsFavoriteById'](props.movie.id));

  const viewDetails = (id) => {
    router.push({ name: 'movieModal', params: {id} });
  };
  const addToFav = () => {
    globalStore.dispatch('preferencesStore/addToFavorites', props.movie.id)
  };
  const removeFromFav = () => {
    globalStore.dispatch('preferencesStore/removeFromFavorites', props.movie.id)
  };

  </script>
  <template>
    <div class="movie-card flex-1 flex h-60"> <!-- -->
      <!-- <img :src="'https://image.tmdb.org/t/p/original'+movie.backdrop_path" :alt="movie.title" class="movie-card_poster" /> -->
      <div :style="{'background-image': `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}'`}" :alt="movie.title" class="movie-card_poster">
        <div class="movie-card_details">
          <h2 class="movie-card_title">{{ movie.title }}</h2>
          <h4 v-if="movie.original_language != 'en'" class="movie-card_subtitle">{{ movie.original_language }} | {{ movie.original_title }}</h4>
          <!-- <p class="movie-card_description h-20 text-wrap truncate">{{ movie.overview }}</p> -->
           <div class="movie-thumb-footer flex justify-between items-center">
             <p class="movie-card_year">{{ movie.release_date }}</p>
             <div class="flex block">
               <button @click="viewDetails(movie.id)" class="mr-2">View Details</button>
               <button v-if="isFavorite" @click="removeFromFav">-</button>
               <button v-else @click="addToFav">+</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .movie-card {
    /* display: flex; */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-width: 300px;
    max-width: 400px;
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  @media (width < 48rem) {
    .movie-card {
      max-width: 600px;
    }
  }
  
  .movie-card:hover {
    transform: scale(1.05);
  }
  
  .movie-card_poster {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    object-fit: cover;
    border-radius: 8px;
    position: relative
  }
  
  .movie-card_details {
    display: flex;
    flex-direction: column;
    padding: 15px;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  .movie-card_details:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .movie-card_title, .movie-card_subtitle {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    text-shadow: 0px 0px 4px #ffffff,  0px 0px 4px #ffffff;
  }

  .movie-card_title {
    font-size: 26px;
  }

  .movie-card_year {
    color: #f2f2f2;
    text-shadow: 0px 0px 4px #000000;
  }
  
  .movie-card_description {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
  }
  
  .movie-thumb-footer{
    width: 100%;
    position: absolute;
    bottom: 10px;
    padding-right: 30px;
  }

  button {
    padding: 6px 12px;
    background-color: #045000;
    color: #f2f2f2;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #058000;
  }
  </style>