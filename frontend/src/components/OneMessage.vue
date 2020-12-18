<template>
    <div id="containerMessages">
        <div id="userMessage"> <!--Boucle sur la base de donnée pour afficher ltous les messages-->
            <div class="userToMessage">
                <img id="avatar" v-bind:src="avatarUrl" alt="photo de profil">
                <p class="user">{{user.firstName}} {{user.lastName}}</p>
                <p class="job"><span>{{user.job}}</span></p>
            </div>  
            <div class="message">
                <div id="modifyMessage">
                    <p class="title">{{message.title}}</p>
                    <transition name="t">
                        <div v-if="!modifyMessage" id="inputNewTitle">
                            <input v-model="newTitle" id="title1" type="text" placeholder="Si vous ne souhaitez pas le modifier, copier le !">
                        </div>
                    </transition>
                    <figure class="pictureMessage" v-if="message.attachment !== null">
                        <img id="imageMessage" v-bind:src="imageUrl" alt="image">
                    </figure>
                    <transition name="t">
                        <div v-if="!modifyMessage" id="inoutNewImage">
                            <input type="file" id="image1">
                        </div>
                    </transition>
                    <p class="content">{{message.content}}</p>
                    <transition name="t">
                        <div v-if="!modifyMessage" id="inputNewContent">
                            <textarea v-model="newContent" id="content1" type="text" placeholder="Si vous ne souhaitez pas le modifier, copier le !"></textarea>
                            <button type="submit" v-on:click="sendNewMessage">Valider</button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <div id="button">
            <button type="submit" v-on:click="modifyMessage=!modifyMessage">
                <span v-if="modifyMessage">Modifier</span>
                <span v-else>Annuler</span>
            </button>
            <button type="submit" v-on:click="deleteMessage">Supprimer</button>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import router from "../router/index"

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
                newTitle: "",
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
                let user = response.data.userFound;
                this.user = user;

                let message = response.data.message;
                this.message = message;
                this.avatarUrl = user.attachment;
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

                        data.append('title', this.newTitle);
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

                        data.append('title', this.newTitle);
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

                        data.append('title', this.newTitle);
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

                        data.append('title', this.newTitle);
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
                console.log(urlMessageForDelete);
            }
        }
    }
</script>
<style lang="scss" scoped>
#containerMessages {
    height: auto;
    border: solid 1px black;
    margin: 50px auto;
    padding: 10px 10px 0 10px;
    width: 750px;
    border-radius: 10px;
    box-shadow: 10px 5px 5px grey;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & #userMessage {
        width: 700px;
        height: auto;
        margin: 25px auto;
        & #avatar {
            width: 50px;
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
}
</style>