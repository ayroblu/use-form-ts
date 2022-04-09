import React from "react";

import { useIsMounted } from "./hooks";
import {
  ControlledParams,
  CreateFormItem,
  FormItemProps,
  FormItemSetupParams,
  LocalParams,
  ValidationParams,
  ValidationParamsWithProps,
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
  const [errors, setErrors] = React.useState<
    { [key in keyof T]?: string | null }
  >({});
  const [loading, setLoading] = React.useState<
    Partial<Record<keyof T, boolean>>
  >({});
  const [lastSeen, setLastSeen] = React.useState<{ [K in keyof T]?: T[K] }>({});
  const lastSeenRef = React.useRef<{ [K in keyof T]?: T[K] }>({});

  const createFormItem: CreateFormItem<T> = <
    K extends keyof T,
    M,
    A = undefined
  >(
    key: K,
    { adaptor, meta, ...validationParams }: FormItemSetupParams<T, K, M, A> = {}
  ) => (formItem: (params: any) => React.ReactNode) => {
    handleErrorText<T, K, M>({
      key,
      values,
      meta: meta as M,
      validationParams,
      lastSeen,
      setLastSeen,
      lastSeenRef,
      loading,
      setLoading,
      errors,
      setErrors,
      getIsMounted,
    });

    const onChangeValue = (value: T[K]) => {
      // https://stackoverflow.com/questions/60456679/assignment-of-generic-object-to-partial-type
      onChange({ [key]: value } as Pick<T, K> & Partial<T>);
      setTouched({ ...touched, [key]: true });
    };
    const onChangeHandler = adaptor
      ? (v: A) => onChangeValue(adaptor(v))
      : ((onChangeValue as any) as (v: A) => void);
    const formItemProps: FormItemProps<T, K, M, A> = {
      name: key,
      value: values[key],
      onChange: onChangeHandler,
      onBlur: onChangeHandler,
      errorText: (touched[key] && errors[key]) ?? null,
      meta: meta as NonNullable<typeof meta>, // Slightly wrong, but not terrible :/
      ...(validationParams.customAsync
        ? {
            isLoading: !!loading[key],
          }
        : {}),
    };
    return formItem(formItemProps);
  };
  const validate = () => {
    const allTouched = ObjectKeys(values).reduce<
      Partial<Record<keyof T, boolean>>
    >((a, n) => {
      a[n] = true;
      return a;
    }, {});
    setTouched(allTouched);
    const numErrors = Object.values(errors).filter(
      (value) => typeof value === "string"
    ).length;
    const numLoading = Object.values(loading).filter((value) => value).length;
    return !numErrors && !numLoading;
  };
  return {
    createFormItem,
    validate,
  };
};

const getErrorTextFn = <T extends {}, K extends keyof T, M>({
  props,
  required,
  validationMessages,
  custom,
  customAsync,
  ...typeParams
}: ValidationParamsWithProps<T, K, M>) => (value: T[K]) => {
  if (required && !value) {
    return validationMessages?.required?.(props) ?? `field is required`;
  } else {
    if (typeof value === "string" && typeParams.validation) {
      const result = validator(typeParams.validation, value);
      if (result) return result;
    }
    if (custom) {
      const result = custom(value);
      if (result) return result;
    }
    if (customAsync) return customAsync(value);
  }
  return null;
};
type HandleErrorTextInput<T extends {}, K extends keyof T, M> = {
  key: K;
  values: T;
  meta: M;
  validationParams: ValidationParams<T, K, M>;
  getIsMounted: () => boolean;
  errors: { [key in keyof T]?: string | null };
  setErrors: (v: { [key in keyof T]?: string | null }) => void;
  loading: Partial<Record<keyof T, boolean>>;
  setLoading: (v: Partial<Record<keyof T, boolean>>) => void;
  lastSeen: { [K in keyof T]?: T[K] };
  setLastSeen: (v: { [K in keyof T]?: T[K] }) => void;
  lastSeenRef: React.MutableRefObject<{ [K in keyof T]?: T[K] }>;
};
const handleErrorText = <T extends {}, K extends keyof T, M>({
  key,
  values,
  meta,
  validationParams,
  lastSeen,
  setLastSeen,
  lastSeenRef,
  loading,
  setLoading,
  errors,
  setErrors,
  getIsMounted,
}: HandleErrorTextInput<T, K, M>) => {
  const getErrorText = getErrorTextFn<T, K, M>({
    props: {
      name: key,
      value: values[key],
      meta: meta as M,
    },
    ...validationParams,
  });
  if (lastSeen[key] !== values[key]) {
    setLastSeen({ ...lastSeen, [key]: values[key] });
    lastSeenRef.current = { ...lastSeenRef.current, [key]: values[key] };
    const errorText = getErrorText(values[key]);
    if (errorText instanceof Promise) {
      setLoading({ ...loading, [key]: true });
      setErrors({ ...errors, [key]: null });
      errorText
        .then(
          (errorText) =>
            getIsMounted() &&
            values[key] === lastSeenRef.current[key] &&
            setErrors({ ...errors, [key]: errorText })
        )
        .catch(
          (err) =>
            getIsMounted() &&
            err instanceof Error &&
            setErrors({
              ...errors,
              [key]: err.message,
            })
        )
        .then(() => {
          setLoading({ ...loading, [key]: false });
        });
    } else if (errorText !== errors[key]) {
      setErrors({ ...errors, [key]: errorText });
    }
  }
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
