<script>
export default {
    methods: {
        goCakes(){
            this.$router.push({
                name: 'cakes'
            })
        },
        goAdmin(){
            this.$router.push({
                name: 'admin'
            })
        },
        goMy(){
            this.$router.push({
                name: 'my'
            })
        }
    }
}
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary header mb-3">
  <div class="container-fluid">
    <a @click="goCakes" class="navbar-brand">
      <img src="favicon.png" width="50" alt="">
      Cakes & Berries</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item m-2">
          <a @click="goCakes"
          :class="{
                    'active': $route.name == 'cakes'
                }"
          class="btn btn-outline-primary">Все торты</a>
        </li>
        <li class="nav-item m-2">
          <a @click="goMy"
          :class="{
                    'active': $route.name == 'my'
                }"
          class="btn btn-outline-primary">Мои заказы</a>
        </li>
        
        
        
      </ul>
      <a class="nav-item m-2">
          <a @click="goAdmin"
          :class="{
                    'active': $route.name == 'admin'
                }"
          class="btn btn-outline-danger">Админка</a>
              </a>
    </div>
  </div>
  
</nav>

</template>

<style scoped>
.navbar-brand {
  font-weight: bold;
  cursor: pointer;
}

</style>