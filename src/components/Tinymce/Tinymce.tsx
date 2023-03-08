import { defineComponent, onMounted, onUnmounted } from "vue";
import tinymce, { type RawEditorOptions } from "tinymce";
import "./plugins";
import { pluginsOptions, toolbarOptions } from "./options";
import { message, Modal } from "ant-design-vue";
import { $ref } from "vue/macros";
import Monaco from "components/Monaco/Monaco";


export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: String,
      default: pluginsOptions
    },
    toolbar: {
      type: [String, Boolean],
      default: toolbarOptions
    },
    width: {
      type: [String, Number],
      default: "auto"
    },
    height: {
      type: [String, Number],
      default: "auto"
    }
  },

  setup(props, { emit }) {

    const init: RawEditorOptions = {
      selector: `#${props.id}`,
      language_url: "tinymce/langs/zh-Hans.js",
      language: "zh-Hans",
      skin_url: "tinymce/skins/ui/oxide",
      content_css: "tinymce/skins/content/default/content.min.css",
      emoticons_database_url: "tinymce/plugins/emoticons/js/emojis.min.js",
      promotion: false, // 去掉upgrade
      branding: false, // 去掉tinymce
      plugins: props.plugins,
      toolbar: props.toolbar,
      width: props.width,
      height: props.height,
      init_instance_callback: (editor: any) => {
        editor.on("input", () => {
          emit("update:modelValue", tinymce.get(props.id)?.getContent());
        });

        editor.on("ExecCommand", () => {
          emit("update:modelValue", tinymce.get(props.id)?.getContent());
        });
      },
      setup: (editor: any) => {
        editor.ui.registry.addIcon("icode", "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 256 256\"><path fill=\"#888888\" d=\"M216 88a7.7 7.7 0 0 0-2.4-5.7l-55.9-56A8.1 8.1 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88Zm-56-36.7L188.7 80H160ZM200 216H56V40h88v48a8 8 0 0 0 8 8h48v120Zm-22.3-69.7a8.1 8.1 0 0 1 0 11.4l-24 24a8.5 8.5 0 0 1-5.7 2.3a8.3 8.3 0 0 1-5.7-2.3a8.1 8.1 0 0 1 0-11.4l18.4-18.3l-18.4-18.3a8.1 8.1 0 0 1 11.4-11.4Zm-64-12.6L95.3 152l18.4 18.3a8.1 8.1 0 0 1 0 11.4a8.5 8.5 0 0 1-5.7 2.3a8.3 8.3 0 0 1-5.7-2.3l-24-24a8.1 8.1 0 0 1 0-11.4l24-24a8.1 8.1 0 0 1 11.4 11.4Z\"/></svg>");

        editor.ui.registry.addButton("insertCode", {
          text: "insert",
          onAction: function() {
            visible = true;
          }
        });
      }
    };

    let visible = $ref(false);
    let code = $ref("");

    function insertCode(){
      if (code === ""){
        return message.warning("请输入要插入的代码");
      }

      tinymce.get(props.id)?.insertContent(code);
      visible = false;
      code = "";
    }

    onMounted(() => {
      tinymce.init(init);
    });

    onUnmounted(() => {
      tinymce.get(props.id)?.destroy();
    });

    return () => (
      <>
        <textarea id={props.id}></textarea>
        <Modal v-model:visible={visible} title="insert code" width="50%" onOk={insertCode}>
          <Monaco v-model={code} class="h-400px"/>
        </Modal>
      </>
    );
  }
});