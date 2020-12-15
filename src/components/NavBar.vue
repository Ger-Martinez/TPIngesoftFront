<template>
    <v-app-bar app color="#65bcc6" flat>
        <div class="d-flex align-center justify-start">
            <v-img
                alt="Sportify Logo"
                class="pl-0"
                contain
                src="@/assets/Voy al Super Logo.svg"
                transition="scale-transition"
                max-height="100"
                max-width="200"
                to="/"
                style="cursor: pointer" @click="$router.push('/')"/>
            <v-toolbar-title style="cursor: pointer" @click="$router.push('/')" class="ml-3 white--text" > Voy al Super </v-toolbar-title>
        </div>
        <v-spacer></v-spacer>

        <v-btn
            text
            color="contrast"
            class="white--text"
            v-for="(item, index) in nav_buttons"
            :key="index"
            :to="item.path"
            >{{ item.title }}</v-btn>

        <v-spacer></v-spacer>
        <v-btn class="yellow darken-4 white--text" to="/login">Iniciar Sesion</v-btn>
    </v-app-bar>
</template>
<script>
export default {
    name: "NavBar",

    data: () => ({
        nav_buttons: [
            { title: "Home", path: "/" },
            { title: "Productos", path: "/productos" },
            { title: "Comparar", path: "/comparador" }
        ]
    }),
};
</script>