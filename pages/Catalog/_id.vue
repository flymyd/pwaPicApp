<template>
    <div>
        <div class="detail-wrapper" style="padding-bottom: 20%">
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-list one-line>
                        <template v-for="(item, index) in sliceItems">
                            <v-list-tile
                                :key="item"
                                avatar
                                ripple
                                @click="showPic(item)"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider
                                v-if="index + 1 < items.length"
                                :key="index"
                            ></v-divider>
                        </template>
                    </v-list>
                </v-flex>
            </v-layout>
            第 {{pagesNum}} 页 , 共 38 页
        </div>
        <div style="position: fixed;bottom: 0;height: 10%">
            <v-bottom-nav
                :value="true"
                fixed
                color="white"
            >
                <v-btn
                    color="teal"
                    flat
                    value="recent"
                    @click="goCatalog(0,0)"
                >
                    <span>前一页</span>
                    <v-icon>chevron_left</v-icon>
                </v-btn>

                <template v-if="isJump">
                    <v-btn
                        color="teal"
                        flat
                        value="favorites"
                        @click="doJump"
                    >
                        <span>跳转</span>
                        <v-icon>youtube_searched_for</v-icon>
                    </v-btn>
                </template>
                <template v-else>
                    <input
                        type="text"
                        style="text-align: center"
                        v-model="pagesNum"
                        @blur.prevent="doBlur"
                    >
                </template>

                <v-btn
                    color="teal"
                    flat
                    value="nearby"
                    @click="goCatalog(1,0)"
                >
                    <span>后一页</span>
                    <v-icon>chevron_right</v-icon>
                </v-btn>
            </v-bottom-nav>
        </div>

    </div>
</template>

<script>
    let state = {
        appHeaderState: {
            show: true,
            title: '目录',
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
                title: '目录 - 第' + this.pagesNum + '页',
                titleTemplate: '%s',
                meta: [
                    {name: 'keywords', content: '冲冲俱乐部'}
                ]
            }
        },
        created() {
            this.pagesNum = this.$route.params.id;
        },
        mounted: function () {
            this.pagesNum = this.$route.params.id;
            window.localStorage.setItem("historyPage", this.$route.params.id);
            this.$http.get('../static/folder.json').then(res => {
                let resData = res.body.RECORDS;
                let tempPN = 0;
                let pN = parseInt(this.pagesNum);
                if (pN !== 1) {
                    tempPN = pN * 10 - 10;
                }
                for (let i = 0; i < resData.length; i++) {
                    let dt = resData[i];
                    this.items.push(dt.foldername)
                }
                for (let i = tempPN; i < tempPN + 10; i++) {
                    this.sliceItems.push(this.items[i])
                }
            });
        },
        data() {
            return {
                isJump: true,
                pagesNum: null,
                sliceItems: [],
                items: []
            }
        },
        methods: {
            showPic: function (id) {
                let params = {
                    subTitle: id
                };
                this.$router.push({
                    path: '/show-picture',
                    name: 'showPicture',
                    params: params
                })
            },
            doJump: function () {
                this.isJump = !this.isJump;
            },
            doBlur: function () {
                this.pagesNum = this.pagesNum.replace(/\s+/g, "");
                if (this.pagesNum !== "") {
                    // store.dispatch('pageTransition/setPagesNum', this.pagesNum);
                    this.goCatalog(2, this.pagesNum)
                }
            },
            goCatalog: function (status, pId) {
                let jumpId = this.$route.params.id;
                if (status === 0) {
                    //后退
                    if (jumpId > 1) {
                        jumpId = jumpId - 1;
                    }
                } else if (status === 1) {
                    jumpId = jumpId + 1;
                } else {
                    pId = parseInt(pId);
                    jumpId = pId
                }
                this.$router.push({
                    name: 'catalogId',
                    params: {
                        id: jumpId
                    }
                })
            }
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
