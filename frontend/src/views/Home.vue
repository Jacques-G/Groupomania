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
        <button><router-link to="/signIn" class="routerButton">Se connecter</router-link></button>
        <button><router-link to="/signUp" class="routerButton">S'inscrire</router-link></button>
      </div>
    </section>
  </div>
</template>

<script>
  
</script>
<style lang="scss" scoped>
#home {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
.acc{
  //margin-top: 50vh;
  //transform: translateY(-60%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
  text-align: center;
  font-size: 30px;
  figure{
    
    img{
      //margin-top: -100px;
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
      border-radius: 6px;
      color: black;
      text-decoration: none;
      width: 200px;
      margin: 0 50px;
      font-size: 20px;
      &:target, :active, :focus {
        color: black;
      }
      & .routerButton, .routerButton:active {
        text-decoration: none;
        color: black;
        
      }
    }
  }
}
// RESPONSIVE //
@media all and (max-width: 1024px) 
{
  body {
    margin: auto;
  }
  /*.acc {
    margin-top: 50vh;
    transform: translateY(-50%);
  }*/
}
@media all and (max-width: 800px) // A refaire
{
  .welcomeMess {
    
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

  }
  button {
    text-align: center;
  }
}

</style>
