import { useCallback, useState } from 'react'
import './_Button.scss'

const handleOnClick = (toggle, onClickFn, toggleFn, toggleInitialValue) => {
  if (toggle && toggleInitialValue) {
    return toggleFn ? toggleFn : onClickFn
  } else {
    return onClickFn
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
  toggleInitialValue = false,
  fnArguments,
}) => {
  const [toggle, setToggle] = useState(toggleInitialValue)
  const iconClass = toggleIcon ? `fu__${icon}--${toggle ? 'on' : 'off'}` : `fu__${icon}`

  const onClick = useCallback(() => {
    setToggle((oldToggle) => !oldToggle)
    handleOnClick(toggle, onClickFn, toggleFn, toggleInitialValue)(fnArguments)
  }, [toggle, onClickFn, toggleFn, fnArguments, toggleInitialValue])

  return (
    <button
      onClick={onClick}
      className={`button ${type ? `button__${type}` : ''} ${icon ? 'button--icon' : ''}`}
    >
      <div className="button__icons">
        {icon && <i className={`fu ${iconClass}`}></i>}
        {children}
      </div>
      {title}
    </button>
  )
}

export const ButtonList = ({ children = [], fnArguments, toggleInitialValue, extraClass }) => {
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
            toggleInitialValue={toggleInitialValue}
          >
            {title}
          </Button>
        )
      })}
    </div>
  )
}
