<template>
    <v-card max-width="200" max-height="200"  @click="filtrarCategoria()">
        <v-card-text class="justify-center">
            <v-row align="center" justify="center" class="ma-5">     
                    <v-img :src="require('@/assets/'+icon)"></v-img>
            </v-row>
            <v-row justify="center" class="black--text">
                    {{catName}}
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props:{
        icon: String,
        catName: String,
    },
    methods:{
        filtrarCategoria(){
            console.log(this.catName);
        }
    }
}
</script>