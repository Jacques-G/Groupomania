<template>
    <div id="containerSignUp">
        <banniere /><!--Appel du composant Banniere pour affichage-->
        <div id="newForm">
            <form class="md-layout">
                <div id="idForm">    
                    <md-card-header>
                        <div class="md-title">M'inscrire</div>
                    </md-card-header>
                    <md-card-content>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100" >
                                <md-field>
                                    <label for="firstName">Prénom</label>
                                    <md-input type="firstName" name="firstName" id="firstName" autocomplete="firstName" v-model="firstName" required />
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100" >
                                <md-field>
                                    <label for="lastName">Nom</label>
                                    <md-input type="lastName" name="lastName" id="lastName" autocomplete="lastName" v-model="lastName" required />
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100" >
                                <md-field>
                                    <label for="email">Email</label>
                                    <md-input type="email" name="email" id="email" autocomplete="email" v-model="email" required />
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100" >
                                <md-field>
                                    <label for="job">Emploi</label>
                                    <md-input type="job" name="job" id="job" autocomplete="job" v-model="job" required />
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                                <md-field>
                                    <label for="password">Mot de passe</label>
                                    <md-input type="password" name="password" id="password" autocomplete="password" v-model="password" required />
                                </md-field>
                            </div>
                        </div>
                    </md-card-content>
                    <md-card-actions>
                        <md-button class="md-primary" v-on:click="envoyer">S'inscrire </md-button>
                    </md-card-actions>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Banniere from "@/components/Banniere" //Import du composant Banniere
import axios from "axios" // Import d'Axios pour requete HTTP
import router from "../router/index"// Permet la redirection

// IMPORT POUR VUE MATERIA
import Vue from 'vue'
import {MdCard, MdField, MdButton} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdButton)

export default {
    components: {
        Banniere
    },
    data() {
        return {
            url: 'http://localhost:3000/api/auth/signup',
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            job: "",
        }
    },
    methods: {
        envoyer: function() {
            let newUser = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                job: this.job
            };
            const header = {
                'Content-type': 'application/json'
            };
            axios.post(this.url, newUser, { header })
                .then(() => {
                    alert('Votre compte à bien été créé. Veuillez vous connecter à présent.')
                    setTimeout(function() {
                        router.push({name: "signIn"})
                    }, 1000)
                })
                .catch((error) => alert(error))
        }
    }
}
</script>
<style lang="scss" scoped>

#containerSignUp{
    height: 100vh;
    background-color: #2d3f5e;
     & #newForm{
        display: flex;
        justify-content: center;
        margin-top: -20px;
     }

    & #idForm{
        background-color: white;
        
        margin-top: 100px;
        width: 50vw;
        border-radius: 2px;

         & span{
                color: red;
            }
    }
}

//RESPONSIVE 
@media all and (max-width: 750px) {
#containerSignUp{
    height: auto;

    & #newForm{

        & #idForm{
            width: 95vw;
            margin-bottom: 10px;

        }
    }
}
}

</style>