export type ControlledParams<T extends {}> = {
  values: T;
  onChange: (value: Partial<T>) => void;
};

export type LocalParams<T extends {}> = {
  initialData: T;
};

export type FormItemProps<T extends {}, K extends keyof T, M, A> = {
  name: K;
  value: T[K];
  onChange: (value: A) => void;
  onBlur: (value: A) => void;
  errorText: string | null;
  meta: M;
};

export type AdaptedFormItemProps<
  T extends {},
  K extends keyof T,
  M = undefined,
  A = undefined
> = A extends undefined
  ? FormItemProps<T, K, M, T[K]>
  : FormItemProps<T, K, M, A>;

export type ValidationTypes =
  | {
      type: "email" | "whitespace";
    }
  | {
      type: "regex";
      regex: RegExp;
    };

type ValidationParams<T extends {}, K extends keyof T, M> = {
  required?: boolean;
  validationMessages?: {
    [key in ValidationTypes["type"] | "required"]?: (
      props: ValueProps<T, K, M>
    ) => string;
  };
  custom?: (val: T[K]) => string;
  customAsync?: {
    validator: (val: T[K]) => Promise<string>;
    handleLoading: (val: T[K]) => string;
    handleCatch: (err: Error) => string;
  };
  validation?: ValidationTypes;
};

export type FormItemSetupParams<
  T extends {},
  K extends keyof T,
  M,
  A
> = ValidationParams<T, K, M> & { adaptor?: (input: A) => T[K]; meta?: M };

export type ValidationParamsWithProps<T extends {}, K extends keyof T, M> = {
  props: ValueProps<T, K, M>;
} & ValidationParams<T, K, M>;

type ValueProps<T extends {}, K extends keyof T, M> = {
  name: K;
  value: T[K];
  meta: M;
};
