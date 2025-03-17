<template>
  <li>
    <img
      :src="getPublicImage(miscItems[misc.miscId].image)"
      width="20"
      height="30"
      :alt="miscItems[misc.miscId].name"
    />
    <p>
      <span>{{ miscItems[misc.miscId].name }}</span>
      <b>{{ miscItems[misc.miscId].price }} ₽ x {{ misc.quantity }}</b>
    </p>
  </li>
</template>

<script setup>
import { getPublicImage } from '@/common/helpers';
defineProps({
  miscItems: {
    type: Object,
    required: true,
  },
  misc: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_clear-list";

//order styles

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);

  b {
    @include ds-typography.b-s14-h16;
  }

  span {
    @include ds-typography.b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include ds-typography.b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include ds-typography.b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include ds-typography.l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}

</style>
