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

        <div>
            <v-btn
                text
                color="contrast"
                class="white--text"
                v-for="(item, index) in nav_buttons"
                :key="index"
                :to="item.path"
                >{{ item.title }}</v-btn
            >
        </div>

        <v-spacer></v-spacer>

        <v-menu
            :close-on-click="true"
            :close-on-content-click="true"
            :offset-y="true"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" text v-on="on">
                    <v-avatar size="75%">
                        <v-icon dark color="contrast">mdi-account_circle</v-icon>
                    </v-avatar>
                </v-btn>
            </template>
            <v-list dense flat>
                <v-list-item
                    v-for="(item, index) in profile_overflow"
                    :key="index"
                    :to="item.element.path">
                    <v-list-item-icon>
                        <v-icon v-text="item.element.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title
                        v-text="item.element.title"
                    ></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
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
        ],
        profile_overflow: [
            {
                element: {
                    title: "My Profile",
                    icon: "person",
                    path: "/profile"
                }
            },
            {
                element: {
                    title: "Help",
                    icon: "help_outline",
                    path: "/help"
                }
            },
            {
                element: {
                    title: "Sign Out",
                    icon: "exit_to_app",
                    path: "",
                    action: "logout"
                }
            }
        ]
    }),
};
</script>