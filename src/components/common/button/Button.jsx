import { useCallback, useState } from 'react'
import './Button.scss'

const handleOnClick = (toggle, onClickFn, toggleFn) => {
  if (toggle) {
    return onClickFn
  } else {
    return toggleFn ? toggleFn : onClickFn
  }
}

const handleToggleChange = (result, cbFn) => {
  const getToggleValue = (oldToggle, value) => (value ? !oldToggle : oldToggle)

  if (result !== undefined) {
    if (result instanceof Promise) {
      result.then((value) => {
        cbFn((oldToggle) => getToggleValue(oldToggle, value))
      })
    } else {
      cbFn((oldToggle) => getToggleValue(oldToggle, result))
    }
  } else {
    cbFn((oldToggle) => !oldToggle)
  }
}

const Button = ({ onClickFn, extraClass, icon, title, children, toggleFn, toggleIcon = true }) => {
  const [toggle, setToggle] = useState(true)
  const iconClass = toggleIcon ? `fu__${icon}--${toggle ? 'on' : 'off'}` : `fu__${icon}`

  const onClick = useCallback(() => {
    handleToggleChange(handleOnClick(toggle, onClickFn, toggleFn)(), setToggle)
  }, [toggle, onClickFn, toggleFn])

  return (
    <button
      onClick={onClick}
      className={`button ${extraClass ?? ''} ${icon ? 'button--icon' : ''}`}
    >
      {icon && <i className={`fu ${iconClass}`}></i>}
      {title}
      {children}
    </button>
  )
}

export default Button
