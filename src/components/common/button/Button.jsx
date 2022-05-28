import { useCallback, useState } from 'react'
import './_Button.scss'

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

export const Button = ({
  onClickFn,
  type,
  icon,
  title,
  children,
  toggleFn,
  toggleIcon = true,
  fnArguments,
}) => {
  const [toggle, setToggle] = useState(true)
  const iconClass = toggleIcon ? `fu__${icon}--${toggle ? 'on' : 'off'}` : `fu__${icon}`

  const onClick = useCallback(() => {
    handleToggleChange(handleOnClick(toggle, onClickFn, toggleFn)(fnArguments), setToggle)
  }, [toggle, onClickFn, toggleFn, fnArguments])

  return (
    <button
      onClick={onClick}
      className={`button ${type ? `button__${type}` : ''} ${icon ? 'button--icon' : ''}`}
    >
      {icon && <i className={`fu ${iconClass}`}></i>}
      {title}
      {children}
    </button>
  )
}

export const ButtonList = ({ children = [], fnArguments, extraClass }) => {
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
          >
            {title}
          </Button>
        )
      })}
    </div>
  )
}
