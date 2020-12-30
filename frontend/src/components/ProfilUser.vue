s<template>
    <div id="containerProfil">
        <div id="pageUser">
            <figure>
                <img src="@/assets/users-solid.svg">
            </figure>
            <h1>Mon Profil utilisateur </h1>
        </div>
        <div id="profil">
            <div id="title">
                <p>Avatar :</p>
                <transition name="t">
                    <div v-if="!modifyJob" id="inputAvatar">
                        <p>Nouvel Avatar :</p>
                    </div>
                </transition>
                <p>Nom : </p>
                <p>Prénom : </p>
                <p>Email : </p>
                <p>Poste occupé :</p>
            </div>
            <div id="user">
                <p v-if="user.attachment !== null"> {{ user.attachment }}</p>
                <p v-else>Pas de photo de profil</p>
                <transition name="t">
                    <div v-if="!modifyJob" class="inputAvatar">
                        <md-field id="mdFieldAvatar">
                            <label for="avatar">Selectionner une photo de profil</label>
                            <md-file id="avatar"  accept="image/*" />
                        </md-field>
                    </div>
                </transition>
                <p>{{ user.lastName }}</p>
                <p>{{ user.firstName }}</p>
                <p>{{ user.email }}</p>
                <div id="modifyJob">
                    <p>{{ user.job }}</p>
                    <transition name="t">
                        <div v-if="!modifyJob" id="inputJob">
                            <md-field>
                                <label for="job1">Saisissez votre nouveau poste"</label>
                                <md-input type="text" name="job1" id="job1" autocomplete="job1" v-model="job1" />
                            </md-field>
                            <md-field>
                                <label for="job2">Confirmez votre nouveau poste"</label>
                                <md-input type="text" name="job2" id="job2" autocomplete="job2" v-model="job2" />
                            </md-field>
                            <p id="alert">Si vous ne souhaitez pas modifier votre Poste actuel, recopier le !</p>
                            <md-button class="md-raised md-primary" type="submit" v-on:click="sendNewJob">Valider</md-button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <div id="action">
            <md-button class="md-raised md-primary" v-on:click="modifyJob=!modifyJob" type="submit">
                <span v-if="modifyJob">Modifier</span>
                <span v-else>Annuler</span>
            </md-button>
            <div id="delete">
                <md-button id="deleteButton" class="md-raised md-primary" type="submit" v-on:click="deleteUser">Supprimer mon compte</md-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import router from "../router/index"

import Vue from 'vue'
import {MdButton, MdField} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdButton)
Vue.use(MdField)

export default {
    name: "ProfilUser",
    data() {
        return {
            email1: "",
            email2: "",
            job1: "",
            job2: "",
            user: {},
            modifyAvatar: true,
            modifyJob: true,
            userConnected: JSON.parse(sessionStorage.getItem('user'))
        }
    },
    created: function() {
        let url = "http://localhost:3000/api/auth/user/" + this.userConnected;
        axios.get(url, { headers : {
            'authorization' : 'bearer ' + sessionStorage.getItem('token')
        }})
            .then(response => {
                let userToConnected = response.data.User
                this.user = userToConnected;
            })
            .catch(error => {
                alert(error);
            })   
    },
    methods: {
        sendNewJob: function() {
            let url = "http://localhost:3000/api/auth/user/ " + this.userConnected;
            
            const newAvatar = document.querySelector('#avatar');
            if (newAvatar === null || newAvatar === undefined) {
                if (this.job1 === "" || this.job2 === "") {
                console.log('Veuillez remplir tous les champs');
                } else if (this.job1 !== this.job2) {
                    console.log('Les 2 champs doivent correspondre')
                } else {

                    let data = new FormData();

                    data.append('job', this.job1);
                    data.append('attachment', null);
                    
                    axios.put(url, data, { headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': 'bearer ' + sessionStorage.getItem('token')
                        
                    }})
                    .then(() => {
                        alert('Votre profil a bien été modifié. Vous allez être redirigé vers le mur.');
                        setTimeout(function() {
                            router.push({name: "wall"})
                        }, 1000)
                    })
                    .catch(error => {
                        alert(error, "Une erreur est survenue. Votre profil n'a pas été modifié...");
                    })
                }
            } else {
                if (this.job1 === "" || this.job2 === "") {
                console.log('Veuillez remplir tous les champs');
                } else if (this.job1 !== this.job2) {
                    console.log('Les 2 champs doivent correspondre')
                } else {
                    let data = new FormData();
                    
                    data.append('job', this.job1);
                    data.append('attachment', newAvatar.files[0]);
                    
                    axios.put(url, data, { headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': 'bearer ' + sessionStorage.getItem('token')
                        
                    }})
                    .then(() => {
                        alert('Votre profil a bien été modifié. Vous allez être redirigé vers le mur.');
                        setTimeout(function() {
                            router.push({name: "wall"})
                        }, 1000)
                    })
                    .catch(error => {
                        alert(error, "Une erreur est survenue. Votre profil n'a pas été modifié...");
                    })
                }
            }
            
            

            
        },
        deleteUser: function() {
            let url = "http://localhost:3000/api/auth/user/" + this.userConnected;
            axios.delete(url, { headers : {
                'Content-type': 'application/json',
                'Authorization' : 'bearer ' + sessionStorage.getItem('token')
            }})
            .then(response => {
                console.log(response);
                sessionStorage.clear()
                alert("Votre profil a bien été supprimé.")
                setTimeout(function() {
                    router.push({name: "Home"});
                }, 1000)
               
            })
            .catch(error => {
                console.log(error)
                alert('Un petit problème empêche la suppression de votre compte...')
            })
        }
        
    }
}
</script>
<style lang="scss" scoped>
.t-enter, .t-leave-to {
    opacity: 0;
}
.t-enter-active, .t-leave-active {
    transition: opacity 2s;
}

#containerProfil {
    
    background-color: white;
    border: solid 1px black;
    margin: 50px auto;
    padding: 10px 10px 0 10px;
    width: 75%;
    height: 80%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & #pageUser {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 30px;
        & figure {

            & img {
                width: 100px;
            }
        }
        & h1 {
            margin: auto 0;
        }
    }

    & #profil {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        
        & #title {
            font-weight: bold;
        }

        & #user {

            & .inputAvatar {
                margin-top: 0;

                & #mdFieldAvatar{
                    margin-top: -20px;
                    margin-bottom: -10px;
                }
                & #avatar {
                    margin-top: 0;
                }
            }

            & #modifyJob {
                
                & #inputJob{

                    & #alert{
                        font-style: italic;
                    }
                }
            }
        }
    }

    & #action {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        & #deleteButton {
            background-color: red;
        }
    }
}
</style>
    
