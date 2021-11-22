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
      v-html="innerValue"
      contenteditable="true"
      id="editor"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from "vue";
import { Marked } from "@ts-stack/markdown";
import TurndownService from "turndown";
import { NButton, NIcon } from 'naive-ui';
import buttonsAction from "../hooks/buttons";
import { TextBold as BoldIcon, TextItalic as ItalicIcon, ListBulleted as UlIcon, ListNumbered as OlIcon } from '@vicons/carbon';
import { TextHeader120Filled as HeaderIcon }from '@vicons/fluent';

var lastEditRange;

const props = defineProps({
  markdown: String,
});
const emits = defineEmits(["input"]);

const innerValue = computed(() => {
  // return props.markdown || "<p><br></p>";
  // return Marked.parse(props.markdown) || "<p><br></p>";
});

onMounted(() => {
  document.execCommand("defaultParagraphSeparator", false, "p");
});

const { textButtons, clickButton } = buttonsAction();

const onInput = (event) => {
  // var selection = getSelection();
  // // 设置最后光标对象
  // lastEditRange = selection.getRangeAt(0);
  // event.target.innerHTML = Marked.parse(event.target.innerText);
  // selection.removeAllRanges();
  // selection.addRange(lastEditRange);
  // var range = selection.getRangeAt(0);
  // // 获取光标对象的范围界定对象，一般就是textNode对象
  // var textNode = range.startContainer;
  // // 获取光标位置
  // var rangeStartOffset = range.startOffset;
  // // 文本节点在光标位置处插入新的表情内容
  // textNode.insertData(rangeStartOffset, emojiInput.value);
  // // 光标移动到到原来的位置加上新内容的长度
  // range.setStart(textNode, rangeStartOffset + emojiInput.value.length);
  // // 光标开始和光标结束重叠
  // range.collapse(true);
  // // 清除选定对象的所有光标对象
  // selection.removeAllRanges();
  // // 插入新的光标对象
  // selection.addRange(range);
  // const turndown = new TurndownService({
  //   emDelimiter: "_",
  //   linkStyle: "inlined",
  //   headingStyle: "atx",
  // });
  // emits('input', turndown.turndown(event.target.innerHTML));
  // emits('input', event.target.innerHTML);
};
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
