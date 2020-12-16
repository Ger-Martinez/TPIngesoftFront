<template>
    <v-container fluid class="pa-0 grey lighten-2">
        <v-row class="grey lighten-1 mb-3" >
            <v-col>
                <!-- v-container class="mx-3 mt-1 mb-1" -->
                <v-row class="mx-3 mt-1 mb-1" fluid>
                    <v-col v-for="i in 9" :key="i" >
                        <v-card max-width="150" max-height="150"  @click="filtrarCategoria(i)">
                            <v-card-text class="justify-center">
                                <v-row align="center" justify="center" class="ma-5">     
                                        <v-img :src="require('@/assets/'+getIcon(i))"></v-img>
                                </v-row>
                                <v-row justify="center" class="black--text">
                                        {{getCategoryName(i)}}
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
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
                    <producto :icon="getIcon(categoriaActual)" :titulo="getProductName(i)"/>
                    <!--producto icon="sinAlcoholIcon.svg" titulo="Noni" descripcion="aaaaaa" precio="2" /-->
                </v-col>
            </v-row>
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
                    }
                    console.log(this.nombreProductosArray);
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
        }
    }
    
}
</script>