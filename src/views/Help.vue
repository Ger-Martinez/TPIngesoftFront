<template>
    <div>
        <NavBar />
        <v-main>
            <v-container>
                <v-row justify="center">
                    <v-col cols="auto">
                        <h1>Need some help?</h1>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="10">
                        <v-expansion-panels accordion focusable>
                            <v-expansion-panel
                                v-for="(item, i) in helpItems"
                                :key="i"
                            >
                                <v-expansion-panel-header>
                                    {{ item.title }}
                                    <template v-slot:actions>
                                        <v-icon color="primary">
                                            $expand
                                        </v-icon>
                                    </template>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <template>
                                        <HelpDescription
                                            :steps="item.description"
                                        />
                                    </template>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import HelpDescription from "@/components/HelpDescription";
export default {
    name: "Help",
    components: {
        NavBar,
        HelpDescription
    },
    data: () => ({
        helpItems: [
            {
                title: "¿Qué hacemos?",
                description: [
                    "Nos encargamos de ayudarte a elegir el mejor precio para tus compras diarias.",
                    "Mantenemos el precio de los productos actualizados para que no encuentres diferencias con los precios que encontrás en el supermercado.",
                    "Facilitamos la elección de supermercado a la hora de realizar las compras.",
                ]
            },
            {
                title: "¿Cómo funciona?",
                description: [
                    "Arma tu carrito de compras desde nuestro sitio web.",
                    "Compara el valor de tu carrito entre los supermercados que mas cerca estén de vos.",
                    "Relajate y espera que tu pedido llegue.",
                ]
            },
        ]
    })
};
</script>