<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />
		<location-button name="Hello" @click="console.log('clicked')" />
	</div>
</template>

<script>
import LocationButton from './components/locationButton/LocationButton.vue';
export default {
	name: 'App',
	components: {
		LocationButton,
	},
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
