import { useCallback, useState } from 'react'
import './_Button.scss'

const handleOnClick = (toggle, onClickFn, toggleFn) => {
  if (toggle) {
    return onClickFn
  } else {
    return toggleFn ? toggleFn : onClickFn
  }
}

const handleToggleChange = (result, onToggleChangeCb, disabledCb) => {
  const getToggleValue = (oldToggle, value) => (value ? !oldToggle : oldToggle)

  if (result !== undefined) {
    if (result instanceof Promise) {
      disabledCb(true)
      onToggleChangeCb((oldToggle) => !oldToggle)

      // Wait until response to reflect the actual value
      result.then((value) => {
        disabledCb(false)
        onToggleChangeCb((oldToggle) => getToggleValue(oldToggle, !value))
      })
    } else {
      onToggleChangeCb((oldToggle) => getToggleValue(oldToggle, result))
    }
  } else {
    onToggleChangeCb((oldToggle) => !oldToggle)
  }
}

export const Button = ({
  onClickFn = () => {},
  type,
  icon,
  title,
  children,
  toggleFn,
  toggleIcon = true,
  initialToggle = true,
  fnArguments,
}) => {
  const [toggle, setToggle] = useState(initialToggle)
  const iconClass = toggleIcon ? `fu__${icon}--${toggle ? 'off' : 'on'}` : `fu__${icon}`
  const [disabled, setDisabled] = useState()
  const onClick = useCallback(() => {
    handleToggleChange(
      handleOnClick(toggle, onClickFn, toggleFn)(fnArguments),
      setToggle,
      setDisabled
    )
  }, [toggle, onClickFn, toggleFn, fnArguments])

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button ${type ? `button__${type}` : ''} ${icon ? 'button--icon' : ''}`}
    >
      {icon && <i className={`fu ${iconClass}`}></i>}
      {title}
      {children}
    </button>
  )
}

export const ButtonList = ({ children = [], fnArguments, initialToggle, extraClass }) => {
  return (
    <div className={`buttonList ${extraClass ?? ''}`}>
      {children.map(({ icon, title, type, onClick, toggleFn }) => {
        return (
          <Button
            key={onClick.name}
            onClickFn={onClick}
            icon={icon}
            toggleFn={toggleFn ? toggleFn : null}
            type={type}
            fnArguments={fnArguments}
            initialToggle={initialToggle}
          >
            {title}
          </Button>
        )
      })}
    </div>
  )
}
