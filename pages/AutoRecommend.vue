<template>
    <div class="detail-wrapper">
        <v-layout justify-center>
            <v-flex xs12 sm6>
                <v-card>
                    <v-container fluid grid-list-md>
                        <v-layout row wrap>
                            <v-flex
                                v-for="card in cards"
                                v-bind="{ [`xs${card.flex}`]: true }"
                            >
                                <v-card @click="showPic(card.subTitle)">
                                    <v-img :src="card.src" :lazy-src="card.src" height="10rem">
                                        <v-container fill-height fluid pa-2>
                                            <v-layout fill-height>
                                                <v-flex xs12 align-end flexbox>
                                                    <span class="headline white--text" v-text="card.title"></span>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-img>
                                    <v-card-actions>
                                        <p style="overflow:hidden;">{{card.subTitle}}</p>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
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
            title: '智能推荐',
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
                title: `智能推荐`,
                titleTemplate: '%s',
                meta: [
                    {name: 'keywords', content: '冲冲俱乐部'}
                ]
            }
        },
        mounted() {
            this.$http.get('static/folder.json').then(res => {
                this.cataIdArr = [];
                let catalogs = res.body.RECORDS;
                //生成随机目录
                let originalArray = [];
                for (let i = 0; i < catalogs.length; i++) {
                    originalArray[i] = i + 1;
                }
                originalArray.sort(function () {
                    return 0.5 - Math.random();
                });
                for (let i = 0; i < 10; i++) {
                    let tmpd = originalArray[i] + "";
                    let subtitle = catalogs[tmpd].foldername;
                    this.cards.push({
                        src: 'https://raw.githubusercontent.com/mythmyd/picarchive/master/' + subtitle + '/1.jpg',
                        subTitle: subtitle,
                        flex: 6
                    })
                }
            })
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
            }
        },
        data() {
            return {
                cataIdArr: [],
                cards: []
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
