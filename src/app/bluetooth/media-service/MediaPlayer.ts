import {PlayerState} from "../service/PlayerState";

const util: any = require('util');

export class MediaPlayer {

    private _interface: any;

    constructor(_interface) {
        this._interface = _interface;
    }

    Play(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._interface.Play((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    Pause(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._interface.Pause((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    Stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._interface.Stop((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    Next(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._interface.Next((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    Previous(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._interface.Previous((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    FastForward(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._interface.FastForward((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    Rewind(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._interface.Rewind((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }


    /* Property functions */

    getProperties(): Promise<PlayerState> {
        return new Promise((resolve, reject) => {
            this._interface.getProperties((err, props) => {
                if (err) return reject(err);
                resolve(props);
            });
        });
    }

    getProperty<K extends keyof PlayerState>(name: K): Promise<PlayerState[K]> {
        return new Promise((resolve, reject) => {
            this._interface.getProperty(name, (err, val) => {
                if (err) return reject(err);
                resolve(val);
            });
        });
    }

    setProperty<K extends keyof PlayerState, V extends PlayerState[K]>(name: K, value: V): Promise<void> {
        return new Promise((resolve, reject) => {
            this._interface.setProperty(name, value, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }


    /* Read-only properties */

    Browsable(): Promise<PlayerState["Browsable"]> {
        return this.getProperty('Browsable');
    }

    Device(): Promise<PlayerState["Device"]> {
        return this.getProperty('Device');
    }

    Name(): Promise<PlayerState["Name"]> {
        return this.getProperty('Name');
    }

    Playlist(): Promise<PlayerState["Playlist"]> {
        return this.getProperty('Playlist');
    }

    Position(): Promise<PlayerState["Position"]> {
        return this.getProperty('Position');
    }

    Searchable(): Promise<PlayerState["Searchable"]> {
        return this.getProperty('Searchable');
    }

    Status(): Promise<PlayerState["Status"]> {
        return this.getProperty('Status');
    }

    Subtype(): Promise<PlayerState["Subtype"]> {
        return this.getProperty('Subtype');
    }

    Track(): Promise<PlayerState["Track"]> {
        return this.getProperty('Track');
    }

    Type(): Promise<PlayerState["Type"]> {
        return this.getProperty('Type');
    }


    /* Read-write properties */

    Equalizer(value) {
        if (value !== undefined) return this.setProperty('Equalizer', value);
        return this.getProperty('Equalizer');
    }

    Repeat(value) {
        if (value !== undefined) return this.setProperty('Repeat', value);
        return this.getProperty('Repeat');
    }

    Scan(value) {
        if (value !== undefined) return this.setProperty('Scan', value);
        return this.getProperty('Scan');
    }

    Shuffle(value) {
        if (value !== undefined) return this.setProperty('Shuffle', value);
        return this.getProperty('Shuffle');
    }
}
