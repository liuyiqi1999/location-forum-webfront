<template>
  <n-empty description="暂无消息">
    <template #icon>
      <n-icon>
        <system-icon />
      </n-icon>
    </template>
  </n-empty>
</template>
<script lang="ts" setup>
import { AirplaneOutline as SystemIcon } from '@vicons/ionicons5';
</script>
