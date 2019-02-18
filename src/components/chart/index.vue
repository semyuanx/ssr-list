<template>
  <div>
    <div class="small-chart-box"></div>

    <transition name="chart-fade">
      <div class="big-chart-box"
           v-if="show">
        <div class="follow-setup-box">
          <div class="follow-setup-box-top">
            <h1>{{$t('syfx')}}</h1>
            <div class="fr mt20 mr10"><a href="javascript:;"
                                         id="bigChartBoxClose"
                                         :title="$t('close')"><i @click="close"></i></a></div>
          </div>
          <div class="follow-setup"
               style="padding:40px 30px;width:740px;float: left;">
            <div class="big-chart"
                 style="height: 300px;width: 740px;"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { animate, getChartData } from '@/utils/util';
import zhCN from '@/i18n/zh-CN/components/chart';
import zhTW from '@/i18n/zh-TW/components/chart';
import enUS from '@/i18n/en-US/components/chart';
import zhHK from '@/i18n/zh-HK/components/chart';

const Highcharts = require('highcharts');

export default {
  i18n: {
    messages: {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
      'zh-HK': zhHK,
    },
  },
  data() {
    return {
      target: undefined,
      bigTarget: undefined,
      show: false,
    };
  },
  props: ['chartData', 'smallChartYExt', 'smallChartXExt', 'bigChartYExt', 'bigChartXExt'],
  computed: {
    // smallChartY() {
    //   // const smallY = !this.smallChartYExt ? null : getChartData(this.smallChartYExt.slice(this.smallChartYExt.length - 10), 'yAxis');
    //   // return smallY;
    //   return [];
    // },
    // smallChartX() {
    //   // const smallX = !this.smallChartXExt ? null : getChartData(this.smallChartXExt.slice(this.smallChartXExt.length - 10), 'xAxis');
    //   // return smallX;
    //   return [];
    // },
    // bigChartY() {
    //   const bigY = !this.bigChartYExt ? null : getChartData(this.bigChartYExt, 'yAxis');
    //   return bigY;
    //   return
    // },
    // bigChartX() {
    //   const bigY = !this.bigChartXExt ? null : getChartData(this.bigChartXExt, 'xAxis');
    //   return bigY;
    // },
  },
  methods: {
    lang(path) {
      return this.$i18n.t(path);
    },
    $t(path) {
      return this.$i18n.t(path);
    },
    init() {
      this.$nextTick(() => {
        this.initChart();
      });
    },
    initChart() {
      const that = this;
      const transformData = !this.chartData ? {} : getChartData(this.chartData);
      const { x, y } = transformData;
      // const bigChartX = !this.chartData ? [] : getChartData(this.chartData, 'xAxis');

      const bigChartX = x || [];
      const smallChartX = bigChartX.slice(bigChartX.length - 10);
      // const smallChartX = !this.chartData ? null : getChartData(this.chartData.slice(this.chartData.length - 10), 'xAxis');

      const bigChartY = y || [];
      // const bigChartY = !this.chartData ? [] : getChartData(this.chartData, 'yAxis');
      // const smallChartY = !this.chartData ? null : getChartData(this.chartData.slice(this.chartData.length - 10), 'yAxis');
      const smallChartY = bigChartY.slice(bigChartY.length - 10);

      that.target = Highcharts.chart(this.$el.querySelector('.small-chart-box'), {
        chart: {
          type: 'areaspline',
          plotBackgroundImage: `${this.cdn}/images/smallBackImg.png`,
          spacing: [0, 0, 0, 0],
          events: {
            click() {
              that.show = true;
              that.$nextTick(() => {
                that.fetchBigChart(
                  smallChartX,
                  smallChartY,
                  bigChartX,
                  bigChartY,
                );
              });
            },
          },
        },
        title: {
          text: null,
        },
        colors: ['#ffc766'],
        legend: {
          enabled: false,
        },
        xAxis: {
          gridLineWidth: 0,
          tickLength: 0,
          labels: {
            enabled: false,
          },
          title: {
            text: null,
          },
          lineWidth: 0,
          tickInterval: 1,
          lineColor: '#cccccc',
          // gridLineColor: '#f0f0f0',
          gridLineColor: 'transparent',
          categories: smallChartY,
        },
        yAxis: {
          gridLineWidth: 0,
          tickLength: 0,
          labels: {
            enabled: false,
          },
          title: {
            text: null,
          },
          tickInterval: 1,
          lineColor: '#cccccc',
          // gridLineColor: '#f0f0f0',
          gridLineColor: 'transparent',
        },
        tooltip: {
          style: {
            color: 'white',
            padding: '4px',
          },
          borderWidth: 0,
          shadow: false,
          backgroundColor: 'rgba(34,34,34, 0.6)',
          shared: true,
          formatter() {
            let color;
            if (this.y >= 0) {
              color = '#00ffa3';
            } else {
              color = '#ff846b';
            }
            const s = `<span style="color:${color}">$${this.y.toFixed(2)}</span>`;
            return s;
          },
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          areaspline: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0.8,
              },
              stops: [
                [0, '#ffedca'],
                [1, Highcharts.Color('#ffedca')
                  .setOpacity(0)
                  .get('rgba')],
              ],
            },
            marker: {
              radius: 0,
              fillColor: 'white',
              lineWidth: 1,
              lineColor: '#ffc766',
            },
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 2,
              },
            },
            threshold: null,
          },
          series: {
            lineColor: '#ffc766',
            point: {},
          },
        },
        series: [{
          name: 'John',
          data: smallChartX,
          events: {
            click() {
              that.show = true;
              that.$nextTick(() => {
                that.fetchBigChart(
                  smallChartX,
                  smallChartY,
                  bigChartX,
                  bigChartY,
                );
              });
            },
          },
        }],
      });
    },
    fetchBigChart(
      smallChartX,
      smallChartY,
      bigChartX,
      bigChartY,
    ) {
      const that = this;
      this.bigTarget = Highcharts.chart(this.$el.querySelector('.big-chart'), {
        chart: {
          type: 'areaspline',
          zoomType: 'xy',
        },
        title: {
          text: null,
        },
        colors: ['#ffc766'],
        legend: {
          enabled: true,
        },
        xAxis: {
          // gridLineWidth: 1,
          lineColor: '#cccccc',
          tickColor: '#cccccc',
          // gridLineColor: '#f0f0f0',
          categories: bigChartY,
          //   categories: that.bigChartY,
          tickInterval: Math.ceil(bigChartY.length / 7),
          //   tickInterval: Math.ceil(that.bigChartY.length / 7),
        },
        yAxis: {
          gridLineWidth: 1,
          lineColor: '#cccccc',
          tickColor: '#cccccc',
          // gridLineColor: '#f0f0f0',
          title: {
            text: null,
          },
          labels: {
            formatter() {
              return `${Highcharts.numberFormat(this.value, 0, '.', ',')} $`;
            },
          },
        },
        tooltip: {
          style: {
            color: 'white',
          },
          borderWidth: 0,
          shadow: false,
          backgroundColor: 'rgba(34,34,34, 0.6)',
          shared: true,
          formatter() {
            let a;
            let b;
            let
              color;
            if (this.y >= 0) {
              a = that.$i18n.t('zsy');
              color = '#00ffa3';
            } else {
              a = that.$i18n.t('zsy');
              color = '#ff846b';
            }
            const s = `${this.x}<br>${a}：<span style="color:${color}">$${this.y.toFixed(2)}</span>`;
            return s;
          },
        },
        credits: {
          href: this.base,
          position: {
            x: -30,
            y: -30,
          },
          style: {
            color: 'gray',
            fontSize: 12,
          },
          enabled: true,
          text: `${that.$t('sjly')} Followme`,
        },
        plotOptions: {
          areaspline: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, '#ffedca'],
                [1, Highcharts.Color('#ffedca')
                  .setOpacity(0)
                  .get('rgba')],
              ],
            },
            marker: {
              radius: 0,
              fillColor: 'white',
              lineWidth: 1,
              lineColor: '#ffc766',
            },
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 2,
              },
            },
            threshold: null,
          },
          series: {
            lineColor: '#ffc766',
          },
        },
        series: [{
          name: that.$i18n.t('zsy'),
          data: bigChartX, // || that.bigChartX,
        }],
      });
    },
    close() {
      this.show = false;
    },
  },
  mounted() {
    this.init();
  },
  beforeDestory() {
    this.bigTarget.destory();
  },
  watch: {
    smallChartX: {
      handler(a, b) {
        this.init();
      },
      deep: true,
    },
    chartData: {
      handler(a, b) {
        this.init();
      },
      deep: true,
    },
  },
};

</script>
<style lang="less" scoped>
  @import "./index";
</style>
