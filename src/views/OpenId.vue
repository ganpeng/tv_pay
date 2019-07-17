<template>
    <div class="open-id">
        openId
    </div>
</template>
<script>
import _ from 'lodash';
export default {
    name: 'OpenId',
    created() {
        try {
            let {openid} = this.$route.query;
            if (!openid) {
                alert('获取用户授权openid失败');
                return false;
            } else {
                localStorage.setItem('openid', openid);
            }

            let optionString = localStorage.getItem('queryString');

            if (optionString) {
                let option = JSON.parse(optionString);
                let status = _.get(option, 'status');
                if (status === 1) {
                    alert('直接发起支付');
                    return false;
                } else if (status === 2) {
                    this.$router.push({name: 'Phone'});
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
