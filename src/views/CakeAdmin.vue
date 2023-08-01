<script>
import axios from 'axios'
import dayjs from 'dayjs';

export default {
    data() {
        return {
            products: [],
            isReady: false,
            status: 0
        }
    },
    mounted() {
        this.loadProducts()
    },
    
    methods: {
        async loadProducts() {
            this.isReady = false;
            let response = await axios.post('/my', {
                    admin: true,
                    status: this.status
            });
            this.products = response.data;
            
            this.isReady = true;

        },
        getRelativeDate(date) {
            let day = dayjs(date);
            return day.fromNow();
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
    <div class="container my-3 pb-3">
        <div class="row">
            
            <div class="col">

                <div class="card my-3">
                    <div class="card-body d-flex">
                        <label for="status" class="form-label m-3">Статус:</label>
                        <select @change="loadProducts" v-model="status" name="status" class="form-select ms-3" id="status">
                            <option value="0">Все</option>
                            <option value="1">В очереди</option>
                            <option value="2">В работе</option>
                            <option value="3">Готовы</option>
                            <option value="4">Уже забрали</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
        <div v-if="!products.length == 0" class="row m-2">
            Здесь можно изменять статус заказов (кликом на кнопку статуса)
        </div>
        <div v-if="!isReady">
                Данные загружаются...
        </div>
        <div class="row" v-if="isReady">
            <div class="col orders">
                <div v-if="products.length == 0">
                    Таких заказов нет :)
                </div>
                <div v-for="(item, index) in products" class="card mb-3" style="width: 100%;">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img :src="'src/assets/' + item.product.img" width="350" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8 ms-2">
                            <div class="card-body">
                                <h5 class="card-title d-inline"> <b>{{item.product.title}}</b> / </h5>
                                <p class="card-text d-inline">{{ item.product.price }} руб. / {{ item.product.weight }} кг</p>
                                <p class="card-text mt-2">Имя заказчика: {{ item.name }}</p>
                                <p class="card-text">Почта заказчика: {{ item.email }} </p> 
                                <p class="card-text"><small class="text-body-secondary"> <b> Оформлен: {{ getRelativeDate(item.createdAt) }} </b></small></p>
                                <div v-if="item.status === 1" @click="changeStatus(item)" class="btn status_1">В очереди</div>
                                <div v-if="item.status === 2" @click="changeStatus(item)" class="btn status_2">В работе</div>
                                <a v-if="item.status === 3"  class="btn status_3">Готов к выдаче</a>
                                <a v-if="item.status === 4"  class="btn status_4">Тортик забрали</a>
                            </div>
                        </div>
                    </div>
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

/* В работе */
.status_2,
.status_2:hover {
    background-color: lightgreen;
}

/* В очереди */
.status_1,
.status_1:hover {
    background-color: lightblue;
}


/* Завершено */
.status_3,
.status_3:hover {
    background-color: rgb(202, 120, 250);
}

/* Готов к выдаче */
.status_4,
.status_4:hover {
    background-color: lightgray;
}
</style>