<template>
  <div id="home">
    <section class="acc">
      <figure>
        <img alt="Groupomania logo" src="../assets/icon-left-font-monochrome-white.png">
      </figure>
      <div class="welcomeMess">
        Bienvenu sur notre réseau social d'entreprise
      </div>
      <div class="buttons">
        <md-button><router-link to="/signIn" id="buttonConnect" class="md-raised md-primary">Se connecter</router-link></md-button>
        <md-button><router-link to="/signUp" id="buttonConnect2" class="md-raised md-primary">S'inscrire</router-link></md-button>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'

import {MdButton} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdButton)
export default {
  name: "Home"
}
</script>
<style lang="scss" scoped>
#home {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #2d3f5e;
  
}
.acc{
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
  text-align: center;
  font-size: 30px;
  figure{
    
    img{
      
      height: 500px;
    }
  }
  .welcomeMess{
    color: white;
    margin-bottom: 50px;
  }
  & #span{
      color: #af9b9c;
      margin: -20px auto 20px auto;
      font-weight: bold;
    }
  .buttons{
    padding: 20px 0;
    background-color: #2d3f5e;
    
    & #buttonConnect, #buttonConnect2{
      border-radius: 6px;
      color: #d1515a;
      text-decoration: none;
      width: 200px;
      margin: 0 50px;
      font-size: 20px;
        
      
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
@media all and (max-width: 750px)
{
  .acc{
    & figure{
      & img{
        width: 100vw;
        height: auto;
      }
    }
    &.welcomeMess {
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

    }
  }
  
  button {
    text-align: center;
  }
}

</style>
