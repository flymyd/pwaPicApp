<template>
    <div class="detail-wrapper">
        <v-layout row wrap style="padding-bottom: 2rem">
            <v-flex xs10 offset-xs1>
                <article class="detail-content text-xs-left">
                    <h4>{{subTitle}}</h4>
                </article>
                <v-flex
                    v-for="nn in picArr" :key="nn" xs12 d-flex>
                    <v-card flat tile class="d-flex">
                        <v-img
                            :src="`${nn}`"
                            :lazy-src="`${nn}`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                        >
                            <template v-slot:placeholder>
                                <v-layout
                                    fill-height
                                    align-center
                                    justify-center
                                    ma-0
                                >
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-layout>
                            </template>
                        </v-img>
                    </v-card>
                </v-flex>
            </v-flex>
        </v-layout>
        <v-footer class="pa-3">
            <v-spacer></v-spacer>
            <div>&copy; {{ new Date().getFullYear() }} 图钉5号俱乐部</div>
        </v-footer>
    </div>
</template>

<script>
    let state = {
        appHeaderState: {
            show: true,
            title: '图片显示',
            showMenu: false,
            showBack: true,
            showLogo: false,
            actions: [
                {
                    icon: 'home',
                    route: {
                        name: 'index'
                    }
                }
            ]
        }
    };

    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
    }

    export default {
        name: 'detailId',
        metaInfo() {
            return {
                title: `冲冲俱乐部`,
                titleTemplate: '%s',
                meta: [
                    {name: 'keywords', content: '冲冲俱乐部'}
                ]
            }
        },
        data() {
            return {
                subTitle: this.$route.params.subTitle,
                picArr: []
            }
        },
        mounted() {
            this.$http.get('static/pic.json').then(res => {
                let resData = res.body.RECORDS;
                let tmparr = [];
                for (let i = 0; i < resData.length; i++) {
                    let dt = resData[i];
                    if (dt["picfolder"] === this.subTitle) {
                        tmparr.push(dt["picurl"])
                    }
                    this.picArr = tmparr;
                }
                this.picStr = JSON.stringify(tmparr)
            });
        },
        async asyncData({store, route}) {
            setState(store);
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 500);
            });
        },
        activated() {
            setState(this.$store);
        }
    };
</script>

<style lang="stylus" scoped>

    .detail-content
        font-size 16px
        line-height 30px
        margin-top 30px

        .detail-title
            margin-bottom 20px
            padding 10px 0
            font-size 36px
            font-weight bold

</style>
