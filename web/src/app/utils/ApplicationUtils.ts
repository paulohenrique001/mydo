import { SongEnum } from "../interfaces/SongEnum";

export const getProjectVersion = () => {
    return `v${process.env.NEXT_PUBLIC_PROJECT_VERSION}`;
}

export const playSong = (type: SongEnum): void => {
    try {
        const song = new Audio(type);
        song.volume = 0.5;
        song.play();
    } catch (error) {
        throw new Error("Falha ao tocar o som da notificação!");
    }
}