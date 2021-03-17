<template>
    <section class="task-preview">
        <div>
            <div v-bind:style="{background: groupColor}"></div>
            <div>{{task.title}}</div>
            <div @click.prevent="onTask"><i class="el-icon-chat-dot-round"></i></div>
        </div>
        <div>
            <ul class="members">
                <li v-for="member in members" :key="member._id" class="miniUser">
                    <el-avatar :size="size" :src="member.imgUrl"></el-avatar>
                </li>
            </ul>
        </div>
        <div>
            {{task.statusId}}
        </div>
        <div>
            {{task.dueDate}}
        </div>
        <div>
            {{task.priorityId}}
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            task: {
                type: Object,
                required: true
            },
            groupColor: {
                type: String,
                required: true
            }
        },
        methods: {
            onTask() {
                console.log('onTask');
            }
        }
    }
</script>