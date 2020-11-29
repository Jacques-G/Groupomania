<template>
    <div>
        <banniere /><!--Appel du composant Banniere pour affichage-->
        <form id="form">
            <div class="labels">
                <label for="firstName">
                    Prénom : 
                </label>
                <label for="lastName">
                    Nom :  
                </label>
                <label for="email">
                    Email : 
                </label>
                <label for="password">
                    Mot de passe : 
                </label>
                <label for="job">
                    Emploi : 
                </label>
            </div>
            <div class="inputs">
                <input v-model="firstName" type="text" id="firstName">
                <input v-model="lastName" type="text" id="lastName">
                <input v-model="email" type="text" id="email">
                <input v-model="password" type="password" id="password">
                <input v-model="job" type="text" id="job">
            </div>
        </form>
        <button type="submit" v-on:click="envoyer">S'inscrire</button>
    </div>
</template>
<script>
import Banniere from "@/components/Banniere" //Import du composant Banniere
import axios from "axios" // Import d'Axios pour requete HTTP
export default {
    components: {
        Banniere
    },
    data() {
        return {
            url: 'http://localhost:3000/api/auth/signup',
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            job: "",
        }
    },
    methods: {
        envoyer: function() {
            let newUser = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                job: this.job
            };
            console.log(newUser);
            axios.post(this.url, {
                header: {
                    'Content-type': 'application/json'
                }
            }, newUser)
                .then(response => {
                    console.log(response);
                })
                .catch((error) => console.log(error))
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