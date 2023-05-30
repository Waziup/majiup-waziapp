import './Input.styles.css';
type Props={
    placeholder: string,
    type: string
}
function InputComponent({placeholder,type}: Props) {
    return (
        <input style={{outline: 'none',
        width: '100%',
        height: '30px',
        borderRadius: '0px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        padding: '5px'}} type={type} placeholder={placeholder} />
    );
}
export default InputComponent;