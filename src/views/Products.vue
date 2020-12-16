<template>
    <v-container fluid class="pa-0 grey lighten-2">
        <v-row class="grey lighten-1 mb-3" >
            <v-col>
                <v-row justify="center">
                    <div v-for="i in 9" :key="i" >
                        <v-card class="mx-4" max-width="400" max-height="400"  @click="filtrarCategoria(i)">
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
                <!-- /v-container -->
                <!--v-row justify="center" class="mx-3 mt-1 mb-1" v-for="i in 9" :key="i" -->
                    <!-- category class="mx-3 mt-1 mb-1" v-for="i in 9" :key="i" :icon="getIcon(i)" :catName="getCategoryName(i)"/ -->
                <!-- /v-row -->
            </v-col>
        </v-row>
        <v-row v-if="mostrarProductos== true">
            <v-row>
                <v-col cols="2" v-for="i in productosSize" :key="i">
                    <producto :icon="getIcon(categoriaActual)" :titulo="getProductName(i)"
                    :ean="getEAN(i)" :precioDia="getPrecioDia(i)"/>
                    <!--producto icon="sinAlcoholIcon.svg" titulo="Noni" descripcion="aaaaaa" precio="2" /-->
                </v-col>
            </v-row>
        </v-row>
        <v-row v-else justify="center" align="center">
            <v-card>
                <v-card-title>¡Bienvenido al buscador de productos!</v-card-title>
                <v-card-subtitle>Ahora te explicaremos brevemente como funciona.</v-card-subtitle>
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
    </v-container>
</template>

<script>

let categoryArray= ["ALIMENTOS_CONGELADOS", "ALMACEN", "BEBIDAS_CON_ALCOHOL", "BEBIDAS_SIN_ALCOHOL", "BEBES", "FRESCOS", "LIMPIEZA", "MASCOTAS", "PERFUMERIA_CUIDADO_PERSONAL"];
var categoryIconsArray= ["congeladosIcon.svg", "almacenIcon.svg", "alcoholIcon.svg", "sinAlcoholIcon.svg", "bebesIcon.svg", "frescoIcon.svg", "limpiezaIcon.svg", "mascotaIcon.svg", "cuidadoPersonalIcon.svg"];
var categoryNamesArray= ["Congelados", "Almacén", "Bebidas con alcohol", "Bebidas sin alcohol", "Bebés", "Frescos", "Limpieza", "Mascotas", "Cuidado personal"];
var URL= "https://serene-oasis-15073.herokuapp.com";

import producto from "@/components/ProductCard";
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
            preciosDiaArray:[],
            imgs: ['one.png', 'two.png', 'three.png'],
            steps: ["Selecciona alguna de las categorias que vez en la parte superior de la pantalla.",
                    "Encuentra algun producto que estes buscando de nuestro catalogo de productos.",
                    "Ve mas informacion sobre el producto o añadelo a tu carrito para compararlo luego."],
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
                        this.preciosDiaArray.push(this.getPrecio(data[i].ean,"DIA"));
                        console.log("PRECIO: "+ this.preciosDiaArray[i]);
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
                    console.error(data.price);
                    return data.price;
                }
            ).catch(e => console.log(e));
        },

        getPrecioDia(i){
            this.preciosDiaArray[i-1];
        }
    }
    
}
</script>