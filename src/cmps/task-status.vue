<template>
    <section class="status-modal">
        <ul v-if="renderStatuses" class="status-list clean-list">
            <li v-for="status in renderStatuses" :key="status.id">
                <div class="label" v-bind:style="{ borderLeft: `10px solid ${status.color}` }">{{status.title}}</div>
            </li>
            <li>
                <input 
                ref="addStatusInput"
                @keyup.enter="addStatus"
                class="input-add-status"
                type="text"
                placeholder="New label"
                v-bind:style="{ borderLeft: `10px solid ${addStatusColor}` }"
                >
            </li>
        </ul>
        <!-- <color-picker @changeColor="changeColor"/> -->
    </section>
</template>

<script>
import colorPicker from "./color-picker";
export default {
    props: {
        statuses: {
          type: Array,
          required: true,
        },
    },
    data() {
        return {
            renderStatuses: [],
            addStatusColor: 'gray'
        }
    },
    methods: {
        changeColor(color) {
            this.addStatusColor = color;
        },
        addStatus(ev) {
            this.$emit('addStatus', { title: ev.target.value, color: this.addStatusColor })
            this.$refs['addStatusInput'].value = ''
        },
    },
    created() {
        this.renderStatuses = this.statuses.filter(status => status.id !== 'sNew')
    },
    components: {
        colorPicker
    },
}
</script>
