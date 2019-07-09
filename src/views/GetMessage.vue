<template>
    <div class="get-message-container">
        <div class="logo">
            <h3>
                欢迎登录天驰TV
            </h3>
            <svg-icon class-name="logo-svg" icon-class="logo"/>
            <div class="linear-gradient-box"></div>
        </div>
        <div class="input-container">
            <input
                v-model="phone"
                class="phone-input"
                type="number"
                placeholder="请输入手机号"
            >
            <span v-if="!inputEmpty" class="clear-btn" @click="clearPhoneHandler">
                <svg-icon class="delete-svg" icon-class="icon_delete"/>
            </span>
        </div>
        <button :class="['get-code-btn', inputEmpty ? 'disabled' : '']">获取短信验证码</button>
    </div>
</template>
<script>
export default {
    name: 'GetMessage',
    data() {
        return {
            phone: ''
        };
    },
    computed: {
        inputEmpty() {
            return this.phone === '';
        }
    },
    methods: {
        clearPhoneHandler() {
            this.phone = '';
        }
    }
}
</script>
<style lang="scss" scoped>
.get-message-container {
    width: 12.53rem;
    margin: 0 auto;
    .logo {
        position: relative;
        width: 100%;
        height: 1.8rem;
        line-height: 1.8rem;
        margin-top: 3.6rem;
        h3 {
            position: relative;
            font-weight: bold;
            font-size: 1rem;
            text-indent: 0.48rem;
            z-index: 4;
        }
        .logo-svg {
            position: absolute;
            bottom: 0;
            right: 0.5rem;
            width: 2rem;
            height: 1.52rem;
            z-index: 4;
        }
        .linear-gradient-box {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 80%;
            height: 1rem;
            background: linear-gradient(to right,#39f1f9,#fff);
            z-index: 2;
        }
    }

    .input-container {
        position: relative;
        width: 100%;
        margin-top: 2.5rem;
        .phone-input {
            font-size: 0.72rem;
            width: 100%;
            height: 2.34rem;
            line-height: 2.34rem;
            color: #000;
            outline: none;
            border: none;
            border-bottom: 1px solid #C2C2CC;
            &::placeholder {
                color: #C2C2CC;
            }
        }
        .clear-btn {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            .delete-svg {
                width: 1rem;
                height: 1rem;
            }
        }
    }

    .get-code-btn {
        width: 100%;
        height: 1.9rem;
        line-height: 1.9rem;
        font-size: 0.68rem;
        font-weight: 600;
        color: #fff;
        background-color: #00ABFF;
        border-radius: 8px;
        outline: none;
        border: none;
        margin-top: 2.2rem;
        &.disabled {
            color: #C2C2CC;
            opacity: 0.5;
        }
    }
}
</style>
