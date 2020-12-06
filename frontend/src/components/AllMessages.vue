<template>
    <div id="containerAllMessages">
        <div id="usersMessage" v-for="(usr, index) in messages" v-bind:key="index">
            <div id="userName">
                {{ usr.User.firstName }}  {{ usr.User.lastName }}
            </div>
            <div id="userJob">
                {{ usr.User.job }}
            </div>
            <div id="titleMessage">
                {{ usr.title }}
            </div>
            <div id="userMessage">
                {{ usr.content }}
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    export default {
        name: "AllMessages",
        data() {
            return {
                messages: null
            }
        },
        created: function() {
            axios.get("http://localhost:3000/api/message/all", {headers: {
                'authorization' : 'bearer ' + sessionStorage.getItem('token')
            }})
                .then(message => {
                    this.messages = message.data
                    console.log(message)
                })
                .catch(error => {
                    console.log(error)
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
    }
}
</style>