<template>
     <div id="containerBann">
        <figure>
            <img src="../assets/icon.png">
        </figure>
        <div id="compte">
            <router-link to="/"><button v-on:click="disconnected">Me déconnecter</button></router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "OnlyBan",
    data() {
            return {
               
            }
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
        
        
        & button {
            margin-right: 10px;
            width: 150px;
            cursor: pointer;
        }
    }
}

</style>