import {Track} from "./Track";

export interface PlayerState {
    Equalizer: "on" | "off";
    Repeat: "off" | "singletrack" | "alltracks" | "group";
    Shuffle: "off" | "alltracks" | "group";
    Scan: "off" | "alltracks" | "group";
    Status: "playing" | "stopped" | "paused" | "forward-seek" | "reverse-seek" | "error";
    Position: number;
    Track: Track;
    Device: string;
    Name: string;
    Type: "Audio" | "Video" | "Audio Broadcasting" | "Video Broadcasting";
    Subtype: "Audio Book" | "Podcast";
    Browsable: boolean;
    Searchable: boolean;
    Playlist: string;
}
