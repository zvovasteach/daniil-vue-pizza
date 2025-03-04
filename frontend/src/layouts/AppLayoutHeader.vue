<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: RouteName.HOME}" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: RouteName.CART}">
        {{ totalOrderPrice }} ₽
      </router-link>
    </div>
    <div class="header__user">
      <router-link :to="{ name: RouteName.SIGN_IN}" class="header__login"><span>Войти</span></router-link>
    </div>
  </header>
</template>

<script setup>
import { RouteName } from '@/common/constants';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
const { totalOrderPrice } = storeToRefs(useCartStore());
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/ds-system/ds-typography";

.header {
  position: relative;
  z-index: 2;

  display: flex;

  padding: 0 2.12%;

  background-color: ds-colors.$green-500;
  box-shadow: ds-shadows.$shadow-light;
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include ds-typography.b-s16-h19;

    display: block;

    padding-top: 21px;
    padding-right: 15px;
    padding-bottom: 21px;
    padding-left: 58px;

    transition: 0.3s;

    color: ds-colors.$white;
    background-color: ds-colors.$green-500;
    background-image: url("src/assets/img/cart.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: ds-colors.$green-400;
    }

    &:active {
      background-color: ds-colors.$green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: block;

    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;

    transition: 0.3s;

    background-color: ds-colors.$green-500;

    &:hover:not(:active) {
      background-color: ds-colors.$green-400;
    }

    &:active {
      background-color: ds-colors.$green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }

  span {
    @include ds-typography.r-s14-h16;

    display: inline-block;

    vertical-align: middle;

    color: ds-colors.$white;
  }
}

.header__logout {
  &::before {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: '';
    vertical-align: middle;

    background: url(src/assets/img/login.svg) no-repeat center;
    background-size: auto 50%;
  }
}

.header__login {
  &::after {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-left: 8px;

    content: '';
    vertical-align: middle;

    background: url(src/assets/img/login.svg) no-repeat center;
    background-size: auto 50%;
  }
}

</style>
