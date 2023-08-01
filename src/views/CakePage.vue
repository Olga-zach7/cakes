<script>

import dayjs from 'dayjs';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';
export default {
    data() {
        return {

            // Данные загружены?
            isReady: false,

            // Данные с сервера
            cake: null,
            ordered: false,
            formed: false,
            name: '',
            email: '',
            alarm: false,
            card: null

        }
    },

    mounted() {
        this.loadData();
    },


    methods: {
        async loadData() {
            this.isReady = false;
            // Допиши этот метод
            let response = await axios('/cake', {
                params: {
                    id: this.$route.params.id
                }
            });

            this.cake = response.data;
            this.isReady = true;
        },
        form(cake) {
            this.formed = true;
        },
        async order(cake) {
            if (this.name && this.email && this.card) {
                this.alarm = false;
                this.ordered = false;
                await axios.post(`/order/create`, {
                    cake: cake._id,
                    name: this.name,
                    email: this.email,
                    card: this.card
                });
                this.ordered = true;
            } else {
                this.alarm = true;
            }


        }

    }
}
</script>

<template>
    <div class="container">
        <div v-if="!isReady">
            Данные загружаются...
        </div>
        <div v-if="isReady" class="container p-4">
            <!-- Карточка пользователя -->

            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img :src="'/src/assets/' + cake.img" class="img-fluid rounded-start">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">
                                <b>
                                    {{ cake.title }}
                                </b>
                                
                            </h5>
                            <p class="card-text">
                                {{ cake.price }} руб. / {{ cake.weight }} кг
                            </p>
                            <p class="card-text">
                                
                            </p>
                            <p class="card-text">
                                Описание: {{ cake.description }}
                            </p>


                            <a @click="form(cake)" class="btn btn-primary mt-2">Оформить заказ</a>
                            <div class="mt-2">
                                <span v-if="ordered" class="badge  text-bg-success">Заказ оформлен</span>
                            </div>
                            <div class="mt-2">
                                <span v-if="ordered" class="">Проверяйте вкладку "Мои заказы"</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <form v-if="formed && !ordered">
                
                <div class="mb-3">
                    <label for="formGroupExampleInput" class="form-label">Имя</label>
                    <div class="input-group flex-nowrap">
                        <input v-model="name" type="text" class="form-control" aria-label="Username"
                            aria-describedby="addon-wrapping" placeholder="Имя" id="formGroupExampleInput">
                    </div>
                </div>
                <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">Электронная почта</label>
                    <input v-model="email" type="email" class="form-control" id="formGroupExampleInput2"
                        placeholder="example@mail.ru">
                </div>
                <div class="mb-3">
                    <label for="formGroupExampleInput3" class="form-label">Номер карты</label>
                    <input v-model="card" type="number" class="form-control" id="formGroupExampleInput3"
                        placeholder="0000 0000 0000 0000">
                </div>
                <p class="card-text">К оплате: {{ cake.price }} руб.</p>
                <div v-if="alarm" class="badge rounded-pill text-bg-danger">
                    Пожалуйста, заполните все поля правильно
                </div>
                <div class="mb-3">
                    <a @click="order(cake)" class="btn btn-primary mt-2">Заказать</a>
                </div>

            </form>

        </div>
    </div>
</template>


<style scoped>
.container,
.card {
    background-color: #fdbcc5;
    border-radius: 20px;
}</style>