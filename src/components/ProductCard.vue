<template> 
  <v-card max-width="300px" max-height="400px">
    <v-card-title>{{titulo}}</v-card-title>
    <v-card-text>
      <v-row justify="center" align="center">
        <v-img
          class="white--text align-end"
          max-height="60%"
          max-width="60%"
          :src="require('@/assets/'+icon)"></v-img>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn block class="mx-2 mb-2 white--text" color="#65bcc6" @click="agregarAlComparador()">
            <v-icon left>
                mdi-cart-plus
            </v-icon>
            Añadir al comparador
        </v-btn>
        <v-btn block class="white--text" color="#65bcc6"  @click.stop="dialog = true" @click="calcularPrecios()"> Ver Precio </v-btn>
      </v-row>
    </v-card-text>
    <!-- POP-UP -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Precios
        </v-card-title>

        <v-card-text v-if="dialog==true"> Carrefour: ${{this.precioCarrefour}} </v-card-text>
        <v-card-text v-if="dialog==true"> Dia: ${{this.precioDia}}  </v-card-text>
        <v-card-text v-if="dialog==true"> Jumbo: ${{this.precioJumbo}}  </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
    
</template>

<script>

var URL= "https://serene-oasis-15073.herokuapp.com";
//var lista= []; //para las listas
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
        precioCarrefour: null,
        precioDia: null,
        precioJumbo: null,
        urlCarrefour: String('comparador'),
        urlDia: String('comparador'),
        urlJumbo: String('comparador'),
    },

    methods:{

     async getPrecioCarrefour(){
        if(this.precioCarrefour== null){
          let response = await this.axios.get(URL+'/marketproducts/get/'+this.ean+'?supermarket=CARREFOUR')
          if (response.data == null){
            data= 'Sin stock';
            this.precioCarrefour= data;
            return data;
          } else {
            var data = response.data.price;
            var url = response.data.url;
            this.precioCarrefour= data;
            this.urlCarrefour= url;
            return '$'+data;
          }
        } else {
          return this.precioCarrefour;
        }
      },

      async getPrecioDia(){
        if(this.precioDia== null){
          let response = await this.axios.get(URL+'/marketproducts/get/'+this.ean+'?supermarket=DIA');
          if (response.data== null){
            data= 'Sin stock';
            this.precioDia= data;
            return data;
          } else {
            var data = response.data.price;
            var url = response.data.url;
            this.precioDia= data;
            this.urlDia= url;
            return '$'+data;
          }          
        } else {
          return this.precioDia;
        }
      },

      async getPrecioJumbo(){
        if(this.precioJumbo== null){
          let response = await this.axios.get(URL+'/marketproducts/get/'+this.ean+'?supermarket=JUMBO');
          if (response.data== null){
            this.precioJumbo= 'Sin stock';
            return 'Sin stock';
          } else {
            this.precioJumbo= response.data.price;
            this.urlJumbo=response.data.url;
            return this.precioJumbo;
          }          
        } else {
          return this.precioJumbo;
        }
      },
      /*{
        name: 'Leche serenísima',
        jumbo: 35,
        carrefour: 45,
        dia:35,
      }*/

      async calcularPrecios(){
        if(this.precioCarrefour== null){
          await this.getPrecioCarrefour();
        }
        if(this.precioDia== null){
          await this.getPrecioDia();
        }
        if(this.precioJumbo== null){
          await this.getPrecioJumbo();
        }
      },

      async agregarAlComparador(){
        if(this.precioCarrefour== null){
          await this.getPrecioCarrefour();
        }
        if(this.precioDia== null){
          await this.getPrecioDia();
        }
        if(this.precioJumbo== null){
          await this.getPrecioJumbo();
        }
        var found = false;
        for(var i=0;i<this.$store.getters.getProductsArray.length; i++){
          if(this.$store.getters.getProductsArray[i].name==this.titulo){
            found=true;
            break;
          }
        }
        var aux = {name:this.titulo, jumbo:this.precioJumbo,
                  carrefour:this.precioCarrefour, dia:this.precioDia,
                  jumboURL:this.urlJumbo, carrefourURL:this.urlCarrefour,
                  diaURL:this.urlDia}
        if(!found){ //si no está el artículo lo agrega
          this.$emit('mostrarSnackBar', this.titulo+" agregado");
          this.$store.dispatch('addProductAction', aux)
        } else {//si el artículo ya existe no lo agrega
          this.$emit('mostrarSnackBar', this.titulo+" ya fue agregado");
        }
      }

    }
  };
</script>