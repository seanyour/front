import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import * as monaco from "monaco-editor";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (["css","scss","less"].includes(label)) {
      return new cssWorker();
    }
    if (['html', 'handlebars', 'razor'].includes(label)) {
      return new htmlWorker();
    }
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker();
    }
    return new editorWorker();
  }
};

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    language: {
      type: String,
      default: "html"
    },
    theme: {
      type: String,
      default: "vs"
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, expose }) {

    let monacoEditor: any;
    const codeContainer = ref();

    function init() {
      monacoEditor = monaco.editor.create(
        codeContainer.value,
        {
          language: props.language,
          value: props.modelValue,
          foldingImportsByDefault: true,
          foldingStrategy: "indentation", // 代码可分小段折叠
          theme: props.theme, //主题
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8
          },
          minimap: {   //是否需要缩略图
            enabled: false
          },
          autoIndent: "full", // 自动布局
          automaticLayout: false, // 自动布局
          formatOnPaste: true, //是否粘贴自动格式化
          renderValidationDecorations: "on",
          renderLineHighlight: 'none', //行亮
          overviewRulerBorder:false,
          readOnly: props.readonly
        }
      );

      monacoEditor.onDidChangeModelContent(() => {
        emit('update:modelValue',monacoEditor.getValue())
      });

      expose({
        monacoEditor
      })
    }

    onMounted(() => {
      init();
    });

    onBeforeUnmount(() => {
      monacoEditor.dispose();
    });

    return () => (
      <div ref={codeContainer} class="w-100% h-100%"></div>
    );
  }
});