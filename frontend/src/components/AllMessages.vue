<template>
    <div id="containerAllMessages">
        <div id="usersMessage" v-for="mess in messages" :key="mess.id">
            <div class="userToMessage">
                <img id="userPicture" v-bind:src="mess.User.attachment" alt="photo de profil">
                <p class="user">{{mess.User.firstName}} {{mess.User.lastName}}</p>
                <p class="job"><span>{{ mess.User.job }}</span></p>
                <button type="submit">Options</button>
            </div>  
            <div class="message">
                <p class="title"> {{ mess.title}}</p>
                <figure class="pictureMessage">
                    <img v-bind:src="mess.attachment">
                </figure>
                <p class="content">{{mess.content}}</p>

            </div>
        </div>
        <p> Test d'insertion </p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "AllMessages",
        data() {
            return {
                messages: [],
                
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
