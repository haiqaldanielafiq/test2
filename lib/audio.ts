import { Howl } from 'howler'

class AudioManager {
  private static instance: AudioManager
  private sounds: Record<string, Howl> = {}
  private music: Howl | null = null

  private constructor() {
    // We'll initialize with placeholder sounds or standard URLs if needed
    // For now, we define the structure
  }

  static getInstance() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager()
    }
    return AudioManager.instance
  }

  playSFX(name: string) {
    // In a real app, we'd load real assets
    console.log(`Playing SFX: ${name}`)
  }

  playMusic(name: string) {
    console.log(`Playing Music: ${name}`)
  }

  stopMusic() {
    if (this.music) this.music.stop()
  }

  setVolume(volume: number) {
    Howler.volume(volume)
  }
}

export const audioManager = AudioManager.getInstance()
