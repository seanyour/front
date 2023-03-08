import { defineComponent } from "vue";
import Tinymce from "components/Tinymce/Tinymce";
import { nanoid } from "nanoid";
import { $ref } from "vue/macros";

export default defineComponent({
  setup() {

    const tinymceId = $ref(`tinymce${nanoid()}`);
    const content = $ref("");
    const code = $ref("");

    return () => (
      <>
        <Tinymce v-model={content} id={tinymceId}></Tinymce>
        {content}
      </>
    );
  }
});