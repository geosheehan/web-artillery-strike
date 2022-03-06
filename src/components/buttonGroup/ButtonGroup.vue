<template>
	<section>
		<b-button v-for="button in numButtons" :key="button">
			Location {{ button }}
		</b-button>
	</section>
</template>
<script>
export default {
	name: 'ButtonGroup',
	props: {
		numButtons: Number,
	},
};
</script>
<style scoped></style>
