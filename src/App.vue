<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />
		<button-group :selected="1" />
	</div>
</template>

<script>
import ButtonGroup from './components/buttonGroup/ButtonGroup.vue';
export default {
	name: 'App',
	components: {
		ButtonGroup,
	},
	methods: {
		onLocation(buttonId) {
			console.log(`clicked button: '${buttonId}'`);
		},
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
