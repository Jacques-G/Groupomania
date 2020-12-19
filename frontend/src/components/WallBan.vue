<template>
    <div id="containerBann">
        <figure>
            <img src="../assets/icon.png">
        </figure>
        <div id="compte">
            <div id="images">
                <router-link to="/userProfil">
                    <div v-if="avatarUrl === null">
                        <md-avatar>
                            <img id="noneProfil" class="imageProfil" src="@/assets/users-solid.svg/"  alt="photo de profil">
                        </md-avatar>
                    </div>
                    <div v-else>
                        <md-avatar>
                            <img class="imageProfil" v-bind:src= "avatarUrl" alt="photo de profil">
                        </md-avatar>
                    </div>
                </router-link>
            </div>
            <!--<router-link to="/"><button v-on:click="disconnected">Me déconnecter</button></router-link>-->
            <router-link to="/">
                <md-avatar class="logDisconnect">
                    <img src="@/assets/sign-out-alt-solid.svg" v-on:click="disconnected">
                </md-avatar>  
            </router-link>
        </div>
    </div>
</template>

<script>
    import axios from "axios"

    import Vue from 'vue'
    import {MdAvatar} from 'vue-material/dist/components'
    import 'vue-material/dist/vue-material.min.css'
    import 'vue-material/dist/theme/default.css'

    Vue.use(MdAvatar)

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
    & #compte {

        display: flex;
        flex-direction: row;
        position: absolute;
        padding-right: 50px;
        bottom: 10px;
        right: 0;

        & .logDisconnect{
            margin-left: 20px;
        }
        
    }
}
</style>
