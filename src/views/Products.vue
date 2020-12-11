<template>
    <v-container fluid class="pa-0 grey lighten-2">
        <v-row class="grey lighten-1 mb-3" >
            <v-col>
                <v-row justify="center">
                    <category class="mx-3 mt-1 mb-1" v-for="i in 9" :key="i" icon="sinAlcoholIcon.svg" catName="Hola"/>
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
import producto from "@/components/ProductCard";
import category from "@/components/CategoryCard";
export default {
    components:{
        producto, 
        category
    },
    
}
</script>