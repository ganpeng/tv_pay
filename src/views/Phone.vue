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
            <span v-if="phone.length > 0" class="clear-btn" @click="clearPhoneHandler">
                <svg-icon class="delete-svg" icon-class="icon_delete"/>
            </span>
        </div>
        <div class="error-container">
            <p v-show="phone !== '' && !phoneIsValid" class="error">手机号格式不正确</p>
        </div>
        <button @click="getCodeHandler" :class="['get-code-btn', !phoneIsValid && 'disabled']">获取短信验证码</button>
    </div>
</template>
<script>
export default {
    name: 'Phone',
    data() {
        return {
            phone: ''
        };
    },
    computed: {
        phoneIsValid() {
            let reg = /^1[0-9]{10}$/;
            return reg.test(this.phone);
        },
    },
    created() {},
    methods: {
        clearPhoneHandler() {
            this.phone = '';
        },
        getCodeHandler() {
            if (this.phoneIsValid) {
                localStorage.setItem('send', true);
                this.$router.push({name: 'VerificationCode', query: {phone: this.phone}});
            }
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
            height: 0.72rem;
            line-height: 0.72rem;
            padding: 0.8rem 0;
            color: #000;
            caret-color: #00ABFF;
            outline: none!important;
            border-left: none!important;
            border-top: none!important;
            border-right: none!important;
            border-radius: 0!important;
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

    .error-container {
        height: 14px;
        line-height: 14px;
        margin-top: 10px;
        .error {
            color: #FD0000;
            font-size: 14px;
            height: 14px;
            line-height: 14px;
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
            // color: #C2C2CC;
            color: #fff;
            opacity: 0.5;
        }
    }
}
</style>
