import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerState} from "../service/PlayerState";
import {BluetoothMediaService} from "../media-service/bluetooth-media.service";
import {MediaPlayer} from "../media-service/MediaPlayer";
import {BluetoothService} from "../service/bluetooth.service";

@Component({
    selector: 'app-bluetooth-player',
    templateUrl: './bluetooth-player.component.html',
    styleUrls: ['./bluetooth-player.component.scss']
})
export class BluetoothPlayerComponent implements OnInit, OnDestroy {

    public state: PlayerState = {
        Equalizer: "off",
        Repeat: "off",
        Shuffle: "off",
        Scan: "off",
        Status: "playing",
        Position: 500,
        Track: {
            Title: 'Title',
            Artist: 'Artist',
            Album: 'Album',
            Genre: 'Genre',
            NumberOfTracks: 0,
            TrackNumber: 0,
            Duration: 1000
        },
        Device: '/org/bluez/dev_BLABLABLA',
        Name: 'Player',
        Type: "Audio",
        Subtype: "Audio Book",
        Browsable: true,
        Searchable: false,
        Playlist: '/org/bluez/dev_BLABLABLA/player0/NowPlaying'
    };

    private player: MediaPlayer;
    private timeoutHandle = null;

    constructor(private bt: BluetoothService, private media: BluetoothMediaService) {
    }

    async ngOnInit() {
        this.player = await this.media.createMediaPlayer(await this.bt.getConnected().Address());
        await this.update();
    }


    ngOnDestroy(): void {
        clearTimeout(this.timeoutHandle);
    }

    async update() {
        this.state = await this.player.getProperties();
        console.log('update', this.state);
        this.timeoutHandle = setTimeout(this.update.bind(this), 500);
    }

    async togglePlayPause() {
        if(this.state.Status === "playing") {
            await this.player.Pause();
        } else {
            await this.player.Play();
        }
    }

    async prev() {
        await this.player.Previous();
    }

    async next() {
        await this.player.Next();
    }
}
