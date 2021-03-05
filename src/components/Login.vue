<template>
  <div class="login">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Username" v-bind="validateInfos.username">
        <a-input v-model:value="modelRef.username" />
      </a-form-item>
      <a-form-item label="Activity zone" v-bind="validateInfos.region">
        <a-select
          v-model:value="modelRef.region"
          placeholder="please select your zone"
        >
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click.prevent="onSubmit">Login</a-button>
        <a-button style="margin-left: 10px" @click="resetFields"
          >Reset</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRaw } from "vue";
import { useForm } from "@ant-design-vue/use";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const modelRef = reactive({
      username: "",
      region: undefined,
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: "Please input name",
        },
      ],
      region: [
        {
          required: true,
          message: "Please select region",
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );
    const onSubmit = () => {
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
          console.log("--> ", router);

          router.push("/");
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
    };
  },
});
</script>

<style>
.login {
  width: 50vw;
  margin: auto;
  margin-top: 12%;
  border: 1px solid lightblue;
}
</style>
