import './_Section.scss'

const Section = ({ title, children }) => {
  return (
    <section className="section">
      <h2 className="section__title">{title}</h2>
      {children}
    </section>
  )
}

export default Section
