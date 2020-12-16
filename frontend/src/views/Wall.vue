<template>
    <div id="container">
        <WallBan />
        <div id="forMessageUser">
            <messageUser />
        </div>
        <div id="allMessages">
            <allMessages />
        </div>
        <button v-on:click="cart">Voir le panier</button>
    </div>
    
</template>

<script>
import WallBan from "@/components/WallBan"
import MessageUser from "@/components/MessageUser"
import AllMessages from '../components/AllMessages.vue'

export default {
    components: {
        WallBan,
        MessageUser,
        AllMessages
    },
    data() {
        return {
           
        }
    },
    methods: {
        cart: function() {
            console.log(sessionStorage)
        }
    }
}
</script>

<style lang="scss" scoped>

#container {
    width: 100vw;
}
</style>