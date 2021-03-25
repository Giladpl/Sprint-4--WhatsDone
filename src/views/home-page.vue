<template>
  <section class="home-page">
    <div class="hero-homepage">
        <home-page-header />
        <div class="main-hero flex-between">
            <div class="hero-content">
                <h1 class="title-hero">Project management made simple.</h1>
                <p class="txt-hero">
                    From the initial idea to the end product. Manage you project with your team members
                    by defining tasks, assigning responsibilities and folowing-up with their statuses.
                </p>
                <router-link class="try-btn" to="/board">Try now!</router-link>
            </div>
            <div class="img-hero">
                <img src="@/assets/icons/scrum-board.svg">
            </div>
        </div>
    </div>
    <div class="main-feature flex">
        <div class="feature-box fd-column">
            <div class="icon-box flex-center"><i class="el-icon-notebook-2"></i></div>
            <div class="content-box">
                <div class="title-box">Project management</div>
                <div class="txt-box ">Plan, track, and manage any project from start to finish</div>
            </div>
        </div>
        <div class="feature-box fd-column">
            <div class="icon-box flex-center"><i class="el-icon-chat-round"></i></div>
            <div class="content-box">
                <div class="title-box">Team communication</div>
                <div class="txt-box ">Always know who is doing what, and how they are doing</div>
            </div>
        </div>
        <div class="feature-box fd-column">
            <div class="icon-box flex-center"><i class="el-icon-s-data"></i></div>
            <div class="content-box">
                <div class="title-box">Advanced tools</div>
                <div class="txt-box ">Useful features like progress bars and charts will help you monitor progress</div>
            </div>
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
