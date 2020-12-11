<template>
  <v-app>
    <navbar/>
    <v-main class="grey lighten-2" >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import navbar from './components/NavBar';
//import gridProd from './views/Products';
//import compare from './views/Compare';

export default {
  name: 'App',

  components: {
    navbar,
    //gridProd,
    //compare,
  },

  data: () => ({
    //
  }),
};
</script>
