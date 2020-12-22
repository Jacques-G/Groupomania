<template>
    <div id="containerAllMessages">
        <div id="usersMessage" v-for="mess in messages" :key="mess.id"> <!--Boucle sur la base de donnée pour afficher ltous les messages-->
            <div class="userToMessage">
                <div id="avatarUser"> 
                    <div v-if="mess.User.attachment === null">
                        <md-avatar>
                            <img class="userPicture" src="@/assets/users-solid.svg/">
                        </md-avatar>
                    </div>
                    <div v-else>
                        <md-avatar>
                            <img class="userPicture" v-bind:src="mess.User.attachment" alt="photo de profil">
                        </md-avatar>
                    </div>
                    <div id="nameAndJobUser">
                        <p class="user">{{mess.User.firstName}} {{mess.User.lastName}}</p>
                        <p class="job"><span>{{ mess.User.job }}</span></p>
                    </div>
                </div>
                <!--<div id="options">
                    <p> {{mess.updatedAt}}</p>
                    <button type="submit" v-on:click="select(mess.id)" v-if="userConnected === mess.User.id">Options</button>--> <!--Bouton pour pouvoir acceder aux options de modifications et suppressions du message si la personne connectée est bien celle qui à créer le message-->
                <!--</div>-->
                <div id="options">
                    <p> {{ mess.updatedAt }}</p>
                    <img v-on:click="select(mess.id)" v-if="userConnected === mess.User.id" src="@/assets/cog-solid.svg">
                </div>
            </div>  
            <div class="message">
                <figure class="pictureMessage">
                    <img v-bind:src="mess.attachment">
                </figure>
                <p class="content">{{mess.content}}</p>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from "../router/index"

    import Vue from 'vue'
    import {MdAvatar} from 'vue-material/dist/components'
    import 'vue-material/dist/vue-material.min.css'
    import 'vue-material/dist/theme/default.css'

    Vue.use(MdAvatar)

    export default {
        name: "AllMessages",
        data() {
            return {
                messages: [],
                userConnected: JSON.parse(sessionStorage.getItem('user'))
            }
        },
        created: function() {
            let url = "http://localhost:3000/api/message/all";
            axios.get(url, {headers: {
                'authorization': 'bearer ' + sessionStorage.getItem('token')
            }})
            .then(response => {
                
                let messagesBdd = response.data;
                this.messages = messagesBdd;
            })
            .catch(() => {
                alert('Serveur offLine')
            })
        },
        methods: {
            select: function(idMess) {
                let idmessage = idMess;
                router.push({ path: 'singleMessage', query: { idmessage }})
                
            }
        }
    }
</script>
<style lang="scss" scoped>
#containerAllMessages {
    height: auto;
    border: solid 1px black;
    margin: 50px auto;
    padding: 10px 10px 0 10px;
    width: 750px;
    border-radius: 10px;
    box-shadow: 10px 5px 5px grey;
    
    
    & #usersMessage {
        width: 700px;
        height: auto;
        margin: 25px auto;
        border-bottom: solid 1px black;
        
        & .userToMessage {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            display: flex;
            flex-direction: row;
            
            & #avatarUser{
                display: flex;
                flex-direction: row;
                
                & #nameAndJobUser{
                    margin: -20px 0 0 10px;
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

            & #options {
                    text-align: right;
                    & img{
                        cursor: pointer;
                        width: 25px;
                    }
                }
        }
        
    }
    & .message {
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