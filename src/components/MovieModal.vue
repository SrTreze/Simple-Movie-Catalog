<script setup>
    import { computed, defineProps, onBeforeMount, ref } from 'vue';
    import MovieThumb from './MovieThumb.vue';
    import {useStore} from 'vuex';
    const globalStore = useStore();
    import { useRouter } from 'vue-router';
    const router=useRouter()

    const props = defineProps({
        id: {
            type: String,
            required: true,
        },
    });

    const movie = ref({})
    
    onBeforeMount( async() => {
        movie.value = globalStore.getters['movieStore/getMovieById'](props.id);
        await globalStore.dispatch('movieStore/fetchRelatedMovies', {id:props.id})
    })

    const getGenreNames = computed(() => globalStore.state.movieStore.genres.filter(g => movie.value.genre_ids.includes(g.id)).map(g => g.name))

    const isFavorite = computed(() => globalStore.getters['preferencesStore/getIsFavoriteById'](props.id));

    const relatedMovies = computed(() => {
      const suggestionsFomMovie = globalStore.getters['movieStore/getRelatedMoviesById'](props.id);
      if (suggestionsFomMovie) {
        const shuffled = [...suggestionsFomMovie].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
      } else {
        return []
      }
    });
    
    function getDetailsWight(){
      const poster = document.getElementById('modal_movie_poster')
      const posterWidth = poster?.getAttribute('width') ?? '26vw'
      console.log(posterWidth);
      
      return { width: 'calc(60vw - '+ posterWidth +')', }
    }

    function close(event) {
        if (event.target?.classList[0] == "overlay")
          router.push('/');
    };
</script>
  <template>
    <div class="overlay" @click="close">
        <div class="deatilsModal">
            <img :src="'https://image.tmdb.org/t/p/original'+movie.poster_path" :alt="movie.title" class="movie_poster" id="modal_movie_poster"/>
            <div class="mt-6 mb-6 ml-0 movie_details" :style="getDetailsWight()">
                <div class="detailsHeader flex flex-start items-end justify-between">
                  <div class="flex flex-start items-start flex-col">
                    <h2 class="movie_title">{{ movie.title }}</h2>
                    <h4 v-if="movie.original_language != 'en'" class="movie_subtitle">{{ movie.original_language }} | {{ movie.original_title }}</h4>
                  </div>
                  <p class="movie_year">Release Date: {{ movie.release_date }}</p>
                </div>
                <div class="detailsBody mt-2">
                  <!-- all tags? -->
                  <h6 >Summary:</h6>
                  <p class="movie_description">{{ movie.overview }}</p>
                  <!-- get run time? -->
                </div>
                <div class="movie_genre_list">
                  <span class="movie_genre" v-for="genre in getGenreNames"> {{genre}} </span>
                </div>
                <div class="p-3 pl-0 h-40 flex flex-nowrap overflow-x-scroll related">
                  <MovieThumb v-for="movie in relatedMovies" :key="movie.id" :movie="movie" :isSmall="true"/>
                </div>
                <div class="favorite">
                  <button v-if="isFavorite" @click="removeFromFav">-</button>
                  <button v-else @click="addToFav">+</button>
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
    background-color: #f2f2f2;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 60vw;
    height: 60vh;
    overflow: hidden;
    transition: transform 0.2s ease;
    box-shadow: 0px 0px 50px #000000;
  }
  
  .movie_poster {
    height: calc(60vh - 2rem);
    width: auto;
    margin: 1rem;
    border: solid 3px #045000;
    border-radius: 8px;
  }

  .movie_details {
    height: calc(60vh - 2rem);
    position: relative;
  }

  .detailsHeader {
  }
  
  .movie_title {
    font-size: 26px;
    font-weight: bold;
    margin-left: 1rem;
  }

  .movie_subtitle {
    font-size: 18px;
    font-weight: bold;
    margin-left: 1rem;
  }
  
  .movie_year {
    color: #888;
  }
  
  .movie_description {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
  }
  
  .movie_genre_list{
    margin-top: 10px;
  }

  .related {
    width: 34vw;
    height: 250px;
  }

  .movie_genre{
    color: #f2f2f2;
    font-size: 12px;
    padding: 6px 8px;
    border-radius: 8px;
    margin: 3px;
    background-color: #045000;
  }

  .favorite {
    position: absolute;
    bottom: 10px;
    right: 10px;
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