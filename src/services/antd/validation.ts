import { Rule } from 'antd/es/form';

export const emailRule: Rule = {
  type: 'email',
  message: 'The input is not valid E-mail!',
};

export const requiredRule: Rule = {
  required: true,
  message: 'Please input you value!',
};
