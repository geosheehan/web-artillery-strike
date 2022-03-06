<template>
	<b-button v-if="!changingName" @dblclick="changingName = true">
		{{ buttonName }}
	</b-button>
	<b-input
		v-else
		autofocus
		ref="rename"
		:value="buttonName"
		@focus="selectText"
		@blur="onNameChange"
	/>
</template>

<script>
export default {
	name: 'LocationButton',
	props: {
		name: String,
	},
	data() {
		return {
			buttonName: this.name,
			changingName: false,
		};
	},
	methods: {
		selectText() {
			this.$refs['rename'].select();
		},
		onNameChange(event) {
			const newName = event.target.value.trim();
			if (newName && newName !== this.buttonName) {
				this.buttonName = newName;
			}
			this.changingName = false;
		},
	},
};
</script>
