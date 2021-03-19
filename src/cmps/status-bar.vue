<template>
  <section>

  </section>
</template>

<script>
export default {
  props: {
    statuses: {
      type: Array,
      required: true,
    },
  },
  created() {
    console.log(this.statuses);
  }
}
</script>

<style>

</style>