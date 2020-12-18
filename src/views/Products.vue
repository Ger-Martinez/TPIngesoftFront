<template>
    <v-container fluid class="pa-0 grey lighten-2">
        <v-row class="grey lighten-1 mb-3" >
            <v-col>
                <v-row justify="center">
                    <div v-for="i in 9" :key="i" >
                        <v-card class="mx-4 mb-2" max-width="400" max-height="400"  @click="filtrarCategoria(i)">
                            <v-card-text class="justify-center">
                                <v-row align="center" justify="center" class="ma-5">     
                                        <v-img :src="require('@/assets/'+getIcon(i))"></v-img>
                                </v-row>
                                <v-row justify="center" class="black--text">
                                        {{getCategoryName(i)}}
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-if="mostrarProductos== true" justify="center" align="center">
            <div v-for="i in productosSize" :key="i">
                <producto class="mx-3 mb-3" :icon="getIcon(categoriaActual)" :titulo="getProductName(i)"
                :ean="getEAN(i)" v-on:mostrarSnackBar="mostrarSnack($event)"/>
                <!--producto icon="sinAlcoholIcon.svg" titulo="Noni" descripcion="aaaaaa" precio="2" /-->
            </div>
        </v-row>
        <v-row v-else justify="center" align="center">
            <v-card>
                <v-card-title>¡Bienvenido al buscador de productos!</v-card-title>
                <v-card-subtitle>Ahora te explicaremos brevemente cómo funciona.</v-card-subtitle>
                <v-card-text>
                    <v-container v-for="(step, index) in steps" :key="index">
                        <v-list-item>
                            <v-list-item-avatar><v-img contain :src="require('@/assets/'+imgs[index])"></v-img></v-list-item-avatar>
                            <v-list-item-content>{{step}}</v-list-item-content>
                        </v-list-item>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-row>
    
    <div class="text-center">

        <v-snackbar v-model="snackbar" :timeout="timeout" >
        {{ snackText }}
        </v-snackbar>
    </div>

    </v-container>
</template>

<script>

let categoryArray= ["ALIMENTOS_CONGELADOS", "ALMACEN", "BEBIDAS_SIN_ALCOHOL", "BEBES", "BEBIDAS_CON_ALCOHOL", "FRESCOS", "LIMPIEZA", "MASCOTAS", "PERFUMERIA_CUIDADO_PERSONAL"];
var categoryIconsArray= ["congeladosIcon.svg", "almacenIcon.svg", "alcoholIcon.svg", "sinAlcoholIcon.svg", "bebesIcon.svg", "frescoIcon.svg", "limpiezaIcon.svg", "mascotaIcon.svg", "cuidadoPersonalIcon.svg"];
var categoryNamesArray= ["Congelados", "Almacén", "Bebidas con alcohol", "Bebidas sin alcohol", "Bebés", "Frescos", "Limpieza", "Mascotas", "Cuidado personal"];
var URL= "https://serene-oasis-15073.herokuapp.com";


import producto from "@/components/ProductCard";
//import func from '../../vue-temp/vue-editor-bridge';
//import category from "@/components/CategoryCard";
export default {

    data(){
        return{
            mostrarProductos: false,
            productosSize: 0,
            nombreProductosArray: [],
            imgProductosArray: [],
            eanProductosArray: [],
            categoriaActual: 0,
            //preciosDiaArray:[],
            imgs: ['one.png', 'two.png', 'three.png'],
            steps: ["Seleccioná alguna de las categorias que ves en la parte superior de la pantalla.",
                    "Encontrá algún producto que estés buscando de nuestro catálogo de productos.",
                    "Podés ver el precio o agregarlo a la lista para compararlo luego."],
            snackbar: false,
            snackText: '',
            timeout: 3000,
        }
    },

    components:{
        producto, 
        //category
    },

    methods: {

        getIcon(i){
            return categoryIconsArray[i-1];
        },

        getCategoryName(i){
            return categoryNamesArray[i-1];
        },

        filter(i){
            console.log(i);
        },

        filtrarCategoria: function(i){
            this.inicializarVariables(i);
            this.axios.get(URL+'/products/get/'+categoryArray[i-1]).then(
                response => {
                    var data = response.data;
                    this.productosSize= data.length;
                    for (i=0; i<this.productosSize; i++){
                        this.nombreProductosArray.push(data[i].description);
                        this.imgProductosArray.push(data[i].imgUrl);
                        this.eanProductosArray.push(data[i].ean);
                        //this.preciosDiaArray.push(this.getPrecio(data[i].ean,"DIA"));
                        //console.log("PRECIO: "+ this.preciosDiaArray[i]);
                    }
                    this.mostrarProductos= true;
                }
            ).catch(e => console.log(e));
        },

        inicializarVariables(i){
            this.categoriaActual= i;
            this.nombreProductosArray= [];
            this.imgProductosArray= [];
            this.eanProductosArray= [];
        },

/*
        getImage(i){
            try{
                return this.imgProductosArray[i-1];
            } catch (error) {
                return categoryIconsArray[i-1];
            }
*/
            
        getProductName(i){
            return this.nombreProductosArray[i-1];
        },

        getEAN(i){
            return this.eanProductosArray[i-1];
        },

        getPrecio(ean, supermercado){
            this.axios.get(URL+'/marketproducts/get/'+ean+'?supermarket='+supermercado).then(
                response => {
                    var data = response.data;
                    return data.price;
                }
            ).catch(e => console.log(e));
        },
        mostrarSnack(texto){
            this.snackbar= true;
            this.snackText= texto;
        },
    }
}
</script>