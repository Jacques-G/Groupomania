<template>
    <div id="containerAllMessages">
        <div id="usersMessage" v-for="mess in messages" :key="mess.id"> <!--Boucle sur la base de donnée pour afficher ltous les messages-->
            <div class="userToMessage">
                <img id="userPicture" v-bind:src="mess.User.attachment" alt="photo de profil">
                <p class="user">{{mess.User.firstName}} {{mess.User.lastName}}</p>
                <p class="job"><span>{{ mess.User.job }}</span></p>
                <button type="submit" v-on:click="select(mess.id)" v-if="userConnected === mess.User.id">Options</button> <!--Bouton pour pouvoir acceder aux options de modifications et suppressions du message si la personne connectée est bien celle qui à créer le message-->
            </div>  
            <div class="message">
                <p class="title"> {{ mess.title}}</p>
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
                console.log(response.data)
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & #usersMessage {
        width: 700px;
        height: auto;
        margin: 25px auto;
        & #userPicture {
            width: 50px;
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