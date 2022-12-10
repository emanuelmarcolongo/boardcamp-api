import joi from "joi";

export const customerModel = joi.object({
  name: joi.string().min(3).required(),
  phone: joi
    .string()
    .pattern(new RegExp("^[0-9]*$"))
    .min(10)
    .max(11)
    .required(),
  cpf: joi.string().length(11).pattern(new RegExp("^[0-9]*$")).required(),
  birthday: joi.required(),
});
