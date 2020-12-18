s<template>
    <div id="container">
        <h1>Mon Profil utilisateur </h1>
        <div id="profil">
            <div id="title">
                <p>Avatar :</p>
                <p>Nom : </p>
                <p>Prénom : </p>
                <p>Email : </p>
                <p>Poste occupé :</p>
            </div>
            <div id="user">
                <p> {{ user.attachment }}</p>
                <transition name="t">
                        <div v-if="!modifyJob" id="inputAvatar">
                            <input id="avatar" type="file" placeholder="Selectionner une photo de profil">
                        </div>
                   </transition>
                <p>{{ user.lastName }}</p>
                <p>{{ user.firstName }}</p>
                <p>{{ user.email }}</p>
                <div id="modifyJob">
                    <p>{{ user.job }}</p>
                    <transition name="t">
                        <div v-if="!modifyJob" id="inputJob">
                            <input v-model="job1" id="job1" type="text" placeholder="Saisissez votre nouveau poste">
                            <input v-model="job2" id="job2" type="text" placeholder="Confirmer votre nouveau poste">
                            <button type="submit" v-on:click="sendNewJob">Valider</button>
                        </div>
                    </transition>
                </div>
            </div>
            <div id="action">
                <p>Ne peux être modifier</p>
                <p>Ne peux être modifier</p>
                <button v-on:click="modifyJob=!modifyJob" type="submit">
                    <span v-if="modifyJob">Modifier</span>
                    <span v-else>Annuler</span>
                </button>
            </div>
        </div>
        <div id="delete">
            <button type="submit" v-on:click="deleteUser">Supprimer mon compte</button>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import router from "../router/index"

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
                console.log(this.user)
            })
            .catch(error => {
                console.log(error);
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
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
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
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
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
                router.push({name: "Home"});
            })
            .catch(error => {
                console.log(error)
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
</style>
    
