import { glob } from "../helpers"

export class Store extends EventTarget {
    localStorageKey: string
    wave: { sound: boolean }
    getSoundState: () => boolean
    
	constructor(localStorageKey: any) {
		super();
		this.localStorageKey = localStorageKey
        this.wave = { sound: true }
		this._readStorage()
		// handle store events in another window
		glob.window.addEventListener(
			"storage",
			() => {
				this._readStorage()
				this._save()
			},
			false
		)
		// GETTER methods
		this.getSoundState = () => this.wave.sound
	}
	_readStorage() {
		this.wave = JSON.parse(glob.window.localStorage.getItem(this.localStorageKey) || JSON.stringify(this.wave))
	}
	_save() { 
		glob.window.localStorage.setItem(
			this.localStorageKey,
			JSON.stringify(this.wave)
		)
	}
	// MUTATE methods
    update(soundState: boolean) {
		this.wave = {
			sound: soundState,
		}
		this._save()
	}
};