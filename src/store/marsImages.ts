import { makeAutoObservable } from 'mobx'
import { imagesMars } from '../interfaces/interfaces'

class marsImagesStore {
	private marsImages: imagesMars[] = []
	constructor() {
		makeAutoObservable(this)
	}

	setMarsImages(marsImages: imagesMars[]) {
		this.marsImages = marsImages
	}

	getMarsImages() {
		return this.marsImages
	}
}

export default new marsImagesStore()
