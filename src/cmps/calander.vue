<template>
  <el-calendar>
  <!-- Use 2.5 slot syntax. If you use Vue 2.6, please use new slot syntax-->
  <template
    slot="dateCell"
    slot-scope="{date, data}">
    <p :class="data.isSelected ? 'is-selected' : ''">
      {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
      {{date}}
    </p>
  </template>
</el-calendar>
</template>

<script>
export default {
  
}
</script>


  <style>
    .is-selected {
      color: #1989FA;
    }
  </style>