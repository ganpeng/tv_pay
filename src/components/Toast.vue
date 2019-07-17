<template>
    <transition name="fadeInUp">
        <div class="toast" v-if="show">
            {{text}}
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Toast',
    props: {
        text: {
            type: String,
            default: 'Message'
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
            setTimeout(() => {
                this.show = false;
            }, 3000);
        },
        hideHandler() {
            this.show = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.toast {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7.4rem;
    height: 1.84rem;
    font-size: 16px;
    line-height: 1.84rem;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 24px;
    z-index: 1000;
}


@-webkit-keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

.fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
}
</style>
