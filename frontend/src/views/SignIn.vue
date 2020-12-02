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
                <input v-model="userPass" type="password" id="password">
            </div>
        </form>
        <button v-on:click="envoyer">Se connecter</button>
    </div>
</template>

<script>
import Banniere from "@/components/Banniere"
import router from "../router/index"
import axios from "axios"

export default {
    components: {
        Banniere
    },
    data() {
        return {
            userEmail: "",
            userPass: "",
            url: "http://localhost:3000/api/auth/login",
            
        }
    },
    methods: {
        envoyer: function() {
            const user = {
                email: this.userEmail,
                password:  this.userPass,
                
            };

            axios.post(this.url, user, { header: {
                'Content-type': 'application/json',
                
                } 
            })
            .then(response => {
                console.log(sessionStorage) // Verification du sessionStorage vide
                console.log(response.data); // Verification des données recus
                let responseUser = response.data.userId;
                let responseToken = response.data.token;
                sessionStorage.setItem('user', JSON.stringify(responseUser)); //push de l'id dans la sessionStorage
                sessionStorage.setItem('token', responseToken);
                console.log(sessionStorage)
                router.push({name: "wall"});
            
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
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