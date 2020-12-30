<template>
    <div>
        <div id="containerSignIn">
            <banniere />
            <div id="newFormSignIn">
                <form class="md-layout">
                    <div id="divForm">    
                        <md-card-header>
                            <div class="md-title">Me Connecter</div>
                        </md-card-header>
                        <md-card-content>
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100" >
                                    <md-field>
                                        <label for="email">Email</label>
                                        <md-input type="email" name="email" id="email" autocomplete="email" v-model="userEmail" />
                                    </md-field>
                                </div>
                            </div>
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="email">Mot de passe</label>
                                        <md-input type="password" name="password" id="password" autocomplete="password" v-model="userPass" />
                                    </md-field>
                                </div>
                            </div>
                        </md-card-content>
                        <md-card-actions>
                            <md-button class="md-primary" v-on:click="envoyer">Se connecter </md-button>
                        </md-card-actions>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import Banniere from "@/components/Banniere"
import router from "../router/index"

import axios from "axios"

import Vue from 'vue'
import {MdCard, MdField, MdButton} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdButton)

export default {
    name: 'LayoutHorizontalAlignment',
    components: {
        Banniere
    },
    data() {
        return {
            userEmail: "",
            userPass: "",
            url: "http://localhost:3000/api/auth/login",
            
        }
    },
    methods: {
        envoyer: function() {
            const user = {
                email: this.userEmail,
                password:  this.userPass,
                
            };

            axios.post(this.url, user, { header: {
                'Content-type': 'application/json',
                
                } 
            })
            .then(response => {
                let responseUser = response.data.userId;
                let responseToken = response.data.token;
                sessionStorage.setItem('user', JSON.stringify(responseUser)); //push de l'id dans la sessionStorage
                sessionStorage.setItem('token', responseToken);
                router.push({name: "wall"});
            
            })
            .catch(error => {
                alert(error)
                
            })
        }
    }
}

</script>

<style lang="scss" scoped>
#containerSignIn{
    background-color: #2d3f5e;
    height: 100vh;
    
    
    & #newFormSignIn{

        display: flex;
        
        justify-content: center;
        
        & #divForm{
        
        background-color: white;
        height: 300px;
        margin-top: 100px;
        width: 50vw;
        border-radius: 2px;
        }
    }
    
    

}


</style>