<template>
	<section>
		<location-button
			v-for="button in numButtons"
			:key="button"
			:selected="currentSelected === button"
			:buttonId="button"
			@click="selectLocation"
		/>
	</section>
</template>

<script>
import LocationButton from '../locationButton/LocationButton.vue';

export default {
	name: 'ButtonGroup',
	components: {
		LocationButton,
	},
	props: {
		numButtons: {
			type: Number,
			default: 6,
		},
		selected: {
			type: Number,
			default: 1,
		},
	},
	data() {
		return {
			currentSelected: this.selected,
		};
	},
	methods: {
		selectLocation(locationId) {
			console.log(`Location ${locationId} clicked`);
			this.currentSelected = locationId;
		},
	},
};
</script>

<style scoped></style>
