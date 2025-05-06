<template>
  <v-app id="inspire">
    <v-container class="d-flex align-center" @click="$router.push('/')">
      <v-app-bar height="56" color="#111827" class="px-4" flat>
        <v-icon class="ml-40" size="48">mdi-movie-open-play</v-icon>
        <p class="text-h4 ml-4 cursor-pointer" @click="$router.push('/')">
          Movie Search
        </p>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="moviesStore.searchString"
          variant="outlined"
          density="compact"
          hide-details
          @click:append-inner="moviesStore.searchMovies"
          @keyup-enter="moviesStore.searchMovies"
          append-inner-icon="mdi-magnify"
          placeholder="Search"
        />
      </v-app-bar>
    </v-container>

    <v-main>
      <slot />
      <message />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const moviesStore = useMoviesStore();
</script>
