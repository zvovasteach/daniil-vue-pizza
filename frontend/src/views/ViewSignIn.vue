<template>
  <div class="sign-form">
    <router-link :to="{ name: RouteName.HOME }" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="" method="post">
      <div class="sign-form__input">
        <AppInput
          v-model="loginData.email"
          input-name="email"
          label="E-mail"
          type="email"
          placeholder="example@mail.ru"
          :error="validations.email.error"
          required
        />
      </div>

      <div class="sign-form__input">
        <AppInput
          v-model="loginData.password"
          input-name="pass"
          label="Пароль"
          type="password"
          placeholder="***********"
          :error="validations.password.error"
          required
        />
        <span v-if="errorMessage" class="text-field__error">{{ errorMessage }}</span>
      </div>
      <button
        type="submit"
        :disabled="isLoading || !loginData.email || !loginData.password || isError"
        class="button"
        @click.prevent="validateLogin"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script setup>
import AppInput from '@/common/components/AppInput.vue';
import { ref, watch } from 'vue';
import { validateFields } from '@/common/validator';
import { RouteName } from '@/common/constants';
import { useUserStore } from '@/stores/user';
const { getUserToken } = useUserStore();
import router from '@/router/index.js';

const validations = ref({
  email: {
    error: '',
    rules: ['required', 'email'],
  },
  password: {
    error: '',
    rules: ['required'],
  },
});
const loginData = ref({
  email: '',
  password: '',
},
);
const isLoading = ref(false);
const errorMessage = ref('');
const isError = ref(false);
watch(loginData, () => {
  isError.value = false;
}, { deep: true });
const validateLogin = async () => {
  if (validateFields({
    email: loginData.value.email,
    password: loginData.value.password,
  },
  {
    email: validations.value.email,
    password: validations.value.password,
  })) {
    try {
      isLoading.value = true;
      await getUserToken(loginData.value.email, loginData.value.password);
      // eslint-disable-next-line no-console
      console.log(loginData.value);
      await router.push({ name: RouteName.HOME });
    } catch (error) {
      if (error.response.status === 400) {
        isError.value = true;
        errorMessage.value = 'Логин или пароль введены неверно';
      } else {
        errorMessage.value = 'Что-то пошло не так';
      }
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_center";

//sign styles
.sign-form {
  @include m_center.pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: ds-colors.$white
  url("@/assets/img/popup.svg")
  no-repeat center top;
  box-shadow: ds-shadows.$shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

//close styles

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: ds-colors.$black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: ds-colors.$black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: ds-colors.$orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: ds-colors.$white;
    }
  }
}

//input styles

.input {
  display: block;

  span {
    @include ds-typography.r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include ds-typography.r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: ds-colors.$black;
    border: 1px solid ds-colors.$purple-400;
    border-radius: 8px;
    outline: none;
    background-color: ds-colors.$white;

    font-family: inherit;

    &:focus {
      border-color: ds-colors.$green-500;
    }
  }

  &:hover {
    input {
      border-color: ds-colors.$black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include ds-typography.b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}

//button styles

.button {
  $bl: &;

  @include ds-typography.b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: ds-colors.$white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: ds-shadows.$shadow-medium;

  background-color: ds-colors.$green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: ds-colors.$green-400;
  }

  &:active:not(:disabled) {
    background-color: ds-colors.$green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: ds-colors.$green-300;
    color: rgba(ds-colors.$white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid ds-colors.$green-500;
    color: ds-colors.$black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: ds-colors.$green-500;
      border-color: ds-colors.$green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: ds-colors.$green-600;
      border-color: ds-colors.$green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include ds-typography.b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: ds-colors.$black;

    &:hover:not(:active):not(:disabled) {
      color: ds-colors.$red-800;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: ds-colors.$red-900;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.25;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("@/assets/img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: ds-colors.$white;
    color: ds-colors.$green-500;
  }
}
.text-field__error {
  color: red;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  position: absolute;
  width: 230px;
}

</style>
