export const Routers = Object.freeze({
  LOGIN: '/login',
  FORGOT: '/forgot',
  SIGNUP: '/signUp',
  HOME: '/home',
})

export const Nested = Object.freeze({
  INDEX: '',
  CODE: 'code',
  NEWPASSWORD: 'new-password',
  VERIFY: 'verify-account',
  CONFIRM: 'confirm-account',
})

export const RoutersLink = Object.freeze({
  LOGIN: Routers.LOGIN,
  FORGOT: Routers.FORGOT,
  FORGOT_CODE: `${Routers.FORGOT}/${Nested.CODE}`,
  FORGOT_NEWPASSWORD: `${Routers.FORGOT}/${Nested.NEWPASSWORD}`,
  SIGNUP: Routers.SIGNUP,
  SIGNUP_VERIFY: `${Routers.SIGNUP}/${Nested.VERIFY}`,
  SIGNUP_CONFIRM: `${Routers.SIGNUP}/${Nested.CONFIRM}`,
  HOME: Routers.HOME,
})