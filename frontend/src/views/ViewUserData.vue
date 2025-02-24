<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>
      <UserInfo />

      <div class="layout__address">
        <UserAvailableAddress
          v-for="address in userAddress"
          :key="address.id"
          :user-address="address"
        />
      </div>

      <div class="layout__address">
        <UserFormNewAddress
          v-model="userFormAddress"
          :validations="validations"
          :address-number="userAddress.length"
          @send-user-form-address="validateUserForm"
        />
      </div>

      <div class="layout__button">
        <button type="button" class="button button--border">Добавить новый адрес</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import UserInfo from '@/modules/UserData/UserInfo.vue';
import UserAvailableAddress from '@/modules/UserData/UserAvailableAddress.vue';
import UserFormNewAddress from '@/modules/UserData/UserFormNewAddress.vue';
import { ref } from 'vue';
import { validateFields } from '@/common/validator';
const userAddress = ref([
  {
    name: 'TestName',
    userId: 'testID',
    street: 'Ulica',
    building: 'Dom',
    flat: 'Kvartira',
    comment: 'Comments',
  },
]);
const userFormAddress = ref({
  name: '',
  userId: 'testID',
  street: '',
  building: '',
  flat: '',
  comment: '',
},
);
const validations = ref({
  addressBuilding: {
    error: '',
    rules: ['required'],
  },
  addressStreet: {
    error: '',
    rules: ['required'],
  },
  name: {
    error: '',
    rules: ['required'],
  },
});
const validateUserForm = () => {
  if (validateFields({
    addressStreet: userFormAddress.value.street,
    addressBuilding: userFormAddress.value.building,
    name: userFormAddress.value.name,
  },
  {
    addressBuilding: validations.value.addressBuilding,
    addressStreet: validations.value.addressStreet,
    name: validations.value.name,
  })) {
    // eslint-disable-next-line no-console
    console.log(userFormAddress.value);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/ds-system/ds-shadows";

//layout styles
.layout__sidebar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  width: 180px;
  height: 100%;

  background-color: rgba(ds-colors.$green-500, 0.05);
}

.layout__logo {
  display: block;

  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 10px;

  background-color: ds-colors.$green-500;

  img {
    display: block;

    margin: 0 auto;
  }
}

.layout__link {
  @include ds-typography.b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: ds-colors.$black;

  &--active {
    background-color: rgba(ds-colors.$green-500, 0.1);
  }

  &:hover {
    background-color: rgba(ds-colors.$green-500, 0.2);
  }

  &:active {
    color: rgba(ds-colors.$black, 0.5);
  }
}

.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}

.layout__title {
  margin-bottom: 27px;
}

.layout__button {
  margin-top: 40px;

  button {
    padding: 12px 23px;
  }
}

.layout__address {
  margin-top: 16px;
}

//logo styles
.logo {
  display: block;

  img {
    display: block;

    width: 90px;
    height: 40px;
  }
}

//user styles

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include ds-typography.b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include ds-typography.b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}

//address styles

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include ds-typography.l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include ds-typography.b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);
}

//icon styles

.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: ds-colors.$white;
  background-image: url("@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: ds-shadows.$shadow-light;
  }

  &:active {
    box-shadow: ds-shadows.$shadow-large;
  }

  &:focus {
    box-shadow: ds-shadows.$shadow-regular;
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

</style>
