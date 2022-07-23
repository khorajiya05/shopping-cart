import { useField } from "formik";

type PropsType = {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  name: string;
};

function CheckOutFormField({ label, placeholder, ...props }: PropsType) {
  const [field, meta] = useField({ ...props });
  const isTouched: boolean = meta.touched;
  return (
    <>
      <label className="form-label text-sm text-uppercase" htmlFor={props.id}>
        {label}
      </label>
      <input
        style={isTouched && meta.error ? { border: "1px solid red" } : {}}
        className="form-control form-control-lg"
        {...field}
        {...meta}
        placeholder={placeholder}
      />
      {isTouched && meta.error !== "Required" ? (
        <div className="error text-danger small">{meta.error}</div>
      ) : null}
    </>
  );
}

export default CheckOutFormField;
