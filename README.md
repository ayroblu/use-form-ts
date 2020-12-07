# useForm TypeScript Hook

This is a lightweight form style for someone who would normally do it all themselves but with some helping types.

## Getting Started

Use the hook to get started, we'll use `useState` for the state management in this example

```typescript
const [formState, setFormState] = React.useState({
  firstname: "",
  lastname: "",
});
const form = useForm({
  values: state.formState,
  onChange: (value) => setFormState({ ...state, ...value }),
});
```

Form has two methods, one is `validate`, and the other is `createFormItem`.

### Validate

We use `validate` in the submit handler typically

```typescript
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (form.validate()) {
    // Perform some action here
  }
};
```

### createFormItem

We use `createFormItem` for defining the variables that go in to our component.

```typescript
{
  form.createFormItem("firstname", {
    adaptor: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
    meta: {
      label: "First Name",
    },
    required: true,
  })(({ errorText, meta: { label }, ...props }) => (
    <InputField label={label} {...props} errorText={errorText || ""} />
  ));
}
```

`adaptor` is a conversion if necessary for the callbacks, as typically input elements will return you an event and not the actual value that changed.

`meta` is a convenience pass through object, the purpose is that it allows you to define reusable components, which can be configured declaratively, for example yaml, that generates the form schema that then generate the code for the form.

The rest of the options in `createFormItem` are validation options.

### Validation options

- `required` is a common method for highlighting that something needs to be entered
- `validationMessages` is a object that allows overwriting the default messages for the built in validation params.
- `custom` is a handler if you want to perform your own custom validation
- `customAsync` is a handler for async custom validation
- `validation`: is an object that defines some built in validation methods, these are:
  - `whitespace` is like required but ignores whitespace as well
  - `email` checks for a valid email
  - `regex` allows checking for any regex
