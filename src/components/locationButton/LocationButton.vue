<template>
	<b-button
		v-if="!changingName"
		:variant="selected ? 'primary' : 'secondary'"
		@click="$emit('click', buttonId)"
		@dblclick="changingName = true"
	>
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
		buttonId: {
			type: Number,
			required: true,
		},
		name: String,
		selected: Boolean,
	},
	data() {
		return {
			// If provided a name, display it. Otherwise default to 'Location {id}'
			buttonName: this.name || `Location ${this.buttonId}`,
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
