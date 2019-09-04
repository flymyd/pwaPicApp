<template>
    <div id="e3"
         style="max-width: 400px; margin: auto;"
         class="grey lighten-3">
        <v-card>
            <v-container fluid grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card color="blue-grey darken-2" class="white--text text-xs-left">
                            <v-card-title primary-title>
                                <div>
                                    <div class="headline"><p>Unlimited Porn Picture now</p></div>
                                    <p>图源抓取自杏吧jinzon大神</p>
                                    <p>私立パコパコ女子大学/Prestige</p>
                                    <p>精挑细选，只为深夜里孤独的你</p>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>

                    <v-flex xs12>
                        <v-card color="cyan darken-2" class="white--text" @click="goCatalog(1)">
                            <v-layout>
                                <v-flex xs5>
                                    <v-img
                                        src="https://i.loli.net/2019/09/02/iN3rV6KBMOZlU5L.jpg"
                                        height="125px"
                                        contain
                                    ></v-img>
                                </v-flex>
                                <v-flex xs7>
                                    <v-card-title primary-title>
                                        <div>
                                            <div class="headline">浏览目录</div>
                                            <div>{{todayStr}}</div>
                                            <div>{{todayNaN}}</div>
                                        </div>
                                    </v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-divider light></v-divider>
                            <v-card-actions class="pa-3">
                                图包总数
                                <v-spacer></v-spacer>
                                <p>375组-38页</p>
                            </v-card-actions>
                        </v-card>
                    </v-flex>

                    <v-flex xs12>
                        <v-card color="purple" class="white--text" @click="goRecomm">
                            <v-layout row>
                                <v-flex xs7>
                                    <v-card-title primary-title>
                                        <div>
                                            <div class="headline">智能推荐</div>
                                            <div>The Most SEXY For You</div>
                                            <div>色っぽい女</div>
                                        </div>
                                    </v-card-title>
                                </v-flex>
                                <v-flex xs5>
                                    <v-img
                                        src="https://i.loli.net/2019/09/02/LWxlIGY1Crh3qMb.png"
                                        height="125px"
                                        contain
                                    ></v-img>
                                </v-flex>
                            </v-layout>
                            <v-divider light></v-divider>
                            <v-card-actions class="pa-3">
                                列表条目
                                <v-spacer></v-spacer>
                                <p>10</p>
                            </v-card-actions>
                        </v-card>
                    </v-flex>

                    <v-flex xs12>
                        <v-card color="blue-grey darken-2" class="white--text text-xs-right" @click="goCatalog(historyPage)">
                            <v-card-title primary-title>
                                <div>
                                    <h1>ヒストリー OF 花鳥風月</h1>
                                    <p>
                                        ~繼續上次的旅程~
                                        <span v-if="showHistory">{{historyPage}}</span>
                                    </p>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-footer class="pa-3">
            <v-spacer></v-spacer>
            <div>&copy; {{ new Date().getFullYear() }} 图钉5号俱乐部</div>
        </v-footer>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', {
            show: true,
            title: '冲冲俱乐部',
            showMenu: true,
            showBack: false,
            showLogo: false,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                }
            ]
        });
    }

    export default {
        name: 'index',
        metaInfo: {
            title: '冲冲俱乐部',
            titleTemplate: '%s',
            meta: [
                {name: 'keywords', content: '冲冲俱乐部'}
            ]
        },
        mounted() {
            let dt = new Date();
            let weeks = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
            let week = dt.getDay();
            this.todayStr = dt.getFullYear() + "年" + dt.getMonth() + "月" + dt.getDate() + "日";
            this.todayNaN = weeks[week];
            if (this.historyPage !== null && this.historyPage !== undefined && this.historyPage !== "") {
                this.showHistory = true;
            }
        },
        data() {
            return {
                todayNaN: '',
                todayStr: '',
                historyPage: window.localStorage.getItem("historyPage"),
                showHistory: false
            }
        },
        methods: {
            goCatalog: function (pId) {
                this.$router.push({
                    name: 'catalogId',
                    params: {
                        id: pId
                    }
                })
            },
            goRecomm: function () {
                this.$router.push({
                    path: '/auto-recommend',
                    name: 'autoRecommend'
                })
            }
        },
        async asyncData({store, route}) {
            setState(store);
        },
        activated() {
            setState(this.$store);
        }
    };
</script>

<style lang="stylus" scoped>
    .content
        display flex
        align-items center
        justify-content center
        height 100%
        flex-wrap wrap

        h2
            font-size 46px
            font-weight 500
</style>
