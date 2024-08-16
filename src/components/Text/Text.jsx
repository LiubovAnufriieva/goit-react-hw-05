import css from "./Text.module.css";

export const Text = ({ children, textAlign = '', marginBottom = '0'}) => {
    return (
        <p 
        className={[
            css['text'],
            css[textAlign],
            css[`marginBottom${marginBottom}`],
        ].join(' ')}
        >
            {children}
        </p>
    );
};