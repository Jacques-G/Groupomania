<template>
    <div id="containerBann">
        <figure>
            <img src="../assets/icon.png">
        </figure>
        <div id="compte">
            
            <router-link to="/userProfil"><!--<button>Mon Compte</button>--><img v-bind:src= "avatarUrl" alt="photo de profil"></router-link>
            <router-link to="/"><button v-on:click="disconnected">Me déconnecter</button></router-link>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "WallBan",
        data() {
            return {
                avatarUrl: "",
                userConnected: JSON.parse(sessionStorage.getItem('user'))
            }
        },
        mounted: function() {
            let url = "http://localhost:3000/api/auth/user/" + this.userConnected;
            axios.get(url, { headers : {
            'authorization' : 'bearer ' + sessionStorage.getItem('token')
        }})
        .then((response) => {
            this.avatarUrl = response.data.User.attachment;
        })
        .catch(error => {
            console.log(error)
        })
        },
        methods: {
            disconnected: function() {
                sessionStorage.clear('tokens')
                console.log(sessionStorage)
            }
        }
    }
</script>
<style lang="scss" scoped>
#containerBann {

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    border-bottom: solid 1px grey;
    margin-bottom: 30px;
  

    & figure {
        
        & img {
            width: 100px;
        }
    }
    & div {

        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 10px;
        right: 0;
        
        & img {
            width: 100px;
        }
        & button {
            margin-right: 10px;
            width: 150px;
            cursor: pointer;
        }
    }
}
</style>
