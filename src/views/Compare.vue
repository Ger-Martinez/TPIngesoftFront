<template>
  <v-container>
    <v-data-table
      :headers="tituloProductos"
      :items="this.$store.getters.getProductsArray"
      :search="search"
      item-key="name"
      class="elevation-1 "
      :items-per-page="1000"
    >

      <template v-slot:top>
        <v-toolbar flat class="blue darken-1">
          <v-toolbar-title class="white--text"> Comparación de productos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            color="white"
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:[`item.jumbo`]="{ item }">
        <v-chip :href="item.jumboURL" target="_blank"
          :color="getColor(item.name, item.jumbo)"
          dark
        >
          {{ item.jumbo }}
        </v-chip>
      </template>

      <template v-slot:[`item.carrefour`]="{ item }">
        <v-chip :href="item.carrefourURL" target="_blank"
          :color="getColor(item.name, item.carrefour)"
          dark
        >
          {{ item.carrefour }}
        </v-chip>
      </template>

      <template v-slot:[`item.dia`]="{ item }">
        <v-chip :href="item.diaURL" target="_blank"
          :color="getColor(item.name, item.dia)"
          dark
        >
          {{ item.dia }}
        </v-chip>
      </template>

    </v-data-table>
    
    <v-row justify="center" align="center">
      <v-col>
        <v-btn @click="calcularTotales()">Calcular totales</v-btn>
      </v-col>
    </v-row>
    
    <v-data-table
      :headers="tituloTotal"
      :items="totales"
      hide-default-footer
      :items-per-page="5"
      class="elevation-2 mt-7"
      v-if= "mostrarTotales== true"
    >

      <template v-slot:[`item.jumbo`]="{ item }">
        <v-chip
          :color="getColorTotal(item.jumbo)"
          dark
        >
          {{ item.jumbo }}
        </v-chip>
      </template>

      <template v-slot:[`item.carrefour`]="{ item }">
        <v-chip
          :color="getColorTotal(item.carrefour)"
          dark
        >
          {{ item.carrefour }}
        </v-chip>
      </template>

      <template v-slot:[`item.dia`]="{ item }">
        <v-chip
          :color="getColorTotal(item.dia)"
          dark
        >
          {{ item.dia }}
        </v-chip>
      </template>

    </v-data-table>

</v-container>

</template>

<script>
var minTotal= 0;
var minPrecio= 0;
var contador= 0;
var arrayPrecios= [];

var auxJumbo= 0;
var auxCarrefour= 0;
var auxDia= 0;

  export default {
    data () {
      return {
        mostrarTotales: false,
        search: '',
        tituloTotal: [
          {
            text: '',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Jumbo', value: 'jumbo' },
          { text: 'Carrefour', value: 'carrefour' },
          { text: 'Dia', value: 'dia' },
        ],
        totales: [
          {
            name: 'TOTAL',
            jumbo: 0,
            carrefour: 0,
            dia: 0,
          },
        ],
        tituloProductos: [
          {
            text: 'Productos',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Jumbo', value: 'jumbo' },
          { text: 'Carrefour', value: 'carrefour' },
          { text: 'Dia', value: 'dia' },
        ]
      }
    },
    methods: {

      getColor (nombre, precio) {
        let color= "grey"
        contador= contador +1;

        if (!arrayPrecios.includes(nombre) && precio!='Sin stock'){
          if (minPrecio== 0 || precio<minPrecio){
          //if (minPrecio== 0 || parseInt(precio,10)<parseInt(minPrecio,10)){
            minPrecio= precio
          }
          if (contador == 3){
            arrayPrecios.push(nombre,minPrecio)
            contador= 0
            minPrecio= 0
          }
        } else {
          if (precio== arrayPrecios[arrayPrecios.indexOf(nombre)+1]){ //se le suma uno al index of porque se guarda (nombre, precio)
            color= "green"
          }
        }
        return color
      },

      getColorTotal (total) {
        if (minTotal== 0 || total<minTotal){
          minTotal= total
        }
        if (minTotal== total) return 'green'
        else return "grey"
      },

      calcularTotales(){

        //this.$store.dispatch('removeProducts','Alimento para Perros Carne Asada con Vegetales Dogui 1.5 Kg');
        auxJumbo= 0;
        auxCarrefour= 0;
        auxDia= 0;

        let arrayProductos= this.$store.getters.getProductsArray;
        for (var i=0; i<arrayProductos.length; i++){
          if(arrayProductos[i].jumbo!= 'Sin stock'){
            auxJumbo= auxJumbo + parseInt(arrayProductos[i].jumbo,10);
          }
          if(arrayProductos[i].carrefour!= 'Sin stock'){
            auxCarrefour= auxCarrefour + parseInt(arrayProductos[i].carrefour,10);
          }
          if(arrayProductos[i].dia!= 'Sin stock'){
            auxDia= auxDia + parseInt(arrayProductos[i].dia,10);
          }
        }


        this.totales=[{
            name: 'TOTAL',
            jumbo: auxJumbo,
            carrefour: auxCarrefour,
            dia: auxDia,
          }];

        this.mostrarTotales= true;
        this.$forceUpdate();
      }
    }
  }
</script>