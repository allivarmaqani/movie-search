<template>
  <v-container>
    <p class="text-h4 mt-8 mb-6">Feature Today</p>

    <HomeSkeletonCards v-if="moviesStore.loading" />

    <HomeMovieCard  v-else data-aos="fade-up"/>

    <v-pagination
      v-model="moviesStore.page"
      :length="moviesStore.movies?.total_pages"
      class="my-4"
      @update:model-value="handlePageChange"
      v-if="moviesStore.movies?.total_pages > 1"
    />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
const moviesStore = useMoviesStore();

onMounted(async () => {
  if (process.client) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch("https://api.themoviedb.org/3/movie/550", {
  method: "GET",
  signal: controller.signal,
  headers: {
    "Cache-Control": "no-cache",
  },
});

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Blocked");
      }

    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'فیلترشکن وصل نیست!',
        text: 'برای نمایش کامل اطلاعات فیلم، لطفاً فیلترشکن را فعال کنید.',
        confirmButtonText: 'باشه',
        background: '#fff',
        confirmButtonColor: '#3085d6',
      });
    }
  }
});

onBeforeMount(() => {
  if (moviesStore.movies.results.length === 0) {
    moviesStore.featureMovies();
  }
});

function handlePageChange() {
  if (moviesStore.searchString) {
    moviesStore.searchMovies();
  } else {
    moviesStore.featureMovies();
  }
}
</script>


<style>
#image {
  width: 400px;
  border-radius: 20px;
  display: block;
  position: relative;
  z-index: -1;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

#image::after {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-20deg);
  z-index: 2;
  pointer-events: none;
}

#image:hover::after {
  animation: shine 1s ease;
}

#image:hover {
  transform: scale(1.05) rotateZ(1deg);
  box-shadow: 0 20px 60px rgba(0, 255, 150, 0.5);
}

@keyframes shine {
  0% {
    left: -75%;
  }
  100% {
    left: 125%;
  }
}


</style>
