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

</style>