<template>
    <div>
        <ban />
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
                <input v-model="userFirstName" type="text" id="firstName">
                <input v-model="userLastName" type="text" id="lastName">
                <input v-model="userEmail" type="text" id="email">
                <input v-model="userPassword" type="text" id="password">
                <input v-model="userJob" type="text" id="job">
            </div>
        </form>
        <button v-on:click="envoyer">S'inscrire</button>
    </div>
</template>
<script>
import Ban from "@/components/Banniere"
export default {
    components: {
        ban: Ban
    },
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    userJob: "",
    methods: {
        envoyer: function() {
            alert('L\'utilisateur suivant a été créé : \
            ' + this.userFirstName + ' ' + this.userLastName + '\
            ' + this.userEmail + '\
            ' + this.userJob)
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