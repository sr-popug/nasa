import { makeAutoObservable } from 'mobx'
import { phenomenon } from '../interfaces/interfaces'

class naturalPhenomenonsStore {
	private naturalPhenomenons: phenomenon[] = []
	constructor() {
		makeAutoObservable(this)
	}

	setNaturalPhenomenons(naturalPhenomenons: phenomenon[]) {
		this.naturalPhenomenons = naturalPhenomenons
	}

	getNaturalPhenomenons() {
		return this.naturalPhenomenons
	}
}

export default new naturalPhenomenonsStore()
