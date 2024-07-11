import { makeAutoObservable } from 'mobx'
import { imageOfDay } from '../interfaces/interfaces'

class imagesDayStore {
	private imagesDay: imageOfDay[] | [] = []
	constructor() {
		makeAutoObservable(this)
	}

	setImagesDay(imagesDay: imageOfDay[]) {
		this.imagesDay = imagesDay
	}

	getImagesDay() {
		return this.imagesDay
	}
}

export default new imagesDayStore()
