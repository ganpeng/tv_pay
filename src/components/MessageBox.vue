<template>
    <div v-if="show" class="message-box-container">
        <div class="content">
            <h3 class="title">登录失败</h3>
            <p class="text">登录失败，请重试</p>
            <div class="seperator"></div>
            <div class="btn" @click="enterHandler">确定</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MessageBox',
    props: {
        enterHandler: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        showHandler() {
            this.show = true;
        },
        hideHandler() {
            this.show = false;
        }
    }
};
</script>
<style lang="scss" scoped>
.message-box-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 100;
    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12.53rem;
        text-align: center;
        background-color: #fff;
        border-radius: 8px;
        z-index: 5;
        .title {
            font-size: 18px;
            margin-top: 0.8rem;
        }
        .text {
            font-size: 16px;
            color: #8D8D99;
            margin: 1rem 0;
        }
        .seperator {
            width: 100%;
            height: 1px;
            background-color: rgba(230,230,230,1);
        }
        .btn {
            font-size: 18px;
            color: #00ABFF;
            margin: 0.6rem 0;
        }
    }
}
</style>
