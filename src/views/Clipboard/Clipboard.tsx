import { defineComponent } from 'vue';
import { Button, Col, Input, message, Row } from 'ant-design-vue';
import ClipboardJS from 'clipboard';
import { $ref } from 'vue/macros';

const copyVal = $ref("");
const cutVal = $ref("");

function textCopy(value: string, elem: string) {
  const clipboard = new ClipboardJS(elem, {
    text: () => value
  });
  clipboard.on('success', function(e) {
    message.success("复制成功！");
    e.clearSelection();
  });

  clipboard.on('error', function(e) {
    message.error("复制失败！")
    e.clearSelection();
  });
};

export default defineComponent({
  render() {
    return (
        <Input.Group compact>
          <Input v-model:value={copyVal} class="!w-200px"></Input>
          <Button class="copy" onClick={() => textCopy(copyVal,'.copy')} icon={<div class='i-bx-copy-alt m-x-auto'></div>} />
        </Input.Group>
    );
  }
});