<template>
    <v-container fluid class="pa-0 grey lighten-2">
        <v-row class="grey lighten-1 mb-3" >
            <v-col>
                <v-row justify="center">
                    <category class="mx-3 mt-1 mb-1" v-for="i in 9" :key="i" :icon="getIcon(i)" :catName="getCategoryName(i)"/>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2" v-for="i in 30" :key="i">
                <producto icon="sinAlcoholIcon.svg" titulo="Noni" descripcion="aaaaaa" precio="2" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

//let categoryArray= [ALIMENTOS_CONGELADOS, ALMACEN, BEBIDAS_CON_ALCOHOL, BEBIDAS_SIN_ALCOHOL, BEBES, FRESCOS, LIMPIEZA, MASCOTAS, PERFUMERIA_CUIDADO_PERSONAL];
let categoryIconsArray= ["congeladosIcon.svg", "almacenIcon.svg", "alcoholIcon.svg", "sinAlcoholIcon.svg", "bebesIcon.svg", "frescoIcon.svg", "limpiezaIcon.svg", "mascotaIcon.svg", "cuidadoPersonalIcon.svg"];
let categoryNamesArray= ["Congelados", "Almacén", "Bebidas con alcohol", "Bebidas sin alcohol", "Bebés", "Frescos", "Limpieza", "Mascotas", "Cuidado personal"];

import producto from "@/components/ProductCard";
import category from "@/components/CategoryCard";
export default {
    components:{
        producto, 
        category
    },

    methods: {

        getIcon(i){
            return categoryIconsArray[i-1];
        },

        getCategoryName(i){
            return categoryNamesArray[i-1];
        }
    }
    
}
</script>