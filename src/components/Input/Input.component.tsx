import './Input.styles.css';
type Props={
    placeholder: string,
    type: string
}
function InputComponent({placeholder,type}: Props) {
    return (
        <input className="input_box" type={type} placeholder={placeholder} />
    );
}
export default InputComponent;