import { defineComponent, useSlots } from 'vue';
import { $ref } from 'vue/macros';
import { Button, Card, Collapse, Form, Input } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const fields: { [prop: string]: string }[] = $ref([]);
    const slots = useSlots();

    const addField = () => {
      fields.push({
        fieldName: 'username'
      });
      console.log(fields);
    };

    return () => (
      <>
        <Card>
          <Form>
            <Form.Item label="名称">
              <Input></Input>
            </Form.Item>

            <Form.Item label="描述">
              <Input></Input>
            </Form.Item>
          </Form>
          {fields.length > 0 && (
            <>
              <Collapse>
                {fields.map((item, index) => (
                  <Collapse.Panel header={<Form.Item label="字段名"><Input></Input></Form.Item>}>
                    {item.fieldName}
                  </Collapse.Panel>
                ))}
              </Collapse>
            </>
          )}

          <Button onClick={addField}>click</Button>
        </Card>
      </>
    );
  }
});
