const Button = (props) => {
    console.log(props);
    return (
    <button style={{color:props.color}}>{props.text}</button>
    );
};

export default Button;