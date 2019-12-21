import React from 'react'
import PropTypes from 'prop-types'

import './NotificationDataRow.scss'
import { Textarea, Select, Input } from '../../FormComponents'

const NotificationDataRow = ({
	label,
	linear,
	vertical,
	editable,
	fieldType,
	options,
	value,
	...props
}) => {
	const renderProperField = () => {
		const labelType = vertical ? 'solid' : 'inline-solid'

		switch (fieldType) {
			case 'textarea':
				return (
					<Textarea
						id={label + Date.now()}
						label={label}
						labelType={labelType}
						defaultValue={value}
						{...props}
					/>
				)
			case 'select':
				return (
					<Select
						id={label + Date.now()}
						label={label}
						labelType={labelType}
						value={value}
						{...props}
					>
						{options.map(optionItem => (
							<Select.option key={optionItem} value={optionItem}>
								{optionItem}
							</Select.option>
						))}
					</Select>
				)
			default:
				return <Input label={label} labelType={labelType} defaultValue={value} {...props} />
		}
	}

	return (
		<div
			className={`description__wrapper description__wrapper--${(vertical && 'vertical') ||
				(linear && 'linear')}`}
		>
			{editable ? (
				renderProperField()
			) : (
				<>
					<p className='description__header'>{label}</p>
					<p className='description__data'>{value}</p>
				</>
			)}
		</div>
	)
}

NotificationDataRow.defaultProps = {
	linear: true,
	vertical: false,
	editable: false,
}

NotificationDataRow.propTypes = {
	linear: PropTypes.bool,
	vertical: PropTypes.bool,
	editable: PropTypes.bool,
}

export default NotificationDataRow
