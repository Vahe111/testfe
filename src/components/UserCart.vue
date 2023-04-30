<template>
    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card border-0 shadow rounded-3 my-5">
              <div class="card-body p-4 p-sm-5">
                <h5 v-if="carts" class="card-title text-center mb-5 fw-light fs-5">Cart</h5>
                <div v-if="carts">
                  <div v-for="cart in carts" v-bind:key="cart.id">
                    <div class="form-floating mb-3">
                        <div>
                            <strong>Name</strong>
                        </div>
                        <div>
                            {{cart.name}}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <div>
                            <strong>SKU</strong>
                        </div>
                        <div>
                            {{cart.sku}}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <div>
                            <strong>Price</strong>
                        </div>
                        <div>
                            {{cart.price}}
                        </div>
                    </div>
                    <hr class="hr" />
                  </div>
                </div>
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
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    export default {
        name: 'UserCart',
        data() {
          return {
            carts: []
          }
        },
        computed: {
            ...mapGetters(['user'])
        },
        async created() {
          const response = await axios.get('api/cart', {
                      headers: {
                          authorization: 'Bearer ' + localStorage.getItem('token')
                      }
                  })
          if (response.data.carts) {
            this.carts = response.data.carts
          }
        }
    }
    </script>