<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col cols="5">
                <v-card>
                    <v-card-title>Registrarse</v-card-title>
                    <v-card-subtitle>Ingrese su usuario y contraseña para acceder a su cuenta.</v-card-subtitle>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field
                            label="Nombre"
                            required
                            outlined></v-text-field>
                        <v-text-field
                            label="Apellido"
                            required
                            outlined></v-text-field>
                        <v-text-field
                            label="Mail"
                            required
                            :rules="emailRules"
                            outlined></v-text-field>
                        <v-text-field
                            outlined label="Contraseña"
                            required 
                            :rules="passwordRules" 
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            v-model="r_passw"
                            @click:append="show1 = !show1"/>
                        <v-text-field 
                            outlined label="Confirmar contraseña"
                            required
                            :rules="passConfirmationRules" 
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="primary" :disabled="!valid" @click="registerform" block>Registrase</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="5">
                <v-card>
                    <v-card-title>Iniciar Sesión</v-card-title>
                    <v-card-subtitle>Ingrese su usuario y contraseña para acceder a su cuenta.</v-card-subtitle>
                    <v-card-text>
                        <v-text-field
                            label="Usuario"
                            outlined></v-text-field>
                        <v-text-field 
                            outlined label="Contraseña" 
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            @click:append="show2 = !show2"/>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="success" block>Iniciar Sesión</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script>
export default {
    data(){
        return{
            show1: false,
            show2: false,
            valid: false,
            r_passw: '',
            emailRules: [
                v => !!v || 'El email es obligatorio.',
                v => /.+@.+/.test(v) || 'El email ingresado no es valido.',
            ],
            passwordRules:[
                v => !!v || 'Necesitas una contraseña.',
                v => v.length >= 6 || 'La contraseña es demasiado corta, minimo 6 caracteres o digitos.',
            ],
            passConfirmationRules:[
                v => !!v || 'Confirma tu contraseña.',
                v => v == this.r_passw || 'Las contraseñas no coinciden.',
            ]
        }
    },
    methods:{
        registerform(){
            this.$refs.form.validate();
        }
    }
}
</script>