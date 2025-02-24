import { isRef } from 'vue';
// eslint-disable-next-line @stylistic/max-len
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line @stylistic/max-len
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
// eslint-disable-next-line @stylistic/max-len
const phoneRegex = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
const rules = {
  required: {
    rule: (value) => {
      if (isRef(value)) {
        return !!value.value.trim();
      }
      return !!value?.trim();
    },
    message: 'Поле обязательно для заполнения',
  },
  email: {
    rule: (value) => {
      if (isRef(value)) {
        value = value.value;
      }
      return value
        ? emailRegex.test(String(value).toLowerCase())
        : true;
    },
    message: 'Электронная почта имеет неверный формат',
  },
  url: {
    rule: (value) => {
      if (isRef(value)) {
        value = value.value;
      }
      return value ? urlRegex.test(value) : true;
    },
    message: 'Ссылка имеет неверный формат',
  },
  phone: {
    rule: (value) => {
      if (isRef(value)) {
        value = value.value;
      }
      return value ? phoneRegex.test(value) : true;
    },
    message: 'Телефон имеет неверный формат',
  },
};
/**
 * @param { String } value
 * @param { String[] } appliedRules
 * @returns {string}
 */

const validate = (value, appliedRules) => {
  let error = '';
  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) {
      return;
    }
    const { rule, message } = rules[appliedRule];
    if (!rule(value)) {
      error = message;
    }
  });
  return error;
};

export const validateFields = (fields, validations) => {
  let isValid = true;
  Object.keys(validations).forEach((key) => {
    validations[key].error = validate(
      fields[key],
      validations[key].rules,
    );
    if (validations[key].error) {
      isValid = false;
    }
  });
  return isValid;
};

export const clearValidationErrors = (validations) => {
// eslint-disable-next-line no-console
  console.log('validate');
  if (!validations) {
    return;
  }
  Object.keys(validations).forEach((key) => {
    validations[key].error = '';
  });
};
