
import { apiKeys } from "./apiKeys";

interface TTSOptions {
  text: string;
  voice?: string;
  speed?: number;
  pitch?: number;
}

export class TextToSpeechService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
    
    // If voices aren't loaded yet, wait for them
    if (this.voices.length === 0) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
        console.log("🔊 TTS: Voices loaded:", this.voices.length);
      };
    }
  }

  speak(options: TTSOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Cancel any ongoing speech
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(options.text);
        
        // Find a suitable voice (prefer English voices)
        const preferredVoice = this.voices.find(voice => 
          voice.lang.startsWith('en') && voice.name.includes('Enhanced')
        ) || this.voices.find(voice => 
          voice.lang.startsWith('en')
        ) || this.voices[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.rate = options.speed || 0.9;
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = 0.8;

        utterance.onend = () => {
          console.log("🔊 TTS: Speech completed");
          resolve();
        };

        utterance.onerror = (event) => {
          console.error("🔊 TTS Error:", event);
          reject(new Error(`Speech synthesis error: ${event.error}`));
        };

        console.log("🔊 TTS: Speaking:", options.text.substring(0, 50) + "...");
        this.synth.speak(utterance);
      } catch (error) {
        console.error("🔊 TTS: Error in speak method:", error);
        reject(error);
      }
    });
  }

  stop() {
    this.synth.cancel();
    console.log("🔊 TTS: Speech stopped");
  }

  pause() {
    this.synth.pause();
    console.log("🔊 TTS: Speech paused");
  }

  resume() {
    this.synth.resume();
    console.log("🔊 TTS: Speech resumed");
  }

  getVoices() {
    return this.voices;
  }

  isSupported() {
    return 'speechSynthesis' in window;
  }
}

// Export singleton instance
export const ttsService = new TextToSpeechService();
