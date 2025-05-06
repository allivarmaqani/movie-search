import { defineStore } from 'pinia'
import { useDateFormat } from '@vueuse/core';


interface Results {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}
interface Movies {
  total_pages: number;
  results: Results[]
}


export const useMoviesStore = defineStore("Movies", () => {




  const searchString: Ref<string> = ref('');
  const messageStore = useMessageStore()
  const movies: Ref<Movies> = ref({ total_pages: 0, results: [] });
  const page: Ref<number> = ref(1)
  const loading: Ref<boolean> = ref(false)
  async function featureMovies() {
    try {
      loading.value = true
      const runtimeConfig = useRuntimeConfig();
      const response: Movies = await $fetch(`https://api.themoviedb.org/3/discover/movie?page=${page.value}&api_key=${runtimeConfig.public.apikey}`);

      movies.value = {
        ...response,
        total_pages: response.total_pages,
        results: response.results
          .filter((_, index) => index < 20)
          .map((movie: any) => {
            return {
              ...movie,
              release_date: useDateFormat(new Date(movie.release_date), "MMMM YYYY", { locales: "en-US" }).value
            };
          })
      };
      
      loading.value = false
    } catch (error: any) {
      messageStore.showMessage = true;
      messageStore.message = error?.message || "خطا در ارتباط با سرور";
      loading.value = false
    }
  }
  async function searchMovies() {
    try {
      loading.value = true
      const runtimeConfig = useRuntimeConfig();
      const response: Movies = await $fetch(`https://api.themoviedb.org/3/search/movie?page=${page.value}&query=${searchString.value}&api_key=${runtimeConfig.public.apikey}`);
     
      movies.value = {
        ...response,
        results: response.results
          .map((movie: any) => {
            return {
              ...movie,
              release_date: useDateFormat(new Date(movie.release_date), "MMMM YYYY").value,
            };
          })
      };
      loading.value = false
    } catch (error: any) {
      messageStore.showMessage = true;
      messageStore.message = error?.message || "خطا در ارتباط با سرور"
      loading.value = false
    }
  }


  return { movies, searchString, page, loading, featureMovies, searchMovies }
})