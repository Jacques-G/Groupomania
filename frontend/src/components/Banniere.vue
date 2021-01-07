<template>
  <div class="banniere">
    <figure>
      <router-link to="/"><img src="../assets/icon-left-font-monochrome-white.png" alt="logo"></router-link>
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
  background-color: #2d3f5e;
  
  figure{
    padding-bottom: -100px;
    border-bottom: solid 2px #d1515a;
    margin: 0;

    img{
      height: 200px;
    }
  }
  
}

//RESPONSIVE 
@media all and (max-width: 750px) {
.banniere {

  & figure {
    text-align: center;
  }
}
}


</style>