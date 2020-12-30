<template>
    <div id="container">
        <wallBan />
        <div id="forMessageUser">
            <messageUser />
        </div>
        <div id="allMessages">
            <allMessages />
        </div>
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
    background-color: #2d3f5e;
    width: 100vw;
}
</style>