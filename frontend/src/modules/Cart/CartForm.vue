<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          v-model="formData.orderType"
          name="test"
          class="select"
        >

          <option value="-1">Заберу сам</option>
          <option value="-2">Новый адрес</option>
          <option
            v-for="addressItem in address"
            :key="addressItem.id"
            :value="addressItem.id"
          >
            {{ addressItem.name }}
          </option>
        </select>
      </label>
      <label
        class="input input--big-label"
      >
        <span>Контактный телефон:</span>
        <AppInput
          v-model="formData.phone"
          :error="validations.phone.error"
          label="Контактный телефон"
          hidden
          input-name="tel"
          placeholder="+7 999-999-99-99"
          required
        />
      </label>
      <div
        v-if="formData.orderType !== orderType.BY_YOURSELF"
        class="cart-form__address"
      >
        <span
          v-if="formData.orderType === orderType.NEW_ADDRESS"
          class="cart-form__label"
        >
          Новый адрес:
        </span>
        <span
          v-else
          class="cart-form__label"
        >
          Адрес:
        </span>
        <div class="cart-form__input">
          <label class="input">
            <AppInput
              v-model="formData.address.street"
              :error="validations.addressStreet.error"
              label="Улица*"
              input-name="street"
              :disabled="formData.orderType !== orderType.NEW_ADDRESS && formData.orderType !== orderType.BY_YOURSELF"
            />
          </label>
        </div>
        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <AppInput
              v-model="formData.address.building"
              :error="validations.addressBuilding.error"
              label="Дом*"
              input-name="house"
              :disabled="formData.orderType !== orderType.NEW_ADDRESS && formData.orderType !== orderType.BY_YOURSELF"
            />
          </label>
        </div>
        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <AppInput
              v-model="formData.address.flat"
              label="Квартира"
              input-name="apartment"
              :disabled="formData.orderType !== orderType.NEW_ADDRESS && formData.orderType !== orderType.BY_YOURSELF"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppInput from '@/common/components/AppInput.vue';
import { validateFields } from '@/common/validator';
import { onBeforeMount, ref } from 'vue';
import { orderType } from '@/common/constants';
import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia';
const { address } = storeToRefs(useUserStore());
const { getAddressInfo } = useUserStore();

const formData = defineModel({ type: Object });
const validations = ref({
  addressBuilding: {
    error: '',
    rules: ['required'],
  },
  addressStreet: {
    error: '',
    rules: ['required'],
  },
  phone: {
    error: '',
    rules: ['required', 'phone'],
  },
});

const validate = () => {
  if (formData.value.orderType === orderType.NEW_ADDRESS) {
    return validateFields({
      addressStreet: formData.value.address.street,
      addressBuilding: formData.value.address.building,
      phone: formData.value.phone,
    },
    {
      addressBuilding: validations.value.addressBuilding,
      addressStreet: validations.value.addressStreet,
      phone: validations.value.phone,
    });
  } else {
    return validateFields({
      phone: formData.value.phone,
    }, {
      phone: validations.value.phone,
    });
  }
};

defineExpose({ validate });

onBeforeMount(() => {
  getAddressInfo();
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

//cart-form styles

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include ds-typography.b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
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
//select styles

.select {
  @include ds-typography.r-s16-h19;

  display: block;
  width: 150px;
  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: ds-colors.$black;
  border: 1px solid ds-colors.$purple-400;
  border-radius: 8px;
  outline: none;
  background-color: ds-colors.$silver-100;
  background-image: url("@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: ds-colors.$orange-100;
  }

  &:focus {
    border-color: ds-colors.$green-500;
  }
}
</style>
