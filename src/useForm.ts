import React from "react";

import { useIsMounted } from "./hooks";
import {
  AdaptedFormItemProps,
  ControlledParams,
  FormItemSetupParams,
  LocalParams,
  NamedValidationParams,
} from "./useFormTypes";
import { ObjectKeys } from "./utils";
import { validator } from "./validators";

/**
 * Cases: Required (localvalidation), optional, async validation, custom validation messages
 * local state, global state
 * adaptor for custom form items
 * type check everything after "name"
 *
 * Must implement:
 * - Data type passed in, initial data
 * - create a form item
 * - onBlur for focus then unfocus for "required"
 *
 * Does not support onChange with multiple params
 */
export const useForm = <T extends {}>({
  values,
  onChange,
}: ControlledParams<T>) => {
  const getIsMounted = useIsMounted();
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof T, boolean>>
  >({});
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>(
    {}
  );

  const createFormItem = <K extends keyof T, M, A = undefined>(
    key: K,
    { adaptor, meta, ...validationParams }: FormItemSetupParams<T, K, M, A> = {}
  ) => (
    formItem: (params: AdaptedFormItemProps<T, K, M, A>) => React.ReactNode
  ) => {
    const getErrorText = getErrorTextFn<T, K>({
      name: key,
      ...validationParams,
    });
    const errorText = getErrorText(values[key]);
    if (errorText instanceof Promise) {
      if (validationParams.customAsync)
        setErrors({
          ...errors,
          [key]: validationParams.customAsync.handleLoading(values[key]),
        });

      errorText
        .then(
          (errorText) =>
            getIsMounted() && setErrors({ ...errors, [key]: errorText })
        )
        .catch(
          (err) =>
            getIsMounted() &&
            validationParams.customAsync &&
            setErrors({
              ...errors,
              [key]: validationParams.customAsync.handleCatch(err),
            })
        );
    } else if (errorText !== errors[key]) {
      setErrors({ ...errors, [key]: errorText });
    }

    const onChangeHandler = (val: A extends undefined ? T[K] : A) => {
      const value = adaptor ? adaptor(val as A) : val;
      // https://stackoverflow.com/questions/60456679/assignment-of-generic-object-to-partial-type
      onChange({ [key]: value } as Pick<T, K> & Partial<T>);
      setTouched({ ...touched, [key]: true });
    };
    // This function is not very typesafe, but necessary due to the adapter generic!
    return formItem({
      name: key,
      value: values[key],
      onChange: onChangeHandler,
      onBlur: onChangeHandler,
      errorText: (touched[key] && errors[key]) || null,
      meta,
    } as AdaptedFormItemProps<T, K, M, A>);
  };
  const validate = () => {
    const allTouched = ObjectKeys(values).reduce<
      Partial<Record<keyof T, boolean>>
    >((a, n) => {
      a[n] = true;
      return a;
    }, {});
    setTouched(allTouched);
    return !Object.values(errors).filter((value) => value).length;
  };
  return {
    createFormItem,
    validate,
  };
};

const getErrorTextFn = <T extends {}, K extends keyof T>({
  name,
  required,
  validationMessages,
  custom,
  customAsync,
  ...typeParams
}: NamedValidationParams<T, K>) => (value: T[K]) => {
  if (required && !value) {
    return validationMessages?.required?.(name) ?? `field is required`;
  } else {
    if (typeof value === "string") {
      const result = validator(typeParams, value);
      if (result) return result;
    }
    if (custom) {
      const result = custom(value);
      if (result) return result;
    }
    if (customAsync) return customAsync.validator(value);
  }
  return null;
};

export const useLocalForm = <T>({ initialData }: LocalParams<T>) => {
  const [formState, setFormState] = React.useState(initialData);
  return {
    ...useForm({
      values: formState,
      onChange: (val) => setFormState({ ...formState, ...val }),
    }),
    getValues: () => formState,
  };
};
