// https://nuxt.com/docs/api/configuration/nuxt-config

const MovieSearchTheme ={
  dark:true,
  colors:{
   background:'#020617'
  }
}



export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module',
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt"
  ],
  vuetify: {
    moduleOptions: {
     
    },
    vuetifyOptions: {
      theme:{
       defaultTheme: "MovieSearchTheme",
       themes:{
        MovieSearchTheme
       }
      },
      icons: {
        defaultSet: "mdi",
        sets:["mdi","fa"]
      }
    },
    
  },
  runtimeConfig:{
    public:{
      apikey:"e2a4ccee25a32c9759808f616f0693ea"
    }
  }
})