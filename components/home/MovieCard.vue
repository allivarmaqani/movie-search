<template>
    
    <v-row>
      <v-col v-for="(card, index) in moviesStore.movies?.results" :key="index" cols="3" >
        <v-card class="position-relative cursor-pointer" color="#020617" @click="$router.push(`/${card.id}`)">
          <v-icon v-if="card.poster_path  === null " style="width: 277px; height: 411px;" size="200">mdi-image-off</v-icon>

            <v-img  :src="`https://image.tmdb.org/t/p/w500${card.poster_path}`" rounded id="image" ></v-img>
          <HomeScoreCircle :score="card.vote_average"  />
          <v-card-text class="px-0">
            <p class="text-h6">{{`${ card.title.substring(0,20)} ${card.title.length >20 ? '...' :''}` }}</p>
            <p class="text-grey text-h6">{{ titleStrings(card.release_date)  }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { Style } from '#components';
import { routerKey } from 'vue-router';

const moviesStore = useMoviesStore();


function titleStrings(title: string) {
  return `${title.substring(0, 20)}${title.length > 20 ? '...' : ''}`;
}

</script>