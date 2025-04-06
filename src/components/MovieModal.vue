<script setup>
    import { defineProps, onBeforeMount, ref } from 'vue';
    import {useStore} from 'vuex';
    const globalStore = useStore();
    import { useRouter } from 'vue-router';
    const router=useRouter()

    const props = defineProps({
        id: {
            type: Number,
            required: true,
        },
    });

    const movie = ref({})
    
    onBeforeMount(async() => {
        movie.value = globalStore.getters['movieStore/getMovieById'](props.id);
    })
    function close() {
        router.push('/');
    };
</script>
  <template>
    <div class="overlay" @click="close">
        <div class="deatilsModal">
            <img :src="'https://image.tmdb.org/t/p/original'+movie.poster_path" :alt="movie.title" class="movie_poster m-4" />
            <div class="m-6 ml-0">
                <div class="detailsHeader">
                    <h2 class="movie_title">{{ movie.title }}</h2>
                    <h4 v-if="movie.original_language != 'en'" class="movie_subtitle">{{ movie.original_language }} | {{ movie.original_title }}</h4>
                </div>
                <div class="detailsBody">
                    <!-- all tags? -->
                    <p class="movie_description">{{ movie.overview }}</p>
                    <p class="movie_year">Release Date: {{ movie.release_date }}</p>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <style scoped>

.overlay{
    position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

  .deatilsModal {
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 60vw;
    height: 60vh;
    margin: 10px;
    overflow: hidden;
    transition: transform 0.2s ease;
  }
  
  .movie_poster {
    width: 300px;
    height: 450px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .movie_details {
    padding: 15px;
  }
  
  .movie_title {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  }
  
  .movie_year {
    color: #888;
    margin: 5px 0;
  }
  
  .movie_description {
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