<template>
    <div>
        <banniere />
        <form id="form">
            <div class="labels">
                <label for="email">
                    Email : 
                </label>
                <label for="password">
                    Mot de passe : 
                </label>
            </div>
            <div class="inputs">
                <input v-model="userEmail" type="text" id="email">
                <input v-model="userPass" type="text" id="password">
            </div>
        </form>
        <button v-on:click="envoyer">Se connecter</button>
    </div>
</template>

<script>
import Banniere from "@/components/Banniere"
import axios from "axios"

export default {
    components: {
        Banniere
    },
    data() {
        return {
            userEmail: "",
            userPass: "",
            url: "http://localhost:3000/api/auth/login"
        }
    },
    methods: {
        envoyer: function() {
            const user = {
                email: this.userEmail,
                password:  this.userPass
            };
            const header = {
                    'Content-type': 'application/json'
            };
            axios.post(this.url, user, { header })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    /*userEmail: "",
    userPass: "",
    methods: {
        envoyer: function() {
            alert('L\'utilisateur ' + this.userEmail + ' s\'est connecté avec le mot de passe : ' + this.userPass)
        }
    }*/
}

</script>

<style lang="scss" scoped>
#form{
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .labels{
        display: flex;
        width: 125px;
        flex-direction: column;
        margin: 30px 0;
    }
    .inputs{
        display: flex;
        flex-direction: column;
        margin: 30px 0;
    }
}
button{
    display: flex;
    justify-content: center;
    margin: auto;
}
</style>