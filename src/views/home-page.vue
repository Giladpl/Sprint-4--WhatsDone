<template>
  <section class="home-page">
    <home-page-header />
    <div class="main-content">
        <div class="logo">
            <img src="@/assets/icons/increase.svg" width="100">
        </div>
        <div>
            <h1>WhatsDone</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe quam maxime assumenda dolores laborum eligendi facilis fugit minima. Nisi consectetur ducimus sequi aut inventore reiciendis vitae possimus ipsam veritatis nulla.</p>
            <router-link class="try-btn" to="/board">Try now!</router-link>
        </div>
    </div>
  </section>
</template>

<script>
import homePageHeader from '@/cmps/home-page-header'
export default {
    components: {
        homePageHeader
    }
}
</script>
