<template>
     <div id="containerBann">
        <figure>
            <router-link to="wall"><img src="../assets/icon.png" alt="logo"></router-link>
        </figure>
        <div id="compte">
            <router-link to="/">
                <md-avatar class="logDisconnect">
                    <img src="@/assets/sign-out-alt-solid.svg" v-on:click="disconnected" alt="Se déconnecter">
                </md-avatar>  
            </router-link>
        </div>
    </div>
</template>
<script>

import Vue from 'vue'
    import {MdAvatar} from 'vue-material/dist/components'
    import 'vue-material/dist/vue-material.min.css'
    import 'vue-material/dist/theme/default.css'

    Vue.use(MdAvatar)

export default {
    name: "OnlyBan",
    data() {
            return {
               
            }
        },
        methods: {
            disconnected: function() {
                sessionStorage.clear('tokens')
            }
        }
}
</script>
<style lang="scss" scoped>
#containerBann {
    background-color: white;
    height: 75px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    border-bottom: solid 2px #d1515a;
    margin-bottom: 30px;
  

    & figure {
        
        & img {
            width: 50px;
        }
    }
    & div {

        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 10px;
        right: 20px;
    }
}

@media all and (max-width: 750px) {
#containerBann {
    width: 100vw;
  & figure {
    text-align: center;
  }
}
}

</style>
