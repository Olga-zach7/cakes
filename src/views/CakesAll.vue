

<script>
import axios from 'axios'
export default {
    data() {
        return {
            products: [],
            my: false,
            isReady: false,
            title: ''
        }
    },
    mounted() {
        this.loadProducts()
    },
    watch: {
        $route() {
            this.loadProducts();
        }
    },
    methods: {
        async loadProducts() {
            this.isReady = false;
            let response;
            this.products = [];
            this.title = ''
            if (this.$route.name == 'cakes') {
                this.my = false;
                this.title = 'Все торты'
                response = await axios.get('/products/all')
                this.products = response.data;
            } else {
                this.title = 'Мои заказы'
                let response = await axios.post('/my', {
                    admin: false,
                    status: 0
                });

                this.products = response.data;
                this.my = true;
            }
            this.isReady = true;
        },
        goCakeInfo(item) {
            this.$router.push({
                name: 'cake-info',
                params: {
                    id: item._id
                }
            })
        },
        async changeStatus(item) {
            await axios.post(`/order/update`, {
                id: item._id,
                status: item.status
            });
            this.loadProducts();
        }
    }
}
</script>


<template>
    <div v-if="!my" class="container p-4">
        <div  v-if="isReady"  class="card mb-2" style="width: 100%;">
            <img class="banner card-img-top" src="src/assets/banner2.jpg" alt="">
        </div>
        
        <h2 v-if="isReady"  class="text-center mb-3">{{ title }}</h2>
        <div v-if="!isReady">
            Данные загружаются...
        </div>
        <div v-if="isReady" class="d-flex justify-content-center row row-cols-2 row-cols-md-3 row-cols-lg-4 gap-3 ">
            <div v-for="(item, index) in products" @click="goCakeInfo(item)"  class="col card cake" style="width: 18rem;">
                <img :src="'src/assets/' + item.img" class="mt-2 card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">{{ item.price }} руб.</p>
                    <a class="btn btn-primary">Подробнее..</a>
                </div>
            </div>
        </div>
    </div>

    <div v-if="my" class="container p-4">
        <h2  v-if="isReady" class="text-center mb-3">{{ title }}</h2>
        <div v-if="!isReady">
            Данные загружаются...
        </div>
        <div v-if="isReady" class="d-flex justify-content-center row row-cols-2 row-cols-md-3 row-cols-lg-4 gap-3 ">
            <div style="width: 100%" class="text-center mt-3" v-if="products.length == 0">
                Здесь можно отслеживать статус ваших заказов, оформите их во вкладке "Все торты"
            </div>
            <div v-for="(item, index) in products" class="col card" style="width: 18rem;">

                <img :src="'src/assets/' + item.product.img" class="mt-2 card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ item.product.title }}</h5>
                    <p class="card-text">{{ item.product.price }} руб.</p>
                    <div v-if="item.status === 1" class="btn status_1">Заказ обрабатывается</div>
                    <div v-if="item.status === 2" class="btn status_2">В работе</div>
                    <a v-if="item.status === 3" @click="changeStatus(item)" class="btn status_3">Забрать</a>
                </div>


            </div>
        </div>
    </div>
</template>


<style scoped>
.container {
    background-color: #fdbcc5;
    border-radius: 20px;
}

.cake {
    cursor: pointer;
}

/* В работе */
.status_2,
.status_2:hover {
    cursor: auto;
    background-color: lightgreen;
}

/* В очереди */
.status_1,
.status_1:hover {
    cursor: auto;
    background-color: lightblue;
}


/* Завершено */
.status_3,
.status_3:hover {
    background-color: rgb(187, 187, 187);
}

.banner {
    object-fit: cover;
}
</style>