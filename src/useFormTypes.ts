export type ControlledParams<T extends {}> = {
  values: T;
  onChange: (value: Partial<T>) => void;
};

export type LocalParams<T extends {}> = {
  initialData: T;
};

type FormItemPropsAdaptedAsync<T extends {}, K extends keyof T, M, A> = {
  name: K;
  value: T[K];
  onChange: (value: A) => void;
  onBlur: (value: A) => void;
  errorText: string | null;
  meta: M;
  isLoading: boolean;
};
type FormItemPropsAdaptedSync<T extends {}, K extends keyof T, M, A> = {
  name: K;
  value: T[K];
  onChange: (value: A) => void;
  onBlur: (value: A) => void;
  errorText: string | null;
  meta: M;
};
type FormItemPropsAsync<T extends {}, K extends keyof T, M> = {
  name: K;
  value: T[K];
  onChange: (value: T[K]) => void;
  onBlur: (value: T[K]) => void;
  errorText: string | null;
  meta: M;
  isLoading: boolean;
};
type FormItemPropsSync<T extends {}, K extends keyof T, M> = {
  name: K;
  value: T[K];
  onChange: (value: T[K]) => void;
  onBlur: (value: T[K]) => void;
  errorText: string | null;
  meta: M;
};
export type FormItemProps<T extends {}, K extends keyof T, M, A> =
  | FormItemPropsAdaptedAsync<T, K, M, A>
  | FormItemPropsAdaptedSync<T, K, M, A>
  | FormItemPropsAsync<T, K, M>
  | FormItemPropsSync<T, K, M>;

export type ValidationTypes =
  | {
      type: "email" | "whitespace";
    }
  | {
      type: "regex";
      regex: RegExp;
    };

type ValidationParamsAsync<T extends {}, K extends keyof T, M> = {
  required?: boolean;
  validationMessages?: {
    [key in ValidationTypes["type"] | "required"]?: (
      props: ValueProps<T, K, M>
    ) => string;
  };
  custom?: (val: T[K]) => string | null;
  customAsync: (val: T[K]) => Promise<string | null>;
  validation?: ValidationTypes;
};
type ValidationParamsSync<T extends {}, K extends keyof T, M> = {
  required?: boolean;
  validationMessages?: {
    [key in ValidationTypes["type"] | "required"]?: (
      props: ValueProps<T, K, M>
    ) => string;
  };
  custom?: (val: T[K]) => string | null;
  validation?: ValidationTypes;
};
export type ValidationParams<T extends {}, K extends keyof T, M> = {
  required?: boolean;
  validationMessages?: {
    [key in ValidationTypes["type"] | "required"]?: (
      props: ValueProps<T, K, M>
    ) => string;
  };
  custom?: (val: T[K]) => string | null;
  customAsync?: (val: T[K]) => Promise<string | null>;
  validation?: ValidationTypes;
};

type FormItemSetupParamsAdaptedAsync<
  T extends {},
  K extends keyof T,
  M,
  A
> = ValidationParamsAsync<T, K, M> & { adaptor: (input: A) => T[K]; meta?: M };
type FormItemSetupParamsNoAdaptorAsync<
  T extends {},
  K extends keyof T,
  M
> = ValidationParamsAsync<T, K, M> & { meta?: M };
type FormItemSetupParamsAdaptedSync<
  T extends {},
  K extends keyof T,
  M,
  A
> = ValidationParamsSync<T, K, M> & { adaptor: (input: A) => T[K]; meta?: M };
type FormItemSetupParamsNoAdaptorSync<
  T extends {},
  K extends keyof T,
  M
> = ValidationParamsSync<T, K, M> & { meta?: M };
export type FormItemSetupParams<
  T extends {},
  K extends keyof T,
  M,
  A
> = ValidationParams<T, K, M> & {
  adaptor?: (input: A) => T[K];
  meta?: M;
};

export type ValidationParamsWithProps<T extends {}, K extends keyof T, M> = {
  props: ValueProps<T, K, M>;
} & ValidationParams<T, K, M>;

type ValueProps<T extends {}, K extends keyof T, M> = {
  name: K;
  value: T[K];
  meta: M;
};

export type CreateFormItem<T extends {}> = {
  <K extends keyof T, M, A>(
    key: K,
    params: FormItemSetupParamsAdaptedAsync<T, K, M, A>
  ): (
    formItem: (params: FormItemPropsAdaptedAsync<T, K, M, A>) => React.ReactNode
  ) => React.ReactNode;
  <K extends keyof T, M>(
    key: K,
    params: FormItemSetupParamsNoAdaptorAsync<T, K, M>
  ): (
    formItem: (params: FormItemPropsAsync<T, K, M>) => React.ReactNode
  ) => React.ReactNode;
  <K extends keyof T, M, A>(
    key: K,
    params: FormItemSetupParamsAdaptedSync<T, K, M, A>
  ): (
    formItem: (params: FormItemPropsAdaptedSync<T, K, M, A>) => React.ReactNode
  ) => React.ReactNode;
  <K extends keyof T, M>(
    key: K,
    params: FormItemSetupParamsNoAdaptorSync<T, K, M>
  ): (
    formItem: (params: FormItemPropsSync<T, K, M>) => React.ReactNode
  ) => React.ReactNode;
};
