import './button.styles.scss';
const BUTTON_TYPE_CLASSES=
{
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    warning: 'btn-warning',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark',
    link: 'btn-link',
    google:'google-sign-in',
    facebook:'facebook-sign-in',
    twitter:'twitter-sign-in',
    inverted:'inverted'
}

const Button = ({children,buttonType,...otherData}) =>
{
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherData}>{children}</button>
    )
}

export {Button};