<template>
    <div class="app-search-page">
        <header>
            <v-btn light icon class="search-btn" @click.native="$router.go(-1)">
                <v-icon class="search-icon">arrow_back</v-icon>
            </v-btn>
            <form @submit.prevent="search">
                <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="请输入搜索词"
                       autocapitalize="off"/>
            </form>
            <v-btn light icon class="search-btn" @click.native="query = ''">
                <v-icon class="search-icon">close</v-icon>
            </v-btn>
        </header>
        <div v-if="loading" class="search-loading">
            <v-progress-circular indeterminate v-bind:size="70" class="primary--text"></v-progress-circular>
        </div>
        <div v-if="data && data.length" class="search-content">
            <v-list two-line>
                <template v-for="(item, index) in data">
                    <v-list-tile avatar ripple v-bind:key="item" @click="showPic(item)">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider light v-if="index + 1 < data.length"></v-divider>
                </template>
            </v-list>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    let state = {
        appHeaderState: {
            show: false
        }
    };

    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
    }

    export default {
        name: 'search',
        metaInfo: {
            title: '搜索',
            titleTemplate: '%s',
            meta: [
                {name: 'keywords', content: '冲冲俱乐部'}
            ]
        },
        data() {
            return {
                query: '',
                loading: false,
                data: []
            };
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
            async search() {
                // 把数据清空
                this.data = [];
                // 显示加载动画
                this.loading = true;
                // 让当前输入框失去焦点
                this.$el.querySelector('.search-input').blur();
                // 等待 1s，模拟加载中的效果
                await new Promise(resolve => {
                    setTimeout(resolve, 1000);
                });
                // 设置搜索结果数据
                this.$http.get('../static/folder.json').then(res => {
                    let resData = res.body.RECORDS;
                    for (let i = 0; i < resData.length; i++) {
                        let dt = resData[i];
                        let tmpStr = dt.foldername;
                        if (tmpStr.indexOf(this.query) !== -1) {
                            this.data.push(tmpStr)
                        }
                    }
                });
                this.loading = false;
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
    header
        display flex
        align-items center
        height 52px
        box-shadow 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px rgba(0, 0, 0, .14), 0 1px 10px rgba(0, 0, 0, .12)

    form
        flex 1

    .search-input
        width 100%
        outline none
        font-size 16px
        height 50px

    .search-btn
        color #959595

    .search-loading
        margin-top 30%
        display flex
        justify-content center

    .search-content
        margin-top 20px

    li
        list-style-type none
</style>
