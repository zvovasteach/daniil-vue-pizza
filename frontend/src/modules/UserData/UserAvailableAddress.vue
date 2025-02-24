<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>Адрес №1. {{ userAddress.name }}</b>
      <div class="address-form__edit">
        <button type="button" class="icon"><span class="visually-hidden">Изменить адрес</span></button>
      </div>
    </div>
    <p>
      {{ userAddress.street }}, д. {{ userAddress.building }},
      кв. {{ userAddress.flat }}
    </p>
    <small>{{ userAddress.comment }}</small>
  </div>
</template>

<script setup>
defineProps({
  userAddress: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/ds-system/ds-shadows";

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

</style>
