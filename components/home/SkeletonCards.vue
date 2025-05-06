<template>
        <v-row>
      <v-col
        v-for="(card, index) in useMoviesStore.movies?.results"
        :key="index"
        cols="3"
      >
        <v-skeleton-loader
          class="mt-auto skeleton-card border-lg"
          max-width="300"
          type="image"
          height="411"
          color="transparent"
          min-height="411"
          max-height="411"
        />
      </v-col>
    </v-row>
</template>

<script setup lang="ts"></script>
<style>
.skeleton-card :deep(.v-skeleton-loader__bone) {
  height: 411px !important;
  border-radius: 4px;
}
</style>