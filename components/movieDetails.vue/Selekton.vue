<template>
        <div>
      <v-row>
        <v-col cols="6">
          <v-skeleton-loader
            class="mx-auto skeleton-card"
            width="100%"
            type="image"
            height="321"
          >
          </v-skeleton-loader>
        </v-col>

        <v-col cols="6">
          <v-skeleton-loader
            class="mx-auto"
            width="100%"
            type="heading,paragraph"
            height="321"
            color="transparent"
          >
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
</template>


<script setup></script>