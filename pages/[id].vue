<template>
  <v-container>
     <MovieDetailsVueSelekton v-if="status === 'pending'" />
    <div v-else>
      <v-row class="mt-5">
        <v-Col cols="6" align="center" justify="center">
          <v-icon v-if="movie?.backdrop_path === null" style="width: 277px; height: 411px;" size="200">mdi-image-off</v-icon>
          <v-img v-else
            :src="`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`"
            v-if="movie?.backdrop_path" 
            rounded
          ></v-img>
        </v-Col>
        <v-Col cols="6">
          <p v-if="movie?.title" class="text-h4">{{ movie?.title }}</p>
          <p class="text-subtitle-1 text-grey">
            {{ movie?.release_date }} - {{ movie?.runtime }} -
            {{ movie?.budget }}
          </p>
          <v-chip
            v-for="(genre, index) in movie?.genres"
            :key="index"
            variant="outlined"
            class="mr-2 mt-4 text-subtitle-1"
            >{{ genre }}</v-chip
          >

          <MovieDetailsVueScoreCircle
            :score="movie?.vote_average"
            class="mt-4"
          />

          <p class="mt-4">{{ movie?.overview }}</p>
        </v-Col>
      </v-row>
      <p class="text-h4 mt-4">Cast</p>
      <v-row dense no-gutters>
        <v-col>
          <div class="flex flex-wrap ga-2 mt-4">
            <v-card v-for="(card, index) in movie?.cast" width="180">
              <h4 v-if="card.profile_path === null" style="margin-left:33px ; font-weight: 700;">have no picture </h4>
              <v-img
                :src="`https://image.tmdb.org/t/p/original/${card.profile_path}`"
                width="100%"
                height="288"
                cover
              >
              </v-img>

              <v-card-text class="pa-1 bg-gray-darken white mt-4">
                <p class="font-weight-bold text-subtitle-1">{{ card.name }}</p>
                <p class="character">{{ card.character }}</p>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
        <v-col>
          <iframe
            ref="el"
            :src="movie?.movieSrc"
            frameborder="0"
            width="100%"
            :height="height"
            :title="movie?.title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="rounded"
          ></iframe>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { MovieDetailsVueScoreCircle } from "#components";

interface Cast {
  profile_path: string;
  name: string;
  character: string;
  cast?: Cast[];
}
interface Credits {
  cast: Cast[];
}
interface Genres {
  name: string;
}

interface Video {
  results: VideoResults[];
}

interface VideoResults {
  key: string;
}

interface Movie {
  title: string;
  backdrop_path: string;
  cast: Cast[];
  release_date: string;
  runtime: number;
  credits: Credits;
  budget: number;
  genres: Genres[];
  vote_average: number;
  overview: string;
  videos: Video;
}
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const messageStore = useMessageStore()
const { data: movie, status } = await useFetch(
  `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${runtimeConfig.public.apikey}&append_to_response=videos,credits`,
  {
    pick: [
      "title",
      "backdrop_path",
      "cast",
      "release_date",
      "runtime",
      "runtime",
      "credits",
      "genres",
      "budget",
      "vote_average",
      "overview",
      "movieSrc",
    ],
    transform(input: Movie) {
      return {
        title: input.title,
        backdrop_path: input.backdrop_path,
        cast: input.cast,
        release_date: useDateFormat(new Date(input.release_date), "MMMM YYYY", {
          locales: "en-US",
        }),
        runtime: `${parseInt(input.runtime / 60).toString()}h ${
          input.runtime % 60
        }`,
        credits: input.credits,
        budget: input.budget.toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
        }),
        genres: input.genres.map((genre) => genre.name),
        vote_average: input.vote_average,
        overview: input.overview,
        movieSrc: getMoviesrc(input.videos.results),
        cast: input.credits.cast.filter((_, index) => index < 6),
      };
    },
    onResponseError({request,response,options}){
      console.log(response),
      messageStore.showMessage = true;
      messageStore.message = response._data.status_message;
    }
    },
);
function getMoviesrc(videos: any) {
  const movieInfo = videos.find((video: any) =>
    video.name?.toLowerCase().includes("trailer")
  );
  if (movieInfo) {
    return `https://www.youtube.com/embed/${movieInfo.key}`;
  } else {
    return null;
  }
}

const el = ref(null);
const { width } = useElementSize(el);
const height = computed(() => (315 * width.value) / 560);
</script>



<style scoped>
.character {
  width: 136px;
  overflow: hidden;
  white-space: nowrap;
}
.skeleton-card :deep(.v-skeleton-loader__bone) {
  height: 321px !important;
  border-radius: 4px;
}
</style>
