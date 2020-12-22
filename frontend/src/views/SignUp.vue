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
import router from "../router/index"// Permet la redirection

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
            const header = {
                'Content-type': 'application/json'
            };
            axios.post(this.url, newUser, { header })
                .then(() => {
                    alert('Votre compte à bien été créé. Veuillez vous connecter à présent.')
                    setTimeout(function() {
                        router.push({name: "signIn"})
                    }, 1000)
                })
                .catch((error) => alert(error))
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
        & label {
            padding-bottom: 3px;
        }
    }
    .inputs{
        display: flex;
        flex-direction: column;
        margin: 30px 0;
    }
}
button{
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin: auto;
}

</style>