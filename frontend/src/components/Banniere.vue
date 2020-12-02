<template>
  <div class="banniere">
    <figure>
      <router-link to="/"><img src="../assets/icon-left-font.png"></router-link>
    </figure>
  </div>
</template>

<script>
export default { 
  name: 'Banniere'
}
</script>

<style lang="scss" scoped>
.banniere{
  
  
  figure{
    padding-bottom: -100px;
    border-bottom: solid 1px grey;
    img{
      height: 200px;
    }
  }
  
}


</style>