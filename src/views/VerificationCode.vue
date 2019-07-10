<template>
    <div class="input-message-container">
        <h3 class="input-message-title">输入验证码</h3>
        <p class="message-send-prompt">验证码已发送至 <span class="phone-num">{{splitPhone}}</span></p>
        <div class="input-code-filed">
            <vue-input-code
                span-size="20px"
                type="number"
                :number="4"
                height="50px"
                span-color="#000"
                input-color="#3498db"
                input-size="24px"
                :code="code"
                :get-input="getInput"
                :success="success">
            </vue-input-code>
        </div>
        <div class="text-wrapper">
            <p @click="getCodeHandler" :class="['resent-code', show && 'active']">
                {{getCodeText}}
            </p>
            <span v-if="errorMessage" class="code-error">{{errorMessage}}</span>
        </div>
        <message-box ref="messageBox" :enterHandler="loginFailedHandler"></message-box>
        <toast ref="toast"></toast>
    </div>
</template>
<script>
import MessageBox from '../components/MessageBox';
import Toast from '../components/Toast';
export default {
    name: 'VerificationCode',
    components: {MessageBox, Toast},
    data() {
        return {
            //  验证码相关
            code: [],
            phone: '',
            errorMessage: '',
            //  倒计时相关
            timer: null,
            count: '',
            show: true
        };
    },
    async created() {
        let {phone} = this.$route.params;
        this.phone = phone || '';
        if (localStorage.getItem('send')) {
            localStorage.removeItem('send');
            this.getCodeHandler();
        }
    },
    computed: {
        getCodeText() {
            if (this.show) {
                return '重新获取验证码';
            } else {
                return `${this.count}s 后重新获取验证码`;
            }
        },
        splitPhone() {
            return this.phone.replace(/(\d{3})(\d{0,4})/, '$1 $2 ');
        }
    },
    methods: {
        async getCodeHandler() {
            try {
                if (this.show) {
                    this.getCode();
                    let res = await this.$service.getVerifyCode(this.phone);
                    if (res && res.code !== 0) {
                        this.errorMessage = res.message;
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },
        getCode(){
            this.show = false;
            const TIME_COUNT = 20;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
        },
        getInput() {

        },
        success() {
            console.log('aaaa');
        },
        loginFailedHandler() {
            this.$router.push({name: 'Phone'});
        },
        showMessageBoxHandler() {
            this.$refs.messageBox.showHandler();
        },
        hideMessageBoxHandler() {
            this.$refs.messageBox.hideHandler();
        }
    }
};
</script>
<style lang="scss" scoped>
.input-message-container {
    width: 12.53rem;
    margin: 0 auto;
    .input-message-title {
        margin-top: 4rem;
        font-size: 32px;
        line-height: 32px;
        color: #000;
        margin-bottom: 1rem;
    }
    .message-send-prompt {
        color: #333;
        font-size: 16px;
        line-height: 16px;
    }
    .input-code-filed {
        margin-top: 1rem;
    }
    .text-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.3rem;
        .resent-code {
            color: #333;
            font-size: 14px;
            line-height: 14px;
            &.active {
                color: #00ABFF;
            }
        }
        .code-error {
            color: #FD0000;
            font-size: 14px;
        }
    }
}
</style>
<style lang="scss">
.vue_input_code .input > span {
    border: none;
    border-bottom: 1px solid #000;
    & + span {
        margin-left: 0.4rem;
    }
}
.vue_input_code .input > span:last-child {
    border-right: none;
    border-radius: 0;
}
.vue_input_code .input > span.first {
    border-radius: 0;
}
</style>

