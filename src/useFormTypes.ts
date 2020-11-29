export type ControlledParams<T extends {}> = {
  values: T;
  onChange: (value: Partial<T>) => void;
};
export type ControlledSubParams<T extends {}> = Omit<
  ControlledParams<T>,
  "onChange"
> & {
  onChange: (value: T) => void;
};
export type LocalParams<T extends {}> = {
  initialData: T;
};
type FormItemParams<T extends {}, K extends keyof T, A> = {
  props: {
    name: K;
    value: T[K];
    onChange: (value: A) => void;
    onBlur: (value: A) => void;
  };
  errorText: string | null;
};
export type AdaptedFormItemParams<
  T extends {},
  K extends keyof T,
  A = undefined
> = A extends undefined ? FormItemParams<T, K, T[K]> : FormItemParams<T, K, A>;

export type ValidationTypes =
  | {
      type?: "email" | "whitespace";
    }
  | {
      type: "regex";
      regex: RegExp;
    };
type ValidationParams<T extends {}, K extends keyof T> = {
  required?: boolean;
  validationMessages?: {
    [key in NonNullable<ValidationTypes["type"]> | "required"]?: (
      name: K
    ) => string;
  };
  custom?: (val: T[K]) => string;
  customAsync?: {
    validator: (val: T[K]) => Promise<string>;
    handleLoading: (val: T[K]) => string;
    handleCatch: (err: Error) => string;
  };
} & ValidationTypes;
export type AdaptedValidationParams<
  T extends {},
  K extends keyof T,
  A
> = ValidationParams<T, K> & { adaptor?: (input: A) => T[K] };
export type NamedValidationParams<T extends {}, K extends keyof T> = {
  name: K;
} & ValidationParams<T, K>;
