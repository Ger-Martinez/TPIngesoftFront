<template>
    <v-container fluid class="pa-0 grey lighten-2">
        <v-img class="mb-5" contain src="@/assets/Fotuli.png"></v-img>
        <!-- como funciona la pagina -->
        <v-row no-gutters dense>
            <v-col cols="12" md="4" xl="4">
                <v-row justify="center">
                    <v-card max-width="80%" shaped class="mb-5">
                        <v-card-title class="justify-center">
                            <h2>¿Qué hacemos?</h2>
                        </v-card-title>
                        <v-card-text>
                            <div class="black--text">Nosotros nos encargamos de ayudarte a elegir el mejor precio para tus 
                                compras diarias. Mantenemos el precio de los productos actualizados para 
                                que no encuentres diferencias con los precios que encontrás en el 
                                supermercado.</div>
                            <v-row justify="center">
                                <v-img max-width="20%" contain src="@/assets/queHacemos.png"></v-img>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="12" md="4" xl="4">
                <v-row justify="center">
                    <v-card max-width="80%" shaped class="mb-5">
                        <v-card-title class="justify-center">
                            <h2>¿Cómo funciona?</h2>
                        </v-card-title>
                        <v-card-text>
                            <v-container v-for="(step, index) in steps" :key="index">
                                <v-list-item>
                                    <v-list-item-avatar><v-img contain :src="require('@/assets/'+imgs[index])"></v-img></v-list-item-avatar>
                                    <v-list-item-content>{{step}}</v-list-item-content>
                                </v-list-item>
                                <v-row justify="center">
                                    <v-img max-width="20%" contain :src="require('@/assets/'+imgs2[index])"></v-img>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="12" md="4" xl="4">
                <v-row justify="center">
                    <v-card max-width="80%" shaped class="mb-5">
                        <v-card-title class="justify-center">
                            <h2>Algunas opciones</h2>
                        </v-card-title>
                        <v-card-text>
                            <v-carousel cycle hide-delimiters show-arrows-on-hover height="400" width="100">
                                <v-carousel-item v-for="(img, index) in supers" :key="index">
                                    <v-sheet class="white" height="100%" width="400">
                                    <v-row class="fill-height" align="center" justify="center">
                                    <img :src="require('@/assets/'+supers[index])" style="width:200px;height:auto;"/></v-row>
                                    </v-sheet>
                                </v-carousel-item>
                            </v-carousel>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>    
    </v-container>
</template>

<script>

var URL= "https://serene-oasis-15073.herokuapp.com";
//var URL= "http://localhost:8080";

// @ is an alias to /src
export default {
    components:{ 
        
    },
    data(){
        return{
            steps: ["Armá tu carrito de compras desde nuestro sitio web.",
                    "Compará el valor de tu carrito entre los supermercados que tengas más cerca.",
                    "Relajate y esperá que llegue tu pedido."],
            imgs: ['one.png', 'two.png', 'three.png'],
            imgs2: ['s1.png', 's2.png', 's3.png'],
            supers: ['jumbo.png', 'coto.png', 'dia.png', 'carrefour.jpg'],
            test1: ''
        }
    },
    methods:{

        test: function(){
            this.axios.get(URL+'/marketproducts/get/7790070032669?supermarket=JUMBO').then(
                response => {
                    console.log("entre")
                    this.test1 = response;
                }
            ).catch(e => console.log(e));
        }
    }
  }
</script>
