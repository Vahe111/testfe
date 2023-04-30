<template>
  <HeaderNav />
  <router-view></router-view>
</template>

<script>
  import HeaderNav from './components/HeaderNav.vue'
  import axios from 'axios'

  export default {
    name: 'App',
    components: {
      HeaderNav
    },
    async created() {
        try {
          const response = await axios.get('api/profile', {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (response.data.user) {
              this.$store.dispatch('user', response.data.user)
            } else {
              this.$store.dispatch('user', null)
              this.$router.push('/login')
            }
        } catch (err) {
            this.$store.dispatch('user', null)
            this.$router.push('/login')
        }
    }
  }
</script>

<style>

</style>
