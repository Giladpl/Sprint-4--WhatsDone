<template>
    <section class="task-preview">
        <div>
            <div v-bind:style="{background: userColor}"></div>
            <!-- <h4>{{task.title}}</h4> -->
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            toy: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                groupColor = null
            }
        },
        created() {
            this.groupColor = this.task.color;
        }
    }
</script>