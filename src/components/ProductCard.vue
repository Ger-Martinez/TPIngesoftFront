<template>
  <v-card>
    <v-card-text>
      <v-row align="center" justify="center" class="ma-5">     
        <v-img
          class="white--text align-end"
          height="60%"
          max-width="60%"
          :src="require('@/assets/'+icon)">
      </v-img>
      </v-row>
    </v-card-text>

    <v-card-subtitle class="pb-0">
      <v-row align="center" justify="center">
        <v-col>{{titulo}}</v-col>
        <v-col>$ {{precio}}</v-col>
      </v-row>
    </v-card-subtitle>

    <v-card-text class="text--primary">
        <v-row class="ml-0">
          {{descripcion}}
        </v-row>
       
       <v-row align="center" justify="center">
          <v-btn tile class="mx-2" color="#F57F17">
              <v-icon left>
                  mdi-cart-plus
              </v-icon>
              Agregar
          </v-btn>
        
          <v-btn color="#F57F17">
              <v-icon>
                  mdi-currency-usd
              </v-icon>
          </v-btn>
        </v-row>

    </v-card-text>
  </v-card>
</template>

<script>
  export default {
      name: "ProductCard",
      data(){
          return{
            
          }
      },
      props:{
        icon: String,
        titulo: String,
        descripcion: String,
        precio: String
    }
  };
</script>