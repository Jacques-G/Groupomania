<template>
    <div id="container">
        <wallBan />
        <oneMessage />
    </div>
</template>
<script>
    import WallBan from "@/components/WallBan"
    import OneMessage from "@/components/OneMessage"
    
    export default {
        components: {
            WallBan,
            OneMessage
        }
        
    }

</script>
<style lang="scss" scoped>
#container {
   background-color: #2d3f5e ;
   height: 100vh;
}

@media all and (max-width: 750px) {
    #container {
        width: 100vw;
       
    }
}
</style>
