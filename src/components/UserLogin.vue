<template>
<div class="wrapper">
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <div v-if="error" class="alert alert-danger" role="alert">
                    {{error}}
            </div>
            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form @submit.prevent="handleLogin">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" v-model="email" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" v-model="password" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                  in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
.wrapper {
  background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
}

.btn-google {
  color: white !important;
  background-color: #ea4335;
}

.btn-facebook {
  color: white !important;
  background-color: #3b5998;
}
</style>

<script>
import axios from 'axios';
export default {
    name: 'UserLogin',
    data() {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async getToken() {
          await axios.get('/sanctum/csrf-cookie')
        },
        async handleLogin() {
          await this.getToken();
            const data = {
                email: this.email,
                password: this.password
            }
          
            try {
              const response = await axios.post('api/login', data, {
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
              if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                this.$store.dispatch('user', response.data.user)
              }
              this.$router.push('/profile')
            } catch (err) {
              if (err.response.status === 401) {
                this.error = 'Invalid Credentials'
              }
            }
        
        }
    }
}
</script>