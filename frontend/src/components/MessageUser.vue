<template>
    <div id="containerCreate">
        <div id="nameUser" v-bind="user">
            {{user.firstName}}  {{user.lastName}}
        </div>
        <div id="userJob">
            {{user.job}}
        </div>
        <textarea v-model="userMessage" placeholder="Saisissez votre commentaire ici" rows="4" ></textarea>
        <div id="possibility">
            <div id="sendMessage">
                <button>Envoyer</button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    export default {
        name: 'MessageUser',
        data() {
            return {
                userMessage: "",
                user: {},
                userConnected: JSON.parse(sessionStorage.getItem('user')),
                
            }
        },
        created: function() {
            let url = "http://localhost:3000/api/auth/user/" + this.userConnected;

            axios.get(url, { headers: {
                'authorization': 'bearer ' + sessionStorage.getItem('token')
            }})
                .then(response => {
                    let userToConnected = response.data.User
                    this.user = userToConnected;
                })
                .catch(error => {
                    console.log(error);
                })   
        }
    }

</script>
<style lang="scss" scoped>

#containerCreate {
    border: solid 1px black;
    margin: 0 auto;
    padding: 10px 10px 0 10px;
    width: 750px;
    height: 150px;
    border-radius: 10px;
    box-shadow: 10px 5px 5px grey;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
   
    
    & #nameUser {
        font-weight: bold;
    }
    & #userJob {
        font-style: italic;
        margin: -5px 0 10px 0;
    }
    & #possibility {
        text-align: right;
        
        & button {
            cursor: pointer;
        }
    }
    
}
</style>