<template>
  <div style="margin: 20px;padding:20px;background-color: white;">
    <Table border stripe :data="ipPoolList" :columns="ipPoolListColumns" :loading="ipPoolListTableLoading"></Table>
    <div style="margin: 20px;overflow: hidden">
        <Page :page-size="pageSize" :total="totalCount" :current="currentPage" @on-change="changePage" show-elevator
              show-total></Page>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    name: "ip-pool",
    data() {
      return {
        ipPoolListTableLoading: false,
        ipPoolList: [],
        pageSize: this.getIpPoolListSize(),
        totalCount: 1,
        currentPage: 1,
        ipPoolListColumns: [
          {
            type: 'index',
            width: 60,
            align: 'center',
          },
          // {title: 'ID', key: 'id', align: 'center', sortable: true},
          {title: 'IP', key: 'ip', align: 'center', ellipsis:true, minWidth: 150},
          {title: '国家', key: 'address', align: 'center', ellipsis:true, minWidth: 80,
            render: (h, params) => {
              let country = '';
              let address = params.row.address;
              if (address != null) {
                country = address.country;
              }
              return h('span',country);
            }
          },
/*          {title: '地区', key: 'address', align: 'center', ellipsis:true, minWidth: 80,
            render: (h, params) => {
              let area = '';
              let address = params.row.address;
              if (address != null) {
                area = address.area;
              }
              return h('span',area);
            }
          },*/
          {title: '省份', key: 'address', align: 'center', ellipsis:true, minWidth: 100,
            render: (h, params) => {
              let region = '';
              let address = params.row.address;
              if (address != null) {
                region = address.region;
              }
              return h('span',region);
            }
          },
          {title: '城市', key: 'address', align: 'center', ellipsis:true, minWidth: 100,
            render: (h, params) => {
              let city = '';
              let address = params.row.address;
              if (address != null) {
                city = address.city;
              }
              return h('span',city);
            }
          },
/*          {title: '县', key: 'address', align: 'center', ellipsis:true, minWidth: 80,
            render: (h, params) => {
              let county = '';
              let address = params.row.address;
              if (address != null) {
                county = address.county;
              }
              return h('span',county);
            }
          },*/
          {title: '运营商', key: 'address', align: 'center', ellipsis:true, minWidth: 100,
            render: (h, params) => {
              let isp = '';
              let address = params.row.address;
              if (address != null) {
                isp = address.isp;
              }
              return h('span',isp);
            }
          },
          {title: '国家ID', key: 'address', align: 'center', ellipsis:true, minWidth: 80,
            render: (h, params) => {
              let country_id = '';
              let address = params.row.address;
              if (address != null) {
                country_id = address.country_id;
              }
              return h('span',country_id);
            }
          },
/*          {title: '地区ID', key: 'address', align: 'center', ellipsis:true, minWidth: 80,
            render: (h, params) => {
              let area_id = '';
              let address = params.row.address;
              if (address != null) {
                area_id = address.area_id;
              }
              return h('span',area_id);
            }
          },*/
/*          {title: '省份ID', key: 'address', align: 'center', ellipsis:true, minWidth: 80,
            render: (h, params) => {
              let region_id = '';
              let address = params.row.address;
              if (address != null) {
                let region_id = address.region_id;
              }
              return h('span',region_id);
            }
          },*/
          {title: '城市ID', key: 'address', align: 'center', ellipsis:true, minWidth: 90,
            render: (h, params) => {
              let city_id = '';
              let address = params.row.address;
              if (address != null) {
                city_id = address.city_id;
              }
              return h('span',city_id);
            }
          },
/*          {title: '县ID', key: 'address', align: 'center', ellipsis:true, minWidth: 80,
            render: (h, params) => {
              let county_id = '';
              let address = params.row.address;
              if (address != null) {
                county_id = address.county_id;
              }
              return h('span',county_id);
            }
          },*/
          {title: '运营商ID', key: 'address', align: 'center', ellipsis:true, minWidth: 90,
            render: (h, params) => {
              let isp_id = '';
              let address = params.row.address;
              if (address != null) {
                isp_id = address.isp_id;
              }
              return h('span',isp_id);
            }
          },
          {title: '访问时间', key: 'createTime', align: 'center', ellipsis:true, minWidth: 150,},
        ]
      }
    },
    methods: {
      ...mapMutations([
        'setIpPoolListPage',
      ]),
      ...mapGetters([
        'getIpPoolListSize'
      ]),
      ...mapActions([
        'handleIpPoolList',
      ]),
      changePage(index) {
        this.setIpPoolListPage(index);
        this.getIpPoolList();
      },
      getIpPoolList() {
        this.ipPoolListTableLoading = true;
        this.handleIpPoolList().then(value => {
          this.totalCount = value.data.totalCount;
          this.ipPoolList = value.data.ipPool;
          this.ipPoolListTableLoading = false;
        }).catch(reason => {
          this.ipPoolListTableLoading = false;
        })
      },
    },
    created() {
      this.getIpPoolList();
    },
  }
</script>

<style>

</style>
