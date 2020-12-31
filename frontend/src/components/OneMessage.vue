<template>
    <div id="containerMessages">
        <div id="userMessage">
            <div class="userToMessage">
                <div v-if="avatarUrl === null">
                    <md-avatar>
                        <img class="userPicture" src="@/assets/users-solid.svg/">
                    </md-avatar>
                </div>
                <div v-else>
                    <md-avatar>
                        <img class="userPicture" v-bind:src="avatarUrl" alt="photo de profil">
                    </md-avatar>
                </div>
                <div id="nameAndJobUser">
                    <p class="user">{{user.firstName}} {{user.lastName}}</p>
                    <p class="job"><span>{{user.job}}</span></p>
                </div>
            </div>  
            <div class="message">
                <div id="modifyMessage">
                    <figure class="pictureMessage" v-if="message.attachment !== null">
                        <img id="imageMessage" v-bind:src="imageUrl" alt="image">
                    </figure>
                    <transition name="t">
                        <div v-if="!modifyMessage" id="inputNewImage">
                            <md-field id="mdFieldAvatar">
                                <label for="image1">Selectionner une nouvelle image</label>
                                <md-file id="image1"  accept="image/*" />
                            </md-field>
                        </div>
                    </transition>
                    <p class="content">{{message.content}}</p>
                    <transition name="t">
                        <div v-if="!modifyMessage" id="inputNewContent">
                            <textarea v-model="newContent" id="content1" cols="75" placeholder="Si vous ne souhaitez pas le modifier, copier le !"></textarea>
                            <md-button class="md-raised md-primary" type="submit" v-on:click="sendNewMessage">Valider</md-button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <div id="button">
            <md-button class=" md-primary" type="submit" v-on:click="modifyMessage=!modifyMessage">
                <span v-if="modifyMessage">Modifier</span>
                <span v-else>Annuler</span>
            </md-button>
            <md-button class=" md-primary" id="deleteButton" type="submit" v-on:click="deleteMessage">Supprimer</md-button>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import router from "../router/index"

    import Vue from 'vue'
    import {MdAvatar, MdButton, MdField} from 'vue-material/dist/components'
    import 'vue-material/dist/vue-material.min.css'
    import 'vue-material/dist/theme/default.css'

    Vue.use(MdAvatar)
    Vue.use(MdButton)
    Vue.use(MdField)

    export default {
       name: 'OneMessage',
       data() {
            return {
                idMessage: "",
                user: {},
                message: {},
                avatarUrl: "",
                imageUrl: "",
                modifyMessage: true,
                newContent: ""
            }
        },
        created: function() {
            const str = window.location;
            const url = new URL(str);
            const idUrl = url.searchParams.get("idmessage");
            this.idMessage = idUrl;

            let urlMessage = "http://localhost:3000/api/message/oneMessage/" + this.idMessage;

            axios.get(urlMessage, {headers: {
                'Authorization': 'bearer ' + sessionStorage.getItem('token')
            }})
            .then((response) => {
                let user = response.data.message.User;
                this.user = user;

                let message = response.data.message;
                this.message = message;
                this.avatarUrl = response.data.message.User.attachment;
                this.imageUrl = message.attachment;
            
            })
            .catch(() => {
                alert('Vous ne pouvez accéder à cette page');
            })
        },
        methods: {
            sendNewMessage: function() {
                let url = "http://localhost:3000/api/message/" + this.idMessage;
                const newImage = document.querySelector('#image1');
                if (this.message.attachment === null || this.message.attachment === undefined) {
                    if (newImage.files[0] === null || newImage.files[0] === undefined) {
                        let data = new FormData();

                        data.append('content', this.newContent);
                        data.append('attachment', null);

                        axios.put(url, data, {headers: {
                            'Content-type': 'multipart/form-data',
                            'Authorization': 'bearer ' + sessionStorage.getItem('token')
                        }})
                        .then(() => {
                            alert('Votre message à bien été modifié ! Vous allez être redirigé.');
                            setTimeout(function() {
                                router.push({name: "wall"})
                            }, 1000)
                        })
                        .catch(()=> {
                            alert('impossible de modifier le message...')
                        })
                    } else {
                        let data = new FormData();

                        data.append('content', this.newContent);
                        data.append('attachment', newImage.files[0])

                        axios.put(url, data, {headers: {
                            'Content-type': 'multipart/form-data',
                            'Authorization': 'bearer ' + sessionStorage.getItem('token')
                        }})
                        .then(() => {
                            alert('Votre message à bien été modifié ! Vous allez être redirigé.');
                            setTimeout(function() {
                                router.push({name: "wall"})
                            }, 1000)
                        })
                        .catch(()=> {
                            alert('impossible de modifier le message...')
                        })
                    }
                } else {
                    if (newImage.files[0] === null || newImage.files[0] === undefined) {
                        let data = new FormData();

                        data.append('content', this.newContent);
                        data.append('attachment', null);

                        axios.put(url, data, {headers: {
                            'Content-type': 'multipart/form-data',
                            'Authorization': 'bearer ' + sessionStorage.getItem('token')
                        }})
                        .then(() => {
                            alert('Votre message à bien été modifié ! Vous allez être redirigé.');
                            setTimeout(function() {
                                router.push({name: "wall"})
                            }, 1000)
                        })
                        .catch(()=> {
                            alert('impossible de modifier le message...')
                        })
                    } else {
                        let data = new FormData();

                        data.append('content', this.newContent);
                        data.append('attachment', newImage.files[0])

                        axios.put(url, data, {headers: {
                            'Content-type': 'multipart/form-data',
                            'Authorization': 'bearer ' + sessionStorage.getItem('token')
                        }})
                        .then(() => {
                            alert('Votre message à bien été modifié ! Vous allez être redirigé.');
                            setTimeout(function() {
                                router.push({name: "wall"})
                            }, 1000)
                        })
                        .catch(()=> {
                            alert('impossible de modifier le message...')
                        })
                    }
                }
            },
            deleteMessage: function() {
                let urlMessageForDelete = "http://localhost:3000/api/message/" + this.idMessage;

                axios.delete(urlMessageForDelete, {headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem('token')
                }})
                .then(() => {
                    alert('Votre message à bien été supprimé ! Vous allez être redirigé.');
                    setTimeout(function() {
                        router.push({name: "wall"})
                    }, 1000)
                })
                .catch(() => {
                    alert('Vous ne pouvez supprimer le message...')
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
#containerMessages {
    background-color: white;
    border: solid 1px black;
    margin: 100px auto;
    padding: 10px 10px 0 10px;
    width: 75%;
    border-radius: 5px;
    
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & #userMessage {
        width: 700px;
        height: auto;
        margin: 25px auto;

        & .userToMessage{
            display: flex;
            flex-direction: row;
            display: flex;
            flex-direction: row;

            & #nameAndJobUser {
                margin: -10px 0 0 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;

                & .user {
                    font-weight: bold;
                }
                    
                & .job {
                    margin-top: -20px;
                    font-style: italic;
                }
            }
        }
    }
    & .message {
        .t-enter, .t-leave-to {
            opacity: 0;
        }
        .t-enter-active, .t-leave-active {
            transition: opacity 2s;
        }
        & figure {
            
            & img {
                width: 625px;
            }
        }
        & #inputNewContent {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            & #content1{
                border-radius: 10px;
                border: solid 2px grey;
            }
        }
    }
    #pictureMessage {
        width: 500px;
        & img {
            width: 200px;
        }
    }
    & #idMessage {
        display: none;
    }
    & #button {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 20px;

        & #deleteButton {
            color: red;
        }
    }
}
</style>