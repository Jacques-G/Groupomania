<template>
    <div id="containerAllMessages" >
        <div v-if="messages.length !== 0">
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
                    <div id="options">
                        <p> {{ mess.updatedAt }}</p>
                        <img v-on:click="select(mess.id)" v-if="userConnected === mess.User.id || user.isAdmin === true" src="@/assets/cog-solid.svg">
                    </div>
                </div>  
                <div class="message">
                    <div>
                        <figure class="pictureMessage" v-if="mess.attachment !== undefined || mess.attachment !== null">
                            <img id="picturePost" v-bind:src="mess.attachment" >
                        </figure>
                    </div>
                    <p class="content">{{mess.content}}</p>
                </div>
                <div id="responsePossibility">
                    <div v-if="user.attachment === null">
                        <md-avatar class="mdAvatar">
                            <img class="avatarResponse"  src="@/assets/users-solid.svg/">
                        </md-avatar>
                    </div>
                    <div v-else>
                        <md-avatar class="mdAvatar">
                            <img class="avatarResponse" v-bind:src="user.attachment" alt="photo de profil">
                        </md-avatar>
                    </div>
                    <div id="divTextAreaResponse">
                        <textarea id="textArea" v-model="commentToSend"  rows="2"  type="text" placeholder="Commenter ici ..."></textarea>
                    </div>
                    <figure>
                        <img id="iconeSend" src="@/assets/paper-plane-solid.svg" v-on:click="sendNewComment(mess.id)">
                    </figure>
                </div>
                <div id="responsesOfCom">
                    <div id="boucle" v-for="com in comments" :key="com.id">
                        <div id="responseMessage" v-if="com.MessageId === mess.id">
                            <div id="verifattachment">
                                <div v-if="com.User.attachment === null || com.User.attachment === undefined">
                                    <md-avatar class="avatarResponses">
                                        <img src="@/assets/users-solid.svg" alt="photo de profil">
                                    </md-avatar>
                                </div>
                                <div v-else>
                                    <md-avatar class="avatarResponses">
                                        <img v-bind:src="com.User.attachment" alt="photo de profil">
                                    </md-avatar>
                                </div>
                            </div>
                            <div id="userResponses">
                                <div id="responses">
                                    <div id="nameResponses">
                                        <p> {{com.User.firstName}} {{com.User.lastName}}</p>
                                    </div>
                                    <div id="contentResponse">
                                        {{com.content}}
                                    </div>
                                </div>
                                <div id="responsesPossibility" v-if="userConnected === com.User.id || user.isAdmin === true">
                                    <figure id="figureResponses">
                                        <img class="imgResponsesDelete" src="@/assets/times-solid.svg" alt="icone de suppression" v-on:click="deleteComment(com.id)">
                                    </figure>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else id="emptyMessages">
            <p>Poster le premier message !</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from "../router/index"

    import Vue from 'vue'
    import {MdAvatar, MdButton} from 'vue-material/dist/components'
    import 'vue-material/dist/vue-material.min.css'
    import 'vue-material/dist/theme/default.css'

    Vue.use(MdAvatar)
    Vue.use(MdButton)

    export default {
        name: "AllMessages",
        data() {
            return {
                messages: [],
                userConnected: JSON.parse(sessionStorage.getItem('user')),
                user: {},
                messagesId: '',
                comments: [],
                commentToSend: '',
                commentModified: '',
               
                
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

                let urlComment = "http://localhost:3000/api/comments/all"
                axios.get(urlComment, {headers: {
                'authorization': 'bearer ' + sessionStorage.getItem('token')
                }})
                .then((allComments) => {
                    this.comments = allComments.data;
                })
                .catch(error => console.log(error))
            })
            .catch(() => {
                alert('Serveur offLine')
            })
        },
        mounted: function() {
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
            });

        },
        methods: {
            select: function(idMess) {
                let idmessage = idMess;
                this.messagesId = idMess;
                router.push({ path: 'singleMessage', query: { idmessage }})
                
            },
            sendNewComment: function(idMessages) {
                let urlCreateComment = "http://localhost:3000/api/comments/new/" + idMessages;
                let comment = {
                    content: this.commentToSend
                };
                
                axios.post(urlCreateComment, comment, {headers: {
                    'Content-type': 'application/json',
                    'authorization' : 'bearer ' + sessionStorage.getItem('token')
                }})
                .then((newComment) => {
                    console.log(newComment);
                    window.location.reload();
                })
                .catch(error => console.log(error))
            },
            deleteComment: function(idComment) {
                let urlDeleteComment = "http://localhost:3000/api/comments/" + idComment ;

                axios.delete(urlDeleteComment, {headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem('token')
                }})
                .then(() => {
                    alert('Votre commentaire à bien été supprimé !');
                    window.location.reload();
                })
                .catch('Vous ne pouvez supprimer le message...');

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
#containerAllMessages {
    height: 100vh;
    & #usersMessage{
        
        background-color: white;
        border: solid 1px black;
        margin: 50px auto;
        padding: 10px 10px 0 10px;
        width: 750px;
        border-radius: 5px;
        position: relative;

        & .userToMessage{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            //margin: 0 15px;
            height: 50px;

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
        }
        & #options{
            margin: -20px 0 0 10px;
            text-align: right;
            & img{
                cursor: pointer;
                width: 25px;
            }
        }

        & .message{
            margin: 0 20px 20px 20px;
            border-bottom: solid 2px  #d1515a;

            & .pictureMessage{

                & #picturePost{
                    width: 650px;
                }
            }
            & .content{
                padding: 0 40px;
            }
        }

        & #responsePossibility{
            display: flex;
            flex-direction: row;
            justify-content: right;

            & .mdAvatar{
                

                & .avatarResponse {
                    width: 50px;
                
                }
            }

            & #divTextAreaResponse{
                
                & textarea{
                    border-radius: 10px ;
                    border: solid 2px grey;
                }
            }
            & figure {
                
                & #iconeSend {
                    cursor: pointer;
                    width: 20px;
                }
            }
        }
        
        & #responsesOfCom{
            //text-align: right;
            font-style: italic;
            margin-top: 30px;
            margin-bottom: 80px;
            display: flex;
            flex-direction: column;
            justify-content: right;
            //margin: 80px auto 0 auto;

            & #boucle{

                & #responseMessage{
                    display: flex;
                    flex-direction: row;
                    justify-content: right;
                    text-align: right;

                    & .avatarResponses{
                        margin: 0;
                    }
                    & #userResponses{
                        margin-top: -10px;
                        margin-bottom: 30px;
                        border-radius: 5px;
                        background-color: #EAEDEF;
                        padding: 10px 10px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        width: 100%;
                        position: relative;

                        & #responses{

                            & #nameResponses{
                                font-weight: bold;
                                margin-top: -10px;
                            }

                            & #contentResponse{
                                text-align: left;
                            }          
                        }

                        & #responsesPossibility{

                            & #figureResponses {
                                
                                width: 30px;
                                & .imgResponses{
                                    position: absolute;
                                    top: 2px;
                                    right: 20px;
                                    cursor: pointer;
                                    width: 10px;
                                    
                                }
                                & .imgResponsesDelete{
                                    position: absolute;
                                    top: 0;
                                    right: 5px;
                                    cursor: pointer;
                                    width: 10px;
                                }
                            }
                        }
                    }
                   
                }
                
            }
        }
        
    }

    & #emptyMessages{
        height: 100vh;
        color: white;
        //text-align: center;
        display: flex;
        justify-content: center;
        margin: auto;
        
    }
    
}
@media all and (max-width: 750px) {
    #containerAllMessages {
        width: 100vw;

        & #usersMessage {
            width: 100vw;

            & #responsePossibility {
                width: 100vw;
            }
        }
    }
}
</style>