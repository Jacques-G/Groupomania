<template>
  <div class="home">
    <section class="acc">
      <figure>
        <img alt="Groupomania logo" src="../assets/icon-above-font.png">
      </figure>
      <div class="welcomeMess">
        Bienvenue sur le réseau social de l'entreprise <br/>
        <span>Groupomania</span>
      </div>
      <div class="buttons">
        <button><router-link to="/signIn">Se connecter</router-link></button>
        <button><router-link to="/signUp">S'inscrire</router-link></button>
      </div>
    </section>
  </div>
</template>

<script>

</script>
<style lang="scss" scoped>
.acc{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  text-align: center;
  font-size: 30px;
  figure{
    
    img{
      margin-top: -100px;
      height: 700px;
    }
  }
  .welcomeMess{
    
    span{
      font-weight: bold;
    }
  }
  .buttons{
    margin: 50px 0;
    
    button{
      margin: 0 50px;
      font-size: 20px;
    }
  }
}

</style>
