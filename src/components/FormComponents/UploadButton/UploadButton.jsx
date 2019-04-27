import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './UploadButton.scss'
import Loader from '../../CommonComponents/Loader/Loader'
import Status from '../../CommonComponents/Status/Status'

class UploadButton extends Component {
	state = {
		onDropArea: false,
		loading: true,
		loaded: false,
		isDragAndDrop: true,
		isFileApi: true,
		files: [],
		error: '',
	}

	componentDidMount() {
		const div = document.createElement('div')

		this.setState({
			isDragAndDrop: 'draggable' in div || ('ondragstart' in div && 'ondrop' in div),
			isFileApi: 'FormData' in window && 'FileReader' in window,
		})
	}

	initImageLoaders = files => {
		const { accept } = this.props.accept

		console.log(this.props)
		console.log(accept)
		const imageLoaders = []

		for (let i = 0; i < files.length; i++) {
			const file = files[i]

			if (file.type.startsWith(this.props.accept)) {
				console.log(file.type.startsWith(this.props.accept))
				imageLoaders.push(
					new Promise((resolve, reject) => {
						const reader = new FileReader()

						reader.addEventListener('load', event => {
							resolve(<img src={event.target.result} alt={file.name} />)
						})

						reader.addEventListener('error', () => {
							reject('Przepraszamy wystąpił błąd!')
						})

						reader.readAsDataURL(file)
					}),
				)
			} else {
				imageLoaders.push(Promise.reject('Wybrano niepoprawny plik!'))
			}
		}

		return imageLoaders
	}

	getFiles = e => {
		const files = e.target.files
		const imageLoaders = this.initImageLoaders(files)

		Promise.all(imageLoaders)
			.then(images => {
				this.setState({
					loading: false,
					loaded: true,
					error: '',
					files: images,
				})

				if (this.props.onAddImages) {
					this.props.onAddImages(images)
				}
			})
			.catch(errorMessage => {
				this.setState({
					error: errorMessage,
					loading: false,
					loaded: false,
				})
			})
	}

	outOfDropArea = () => {
		this.setState({ onDropArea: false })
	}

	inDropArea = () => {
		this.setState({ onDropArea: true })
	}

	handleOnChange = e => {
		this.setState({
			onDropArea: false,
			loading: true,
			loaded: false,
		})

		this.getFiles(e)
	}

	render() {
		const { id, children } = this.props
		const { onDropArea, loaded, loading, files, error } = this.state

		return (
			<div className='input-wrapper input-wrapper--upload'>
				<input
					onDrop={this.outOfDropArea}
					onDragEnter={this.inDropArea}
					onDragLeave={this.outOfDropArea}
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
					{children}
					<p className='input-wrapper__upload-instruction'>Kliknij w pole lub przeciągnij plik</p>
					<div className='input-wrapper__upload-status'>
						{error && <Status type='error' message={this.state.error} />}
						{loading && <Loader id={`${id}-loader`} size='small' />}
						{loaded && (
							<p>
								{`Załadowano ${files.length} `}
								{files.length === 1 ? 'plik' : files.length <= 4 ? 'pliki' : 'plików'}
							</p>
						)}
					</div>
				</label>
			</div>
		)
	}
}

UploadButton.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	onAddImages: PropTypes.func.isRequired,
	accept: PropTypes.string.isRequired,
}

export default UploadButton
