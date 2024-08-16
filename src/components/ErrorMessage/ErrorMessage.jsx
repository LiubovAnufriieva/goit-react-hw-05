import css from "./ErrorMessage.module.css"

const ErrorMassage = ({message}) => {
    return (
        <p className={css.error}>{message}</p>
    )
}
export default ErrorMassage;