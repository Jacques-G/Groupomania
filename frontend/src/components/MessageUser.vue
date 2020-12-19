<template>
    <div id="containerCreate">
        <div id="nameUser" v-bind="user">
            {{user.firstName}}  {{user.lastName}}
        </div>
        <div id="userJob">
            {{user.job}}
        </div>
        <input type="texte" v-model="titleMessage" placeholder="Titre de votre Message">
        <textarea v-model="userMessage" placeholder="Saisissez votre commentaire ici" ></textarea>
        <div id="possibility">
            <div id="pushPicture">
                <form>
                    <label for="imageMessage"></label>
                    <input type="File" id="imageMessage" name="imageMessage" >
                </form>
            </div>
            <div id="sendMessage">
                <md-button class="md-raised md-primary" type="submit" v-on:click="sendNewMessage">Envoyer</md-button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios"

    import Vue from 'vue'
    import {MdButton} from 'vue-material/dist/components'
    import 'vue-material/dist/vue-material.min.css'
    import 'vue-material/dist/theme/default.css'

    Vue.use(MdButton)

    export default {
        name: 'MessageUser',
        data() {
            return {
                titleMessage: "",
                userMessage: "",
                user: {},
                userConnected: JSON.parse(sessionStorage.getItem('user')),
                
            }
        },
        created: function() {
            let url = "http://localhost:3000/api/auth/user/" + this.userConnected;

            axios.get(url, { headers: {
                'authorization': 'bearer ' + sessionStorage.getItem('token')
            }})
                .then(response => {
                    let userToConnected = response.data.User
                    this.user = userToConnected;
                })
                .catch(error => {
                    console.log(error);
                })   
        },
        methods: {
            sendNewMessage: function() {
                let picture = document.querySelector('#imageMessage');
                console.log(picture.files);
                
                let data = new FormData();
                data.append('title', this.titleMessage);
                data.append('content', this.userMessage);
                data.append('attachment', picture.files[0]);
                
                let url = "http://localhost:3000/api/message/new";

                axios.post(url, data, { headers: {
                    'Content-type' : 'multipart/form-data',
                    'authorization': 'bearer ' + sessionStorage.getItem('token')
                }})
                .then(response => {
                    window.location.reload();
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                }) 
            },
        }
    }

</script>
<style lang="scss" scoped>

#containerCreate {
    border: solid 1px black;
    margin: 0 auto;
    padding: 10px 10px 0 10px;
    width: 750px;
    //height: 150px;
    border-radius: 10px;
    box-shadow: 10px 5px 5px grey;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
   
    
    & #nameUser {
        font-weight: bold;
    }
    & #userJob {
        font-style: italic;
        margin: -5px 0 10px 0;
    }
    & textarea {
        margin-bottom: 15px;
        border-radius: 10px ;
        border: solid 2px grey;
        //border: none;
    }
    & #possibility {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;

        & #pushPicture{
   
            margin: auto 0;
        }
        & button {
            cursor: pointer;
        }
    }
    
}
</style>