export const BigButton = (props) => {

    return(
        <button onClick = {props.handleButtonClick} className = {"bg-" + props.color + " mt-8 w-56 p-4"}>{props.label}</button>
    );
}