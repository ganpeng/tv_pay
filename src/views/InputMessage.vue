<template>
    <div class="input-message-container">
        <h3 class="input-message-title">输入验证码</h3>
        <p class="message-send-prompt">验证码已发送至 <span class="phone-num">185 0019 7330</span></p>
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
        <p @click="getCodeHandler" :class="['resent-code', show && 'active']">
            {{getCodeText}}
        </p>
        <message-box></message-box>
    </div>
</template>
<script>
import MessageBox from '../components/MessageBox';
export default {
    name: 'InputMessage',
    components: {MessageBox},
    data() {
        return {
            code: [],
            //  倒计时相关
            timer: null,
            count: '',
            show: true
        };
    },
    created() {
        this.getCode();
    },
    computed: {
        getCodeText() {
            if (this.show) {
                return '重新获取验证码';
            } else {
                return `${this.count}s 后重新获取验证码`;
            }
        }
    },
    methods: {
        getCodeHandler() {
            if (this.show) {
                this.getCode();
                this.$service.getVerifyCode(15210069510);
            }
        },
        getCode(){
            this.show = false;
            const TIME_COUNT = 6;
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
    .resent-code {
        color: #333;
        font-size: 14px;
        line-height: 14px;
        margin-top: 1.3rem;
        &.active {
            color: #00ABFF;
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

