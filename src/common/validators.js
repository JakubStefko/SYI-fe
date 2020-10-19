export const isValidName = (input) => /^([A-Za-z0-9\_\-\.]{3,30})$/.test(input)

export const isValidPassword = (input) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/.test(input)

export const isNotEmpty = input => !(input === '')