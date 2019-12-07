import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './UploadButton.scss'
import Loader from '../../CommonComponents/Loader/Loader'
import Status from '../../CommonComponents/Status/Status'

class UploadButton extends Component {
	state = {
		onDropArea: false,
		loading: false,
		loadingFromDropEvent: false,
		loaded: false,
		error: '',
	}

	initImageLoader = files => {
		const { acceptsFile } = this.props
		const imageLoaders = []

		if (!files.length) {
			// IE11 for catalog instead of file will have file equal empty array
			throw new Error('Wybrano niepoprawny plik!')
		} else {
			for (let i = 0; i < files.length; i++) {
				const file = files[i]

				if (file.type.startsWith(acceptsFile)) {
					imageLoaders.push(file)
				} else {
					throw new Error('Wybrano niepoprawny plik!')
				}
			}
		}

		return imageLoaders
	}

	getFiles = files => {
		try {
			const lodaedFiles = this.initImageLoader(files)

			this.setState({
				loading: false,
				loadingFromDropEvent: false,
				loaded: true,
				error: '',
			})

			if (this.props.onAddImages) {
				this.props.onAddImages(lodaedFiles)
			}
		} catch (err) {
			this.setState({
				error: err.message,
				loading: false,
				loaded: false,
				loadingFromDropEvent: false,
			})
		}
	}

	/**
	 * To prevent IE11 reloading page with image as content
	 */
	handleDragOver = e => {
		e.preventDefault()
		e.stopPropagation()
	}

	outOfDropArea = () => {
		this.setState({ onDropArea: false })
	}

	inDropArea = () => {
		this.setState({ onDropArea: true })
	}

	handleDrop = e => {
		const files = e.dataTransfer.files

		this.setState({
			onDropArea: false,
			loading: true,
			loadingFromDropEvent: true,
			loaded: false,
		})

		this.getFiles(files)
	}

	handleOnChange = e => {
		if (this.state.loadingFromDropEvent) return
		const files = e.target.files

		this.setState({
			onDropArea: false,
			loading: true,
			loadingFromDropEvent: true,
			loaded: false,
		})

		this.getFiles(files)
	}

	render() {
		// eslint-disable-next-line no-unused-vars
		const { id, label, onAddImages, acceptsFile, ...rest } = this.props
		const { onDropArea, loaded, loading, error } = this.state

		return (
			<div className='input-wrapper input-wrapper--upload'>
				<input
					{...rest}
					ref={input => (this.input = input)}
					accept={acceptsFile}
					onDrop={this.handleDrop}
					onDragEnter={this.inDropArea}
					onDragLeave={this.outOfDropArea}
					onDragOver={this.handleDragOver}
					onChange={this.handleOnChange}
					type='file'
					multiple
					className='input-wrapper__field'
					id={id}
				/>
				<label
					className={`input-wrapper__upload-label ${
						onDropArea ? 'input-wrapper__upload-label--active' : ''
					}`}
					htmlFor={id}
				>
					{label}
					<p className='input-wrapper__upload-instruction'>Kliknij w pole lub przeciągnij plik</p>
					<div className='input-wrapper__upload-status'>
						{error && <Status id={`${id}-status`} type='error' message={this.state.error} />}
						{loading && <Loader id={`${id}-loader`} size='small' />}
						{loaded && (
							<Status id={`${id}-status`} type='correct' message='Pomyślnie załadowano plik/i' />
						)}
					</div>
				</label>
			</div>
		)
	}
}

UploadButton.propTypes = {
	label: '',
}

UploadButton.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onAddImages: PropTypes.func.isRequired,
	acceptsFile: PropTypes.string.isRequired,
}

export default UploadButton
