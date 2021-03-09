<template>
  <div class="login">
    <a-card title="Login Center Admin">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="mobile" v-bind="validateInfos.mobile">
          <a-input v-model:value="modelRef.mobile" />
        </a-form-item>
        <a-form-item label="password" v-bind="validateInfos.password">
          <a-input-password
            placeholder="input password"
            v-model:value="modelRef.password"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
          <a-button
            type="primary"
            @click.prevent="onSubmit"
            @keypress.enter="onSubmit"
            >Login</a-button
          >
          <a-button style="margin-left: 10px" @click="resetFields"
            >Reset</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive, toRaw } from "vue";
import { useForm } from "@ant-design-vue/use";
import { useRouter } from "vue-router";
import { loginUser } from "../apis/login";

export default defineComponent({
  setup() {
    const router = useRouter();
    const modelRef = reactive({
      mobile: "",
      password: "",
    });
    const rulesRef = reactive({
      mobile: [
        {
          required: true,
          message: "Please input mobile",
        },
      ],
      password: [
        {
          required: true,
          message: "Please input password",
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );
    const loginSystem = async () => {
      try {
        const res = await loginUser({ ...toRaw(modelRef), loginType: 2 });
        console.log("res==>", res);
        if (res?.code === 0) {
          const _token = res.tdata.token;
          localStorage.setItem("sitetoken", _token);
          router.push("/");
        }
      } catch (error) {
        console.log("error==>", error);
      }
    };
    const onSubmit = () => {
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
          loginSystem();
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
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
