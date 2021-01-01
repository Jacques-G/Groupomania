<template>
    <div id="container">
        <onlyBan />
        <profilUser />
    </div>
</template>
<script>
import OnlyBan from "../components/OnlyBan"
import ProfilUser from "../components/ProfilUser"

export default {
    name: "UserProfil",
    components: {
        OnlyBan,
        ProfilUser
    }
}
</script>
<style lang="scss" scoped>
#container {
    background-color: #2d3f5e;
    height: 100vh;
}

//RESPONSIVE
@media all and (max-width: 750px) {
    #container {
        width: 100vw;
       
    }
}

</style>