<template>
  <v-container>
    <v-data-table
      :headers="tituloProductos"
      :items="productos"
      :search="search"
      item-key="name"
      class="elevation-1 "
      :items-per-page="1000"
    >

      <template v-slot:top>
        <v-toolbar flat class="blue darken-1">
          <v-toolbar-title class="white--text">Comparación de productos</v-toolbar-title>
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
        <v-chip
          :color="getColor(item.name, item.jumbo)"
          dark
        >
          {{ item.jumbo }}
        </v-chip>
      </template>

      <template v-slot:[`item.carrefour`]="{ item }">
        <v-chip
          :color="getColor(item.name, item.carrefour)"
          dark
        >
          {{ item.carrefour }}
        </v-chip>
      </template>

      <template v-slot:[`item.dia`]="{ item }">
        <v-chip
          :color="getColor(item.name, item.dia)"
          dark
        >
          {{ item.dia }}
        </v-chip>
      </template>

    </v-data-table>
    
    <v-data-table
      :headers="tituloTotal"
      :items="totales"
      hide-default-footer
      :items-per-page="5"
      class="elevation-2 mt-7"
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

  export default {
    data () {
      return {
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
            jumbo: 200,
            carrefour: 100,
            dia: 50,
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
        ],
        productos: [
          {
            name: 'Leche serenísima',
            jumbo: 35,
            carrefour: 45,
            dia:35,
          },
          {
            name: 'Paty 100g',
            jumbo: 10,
            carrefour: 5,
            dia: 23,
          },
          {
            name: 'Azucar 200g',
            jumbo: 25,
            carrefour: 20,
            dia: 23,
          },
          {
            name: 'Cupcake',
            jumbo: 160,
            carrefour: 45,
            dia: 23,
          },
          {
            name: 'Gingerbread',
            jumbo: 160,
            carrefour: 45,
            dia: 23,
          },
          {
            name: 'Jelly bean',
            jumbo: 11,
            carrefour: 45,
            dia: 23,
          },
          {
            name: 'Galletitas',
            jumbo: 110,
            carrefour: 115,
            dia: 105,
          },
          {
            name: 'Cereales',
            jumbo: 110,
            carrefour: 120,
            dia: 105,
          },
          {
            name: 'Pan',
            jumbo: 30,
            carrefour: 40,
            dia: 35,
          },
          {
            name: 'Verdura',
            jumbo: 211,
            carrefour: 235,
            dia: 233,
          },
          {
            name: 'Coca',
            jumbo: 111,
            carrefour: 215,
            dia: 123,
          },
          {
            name: 'Yerba',
            jumbo: 121,
            carrefour: 145,
            dia: 223,
          },
          {
            name: 'Agua',
            jumbo: 100,
            carrefour: 90,
            dia: 105,
          },
        ],
      }
    },
    methods: {

      getColor (nombre, precio) {
        let color= "grey"
        contador= contador +1;

        if (!arrayPrecios.includes(nombre)){
          if (minPrecio== 0 || precio<minPrecio){
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
    },
  }
</script>