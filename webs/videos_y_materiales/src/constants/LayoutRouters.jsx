export const Routers = Object.freeze({
  LOGIN: '/login',
  FORGOT: '/forgot',
  SIGNUP: '/signUp',
})

export const Nested = Object.freeze({
  EMAIL: 'email',
  CODE: 'code',
  NEWPASSWORD: 'new-password',
  VERIFY: 'verify-accound'
})

export const RoutersLink = Object.freeze({
  LOGIN: Routers.LOGIN,
  FORGOT: Routers.FORGOT,
  FORGOT_EMAIL: `${Routers.FORGOT}/${Nested.EMAIL}`,
  FORGOT_CODE: `${Routers.FORGOT}/${Nested.CODE}`,
  FORGOT_NEWPASSWORD: `${Routers.FORGOT}/${Nested.NEWPASSWORD}`,
  SIGNUP: Routers.SIGNUP,
  SIGNUP_VERIFY: `${Routers.SIGNUP}/${Nested.VERIFY}`,
})