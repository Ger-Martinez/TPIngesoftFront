<template>
    <v-card max-height="200">
        <v-card-text class="justify-center">
            <v-row align="center" justify="center" class="ma-5">     
                    <v-img :src="require('@/assets/'+icon)"></v-img>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    props:{
        icon: String
    }
}
</script>