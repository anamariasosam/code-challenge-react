import './Searchbar.scss'

const Searchbar = ({ onChange }) => {
  return (
    <div className="searchbar">
      <i className="fu fu__search searchbar__icon"></i>
      <input
        type="text"
        className="searchbar__input"
        name="searchText"
        onChange={onChange}
        aria-label="Search by product name, manufacturer, SKU or keyword"
        placeholder="Search by product name, manufacturer, SKU, keyword..."
      />
    </div>
  )
}

export default Searchbar
