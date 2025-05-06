<template>
    <v-dialog v-model="messageStore.showMessage">
        <v-card>
            <v-card-text>
            <p>{{ messageStore.message }}</p>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>


<script setup lang="ts">
import { useMessageStore } from '~/stores/message';

const messageStore = useMessageStore()
</script>