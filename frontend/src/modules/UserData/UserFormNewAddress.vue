<template>
  <form action="" method="post" class="address-form address-form--opened sheet">
    <div class="address-form__header">
      <b v-if="editingAddressId">{{ userFormAddress.name }}</b>
      <b v-else>Адрес № {{ address.length + 1 }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <AppInput
          v-model="userFormAddress.name"
          :error="validations.name.error"
          input-name="addr-name"
          label="Название адреса*"
          placeholder="Введите название адреса"
          required
        />
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <AppInput
          v-model="userFormAddress.street"
          :error="validations.addressStreet.error"
          input-name="addr-street"
          label="Улица*"
          placeholder="Введите название улицы"
          required
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          v-model="userFormAddress.building"
          :error="validations.addressBuilding.error"
          input-name="addr-house"
          label="Дом*"
          placeholder="Введите номер дома"
          required
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          v-model="userFormAddress.flat"
          input-name="addr-apartment"
          label="Квартира"
          placeholder="Введите № квартиры"
        />
      </div>
      <div class="address-form__input">
        <AppInput
          v-model="userFormAddress.comment"
          input-name="addr-comment"
          label="Комментарий"
          placeholder="Введите комментарий"
        />
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        v-if="showAddressForm"
        type="button"
        class="button button--transparent button--decline"
        @click="cancelAddressForm"
      >
        Отмена
      </button>
      <span v-if="isError" class="text-field__error">Используемый адрес нельзя удалить</span>
      <button
        v-if="editingAddressId"
        type="button"
        class="button button--transparent"
        @click="deleteUserAddress()"
      >
        Удалить
      </button>
      <button
        type="submit"
        class="button"
        @click.prevent="$emit('sendUserFormAddress')"
      >
        Сохранить
      </button>
    </div>
  </form>
</template>

<script setup>
import AppInput from '@/common/components/AppInput.vue';
import { loginApi } from '@/api/user-api.js';
import { useUserStore } from '@/stores/user.js';
import { useOrdersStore } from '@/stores/orders.js';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const { editingAddressId, address } = storeToRefs(useUserStore());
const { orders } = storeToRefs(useOrdersStore());
const { getAddressInfo } = useUserStore();

const userFormAddress = defineModel('userFormAddress', { type: Object });
const showAddressForm = defineModel('showAddressForm', { type: Boolean });
defineEmits(['sendUserFormAddress']);
defineProps({
  validations: {
    type: Object,
    required: true,
  },
});
const cancelAddressForm = () => {
  showAddressForm.value = false;
  userFormAddress.value.name = '';
  userFormAddress.value.street = '';
  userFormAddress.value.building = '';
  userFormAddress.value.flat = '';
  userFormAddress.value.comment = '';
  editingAddressId.value = '';
};
const isError = ref(false);
const deleteUserAddress = async () => {
  isError.value = false;
  const isAddressActive = orders.value.find((order) =>
    order.addressId === editingAddressId.value);
  if (!isAddressActive) {
    userFormAddress.value.name = '';
    userFormAddress.value.street = '';
    userFormAddress.value.building = '';
    userFormAddress.value.flat = '';
    userFormAddress.value.comment = '';
    await loginApi.deleteAddress(editingAddressId.value);
    await getAddressInfo();
    showAddressForm.value = false;
    editingAddressId.value = '';
  } else {
    isError.value = true;
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.text-field__error {
  color: red;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  margin-top: 20px;
  width: 230px;
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
.button--decline {
  background-color: grey;
}
</style>
