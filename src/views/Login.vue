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
                            v-model="r_nombre"
                            outlined></v-text-field>
                        <v-text-field
                            label="Apellido"
                            required
                            v-model="r_apellido"
                            outlined></v-text-field>
                        <v-text-field
                            label="Mail"
                            required
                            v-model="r_mail"
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
                        <v-btn class="primary" :disabled="!valid" @click="registerform()" :loading="this.register" block>Registrarse</v-btn>
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
                            v-model="i_mail"
                            outlined></v-text-field>
                        <v-text-field 
                            v-model="i_passw"
                            outlined label="Contraseña" 
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            @click:append="show2 = !show2"/>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="success" block @click="loginform()" :loading="this.login">Iniciar Sesión</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script>
import { logInBus } from "../main";
import router from '../router/index';
export default {
    data(){
        return{
            login: false,
            register: false,
            show1: false,
            show2: false,
            valid: false,
            // Para el registro de cuentas --> //
            r_passw: '',
            r_mail:'',
            r_nombre:'',
            r_apellido:'',
            // <-- //
            // Para el inicio de sesion --> //
            i_passw: '',
            i_mail:'',
            // <-- //
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
        loginform(){
            this.login=true;
            this.axios.post('http://localhost:8080/authenticate/authenticate',
                {
                    "password": this.i_passw,
                    "username": this.i_mail
                }).then(
                response => {
                    console.log("entre")
                    this.test1 = response;
                    logInBus.$emit('logedIn', true);
                    this.login=false;
                    router.push({name:'Productos'})
                }
            ).catch(e => console.log(e));
        },
        registerform(){
            if(this.$refs.form.validate()){
                this.register=true;
                this.axios.post('http://localhost:8080/authenticate/register',
                    {
                        "email": this.r_mail,
                        "firstName": this.r_nombre,
                        "lastName": this.r_apellido,
                        "password": this.r_passw,
                        "role": "ROLE_USER"
                    }).then(
                    response => {
                        console.log("entre")
                        this.test1 = response;
                        logInBus.$emit('logedIn', true);
                        this.register=false;
                        router.push({name:'Productos'})
                    }
                ).catch(e => console.log(e));
            }
        }
    }
}
</script>