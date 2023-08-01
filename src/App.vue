<script>

// Компоненты
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

import { RouterView } from 'vue-router'

// Главная страница
export default {
	components: {
		AppHeader,
		RouterView,
		AppFooter
	}
};


</script>

<template>
	<div class="app">
		<!-- Шапка -->
		<app-header></app-header>

		<!-- Меняющаяся часть -->
		<router-view></router-view>

		<app-footer></app-footer>
	</div>
</template>

<style></style>
