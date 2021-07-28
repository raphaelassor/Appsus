export class BookFilter extends React.Component {
    state = {
        filterBy:{
            title: '',
            minPrice: '',
            maxPrice: ''
        }
    }

    handleChange=(ev)=>{
    const field = ev.target.name
    const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
    this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
      this.props.setFilter(this.state.filterBy)
    })
}

    render() {
        const {title,minPrice,maxPrice}=this.state.filterBy
        return <div className="container">
            <form className="filter-books flex">
                
                <input type="search" id="title-input-filter" name="title" value={title} onChange={this.handleChange} placeholder="Search For Books..." />
                <div className="price-filter">
                    <label htmlFor="price-input-filter">Price: </label>
                    <input type="number" placeholder="Min" id="price-input-filter" name="minPrice" value={(!minPrice)? '':minPrice }  onChange={this.handleChange} placeholder="Min." />
                    <span> - </span>
                    <input type="number" placeholder="Max" name="maxPrice" value={(!maxPrice)? '':maxPrice } onChange={this.handleChange} placeholder="Max."/>
                </div>
            </form>
        </div>
    }



}