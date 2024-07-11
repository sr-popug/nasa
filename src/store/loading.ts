import { makeAutoObservable } from 'mobx'

class loadingStore {
	private loading = true
	constructor() {
		makeAutoObservable(this)
	}

	setLoading() {
		this.loading = !this.loading
	}

	getLoading() {
		return this.loading
	}
}

export default new loadingStore()
