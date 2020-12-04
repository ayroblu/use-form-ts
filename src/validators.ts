import { ValidationTypes } from "./useFormTypes";
import { checkUnreachable } from "./utils";

// Consider using async-validator
// https://github.com/yiminghe/async-validator/blob/master/src/rule/type.js
const pattern = {
  // http://emailregex.com/
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export function validator(validationTypes: ValidationTypes, val: string) {
  switch (validationTypes.type) {
    case "email":
      return pattern.email.test(val) ? undefined : "Not a valid email";
    case "regex":
      return validationTypes.regex.test(val) ? undefined : "Unexpected layout";
    case "whitespace":
      return val.trim().length ? undefined : "Not valid content";
    default:
      checkUnreachable(validationTypes);
  }
  return;
}
