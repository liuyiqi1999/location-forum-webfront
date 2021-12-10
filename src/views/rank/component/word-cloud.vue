<template>
  <div ref="wordCloud" id="wordCloud" class="wordCloud" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import * as echarts from 'echarts';
import 'echarts-wordcloud/dist/echarts-wordcloud';
import 'echarts-wordcloud/dist/echarts-wordcloud.min';
import { PostApi } from '@/api';

const tags = ref([]);
const getTags = async () => {
  const { data } = await PostApi.getFrequentlyUsedTags();
  let tagList = data.data;
  for (let tag of tagList) {
    tag.value = tag.count;
  }
  tags.value = tagList;
};

onMounted(async () => {
  // 获取节点
  const myChart = echarts.init(
    document.getElementById('wordCloud') as HTMLElement
  );
  await getTags();
  var option = {
    tooltip: {},
    series: [
      {
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [12, 50],
        rotationRange: [-70, 70],
        // 心形
        shape: 'cardioid',
        width: 800,
        height: 500,
        textStyle: {
          normal: {
            color: function () {
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',') +
                ')'
              );
            },
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data: tags.value,
      },
    ],
  };
  myChart.setOption(option);
  console.log('词云图');
});
</script>
<style lang="scss" scoped>
.wordCloud {
  width: 800px;
  height: 500px;
  //   margin-top: 5px;
}
</style>
