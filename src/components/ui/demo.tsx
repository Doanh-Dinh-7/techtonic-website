import AudioPlayer from "@/components/ui/audio-player";
import { homePlaylist } from "@/lib/content/home";

export function AudioPlayerDemo() {
  return <AudioPlayer {...homePlaylist[0]} />;
}
