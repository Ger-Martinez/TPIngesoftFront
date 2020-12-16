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
        <!--v-col>$ {{precio}}</v-col-->
      </v-row>
    </v-card-subtitle>

    <v-card-text class="text--primary">
        <v-row class="ml-0">
          {{precioDia}}
        </v-row>
       
       <v-row align="center" justify="center">
          <v-btn tile class="mx-2" color="#F57F17">
              <v-icon left>
                  mdi-cart-plus
              </v-icon>
              Agregar
          </v-btn>
        
          <v-btn color="#F57F17"  @click.stop="dialog = true">
              <v-icon>
                  mdi-currency-usd
              </v-icon>
          </v-btn>
          
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">
                Precios
              </v-card-title>

              <v-card-text> Carrefor: ${{getPrecio("CARREFOUR")}} </v-card-text>
              <v-card-text> Dia: ${{getPrecio("DIA")}}  </v-card-text>
              <v-card-text> Jumbo: ${{getPrecio("JUMBO")}}  </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="dialog = false">
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-row>

    </v-card-text>
  </v-card>
</template>

<script>

var URL= "https://serene-oasis-15073.herokuapp.com";

  export default {
      name: "ProductCard",
      data(){
          return{
            dialog: false,
          }
      },
      props:{
        icon: String,
        titulo: String,
        descripcion: String,
        precio: String,
        ean: String,
    },

    methods:{
      getPrecio(supermercado){
        this.axios.get(URL+'/marketproducts/get/'+this.ean+'?supermarket='+supermercado).then(
                response => {
                    var data = response.data.price;
                    console.error(data.price);
                    return data.price;
                }
            ).catch(e => console.log(e));
      }
    }
  };
</script>