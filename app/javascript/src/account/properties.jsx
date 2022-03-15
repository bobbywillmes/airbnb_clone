import React from 'react'

class Properties extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedRows: [4]
    }
  }

  handleRowClick(rowId, bookings) {
    // console.log(`handleRowClick(${rowId})   bookings: ${bookings.length}`)
    if (bookings.length === 0) { return }  // return early if no bookings
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
    const newExpandedRows = isRowCurrentlyExpanded ?
      currentExpandedRows.filter(id => id !== rowId) :
      currentExpandedRows.concat(rowId);
    this.setState({ expandedRows: newExpandedRows })
  }
  

  // creat a sigle property row & following rows for bookings
  renderProperty(property, index) {
    let rowClass = (index + 1) % 2 == 0 ? 'even' : 'odd'
    if(property.bookings.length === 0) {rowClass += 'NoHover'}  // only hover effect if it bas bookings
    const clickCallback = () => this.handleRowClick(property.id, property.bookings)
    let itemRows = [
      <tr onClick={clickCallback} key={"row-data" + property.id} className={rowClass}>
        <td>{property.id}</td>
        <td><a href={`/property/${property.id}`}>{property.title}</a></td>
        <td>{property.property_type}</td>
        <td>{property.city}</td>
        <td>{property.price_per_night}</td>
        <td>{property.bookings.length}</td>
      </tr>
    ]

    if (this.state.expandedRows.includes(property.id)) {
      itemRows.push(
        <tr className={rowClass} key={"row-expanded" + property.id}>
          <td className="expanded" colSpan={6}>
            <table className="bookings">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Check in</th>
                  <th>Check out</th>
                </tr>
              </thead>
              <tbody>
                {property.bookings.map((booking, index) => {
                  const rowClass = (index + 1) % 2 == 0 ? 'even' : 'odd'
                  return (
                    <tr key={booking.id} className={rowClass}>
                      <td>{booking.id}</td>
                      <td>{booking.start_date}</td>
                      <td>{booking.end_date}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </td>
        </tr>
      )
    }
    return itemRows
  }

  render() {
    let allPropertyRows = [];

    this.props.properties.forEach((property, index) => {
      const perPropertyRows = this.renderProperty(property, index)
      allPropertyRows = allPropertyRows.concat(perPropertyRows)
    })
    return (
      <table id="properties" className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Property Type</th>
            <th>City</th>
            <th>Price/Night</th>
            <th>Bookings</th>
          </tr>
        </thead>
        <tbody>
          {allPropertyRows}
        </tbody>
      </table>
    )
  }
}

export default Properties