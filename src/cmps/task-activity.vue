<template>
    <section class="activity-container">
        <div>hi</div>
    </section>
</template>

<script>
export default {
    props: {
        activities: {
            type: Array
        },
    },
    created() {
        console.log(this.activities);
    }
}
</script>