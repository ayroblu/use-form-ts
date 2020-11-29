import { ValidationTypes } from "use-form-ts";
import { checkUnreachable } from "./utils";

// Consider using async-validator
// https://github.com/yiminghe/async-validator/blob/master/src/rule/type.js
const pattern = {
  // http://emailregex.com/
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export function validator(validationTypes: ValidationTypes, val: string) {
  if (!validationTypes.type) return;
  switch (validationTypes.type) {
    case "email":
      return pattern.email.test(val) ? "Not a valid email" : undefined;
    case "regex":
      return validationTypes.regex.test(val) ? "Unexpected layout" : undefined;
    case "whitespace":
      return val.trim().length ? "Not valid content" : undefined;
    default:
      checkUnreachable(validationTypes.type);
  }
  return;
}
