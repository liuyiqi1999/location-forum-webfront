<template>
  <div>
    <div style="margin-bottom: 10px">
      <n-button
        round
        secondary
        v-for="button in textButtons"
        :key="button.value"
        @click.prevent="clickButton(button.value)"
        #icon
        >
        <n-icon>
            <BoldIcon v-if="button.value==='bold'" />
            <ItalicIcon v-else-if="button.value==='italic'" />
            <HeaderIcon v-else-if="button.value==='heading'" />
            <UlIcon v-else-if="button.value==='ul'" />
            <OlIcon v-else-if="button.value='ol'"/>
        </n-icon>
        </n-button
      >
    </div>
    <div
      @input="onInput"
      contenteditable="true"
      id="editor"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { NButton, NIcon } from 'naive-ui';
import buttonsAction from "../hooks/buttons";
import { TextBold as BoldIcon, TextItalic as ItalicIcon, ListBulleted as UlIcon, ListNumbered as OlIcon } from '@vicons/carbon';
import { TextHeader120Filled as HeaderIcon }from '@vicons/fluent';

const emits = defineEmits(["input"]);

onMounted(() => {
  document.execCommand("defaultParagraphSeparator", false, "p");
});

const onInput = (event) => {
  emits('input', event.target.innerHTML);
}

const { textButtons, clickButton } = buttonsAction();

</script>

<style scoped>
#editor {
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #dcdfe6;

  padding: 20px 10px;
}
#editor:focus {
  border-color: #409eff;
}
</style>
