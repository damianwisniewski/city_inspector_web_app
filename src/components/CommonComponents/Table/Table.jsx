import React, { Component } from 'react'

// SCSS
import './Table.scss'

class Table extends Component {
	static Header = ({ children, ...props }) => (
		<thead className='table__header' {...props}>
			{children}
		</thead>
	)

	static Body = ({ children, ...props }) => (
		<tbody className='table__body' {...props}>
			{children}
		</tbody>
	)

	static Row = ({ children, ...props }) => (
		<tr className='table__row' {...props}>
			{children}
		</tr>
	)

	static Cell = ({ section, name, children, ...props }) =>
		section === 'header' ? (
			<th className='table__cell' {...props}>
				{children}
			</th>
		) : (
			<td className='table__cell' data-name={name} {...props}>
				{children}
			</td>
		)

	render() {
		const { children, noWrap = false, scrollable = false } = this.props

		return (
			<div className='table-wrapper'>
				<table
					className={
						'table' + (noWrap ? ' table--no-wrap' : '') + (scrollable ? ' table--scrollable' : '')
					}
				>
					{children}
				</table>
			</div>
		)
	}
}

export default Table
