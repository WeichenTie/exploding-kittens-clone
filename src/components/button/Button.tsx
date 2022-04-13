
interface IButton {
    text: string;
    onClick : Function;
}


const Button = (props:IButton) => {


    return (
        <button onClick={()=>props.onClick()}>{props.text}</button>
    )
}

export default Button;

