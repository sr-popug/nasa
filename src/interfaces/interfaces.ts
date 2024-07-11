export interface imageOfDay {
	copyright?: string
	date: string
	explanation: string
	hdurl: string
	media_type: string
	service_version: string
	title: string
	url: string
}
export interface category {
	id: string
	title: string
}
export interface sources {
	id: string
	url: string
}
export interface geometry {
	magnitudeValue: null
	magnitudeUnit: null
	date: string
	type: string
	coordinates: number[] | string[]
}
export interface phenomenon {
	id: string
	title: string
	description: string | null
	link: string
	closed: string | null
	categories: category[]
	sources: sources[]
	geometry: geometry[]
}
export interface camera {
	id: number
	rover_id: number
	name: string
	full_name: string
}
export interface rover {
	id: number
	name: string
	landing_date: string
	launch_date: string
	status: string
	max_sol: number
	total_photos: number
	max_date: number
	cameras: cameras[]
}
export interface cameras {
	name: string
	full_name: string
}
export interface imagesMars {
	id: number
	sol: number
	camera: camera
	img_src: string
	earth_date: string
	rover: rover
}
export interface pageSelected {
	selected: number
}
