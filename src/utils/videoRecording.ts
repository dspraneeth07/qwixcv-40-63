
interface RecordingOptions {
  video?: boolean;
  audio?: boolean;
  mimeType?: string;
}

export class VideoRecordingService {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  
  async startRecording(options: RecordingOptions = {}): Promise<void> {
    try {
      console.log("🎥 VideoRecording: Starting recording...");
      
      // Stop any existing recording
      if (this.mediaRecorder?.state === 'recording') {
        this.stopRecording();
      }
      
      // Get user media with both video and audio
      const constraints: MediaStreamConstraints = {
        video: options.video !== false ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        } : false,
        audio: options.audio !== false ? {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } : false
      };
      
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Check supported MIME types
      const mimeType = options.mimeType || this.getSupportedMimeType();
      
      // Create media recorder
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: mimeType,
        videoBitsPerSecond: 2500000, // 2.5 Mbps
        audioBitsPerSecond: 128000   // 128 kbps
      });
      
      // Reset recorded chunks
      this.recordedChunks = [];
      
      // Handle data available
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
          console.log("🎥 VideoRecording: Chunk recorded, size:", event.data.size);
        }
      };
      
      // Start recording
      this.mediaRecorder.start(1000); // Collect data every second
      
      console.log("✅ VideoRecording: Recording started successfully");
      
    } catch (error) {
      console.error("❌ VideoRecording: Failed to start recording:", error);
      throw new Error(`Failed to start recording: ${error}`);
    }
  }
  
  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        reject(new Error('No active recording to stop'));
        return;
      }
      
      this.mediaRecorder.onstop = () => {
        console.log("🎥 VideoRecording: Recording stopped");
        
        // Create blob from recorded chunks
        const mimeType = this.mediaRecorder?.mimeType || 'video/webm';
        const recordedBlob = new Blob(this.recordedChunks, { type: mimeType });
        
        console.log("✅ VideoRecording: Blob created, size:", recordedBlob.size);
        
        // Clean up
        this.cleanup();
        
        resolve(recordedBlob);
      };
      
      this.mediaRecorder.onerror = (event) => {
        console.error("❌ VideoRecording: Recording error:", event);
        reject(new Error('Recording failed'));
      };
      
      // Stop recording
      this.mediaRecorder.stop();
    });
  }
  
  pauseRecording(): void {
    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder.pause();
      console.log("⏸️ VideoRecording: Recording paused");
    }
  }
  
  resumeRecording(): void {
    if (this.mediaRecorder?.state === 'paused') {
      this.mediaRecorder.resume();
      console.log("▶️ VideoRecording: Recording resumed");
    }
  }
  
  getStream(): MediaStream | null {
    return this.stream;
  }
  
  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }
  
  isPaused(): boolean {
    return this.mediaRecorder?.state === 'paused';
  }
  
  private getSupportedMimeType(): string {
    const types = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/webm',
      'video/mp4;codecs=h264,aac',
      'video/mp4'
    ];
    
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        console.log("🎥 VideoRecording: Using MIME type:", type);
        return type;
      }
    }
    
    console.warn("⚠️ VideoRecording: No preferred MIME type supported, using default");
    return '';
  }
  
  private cleanup(): void {
    // Stop all tracks
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
        console.log("🛑 VideoRecording: Track stopped:", track.kind);
      });
      this.stream = null;
    }
    
    // Reset state
    this.mediaRecorder = null;
    this.recordedChunks = [];
  }
  
  downloadRecording(blob: Blob, filename?: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `interview_recording_${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log("💾 VideoRecording: Recording downloaded as:", a.download);
  }
  
  createVideoURL(blob: Blob): string {
    const url = URL.createObjectURL(blob);
    console.log("🔗 VideoRecording: Video URL created");
    return url;
  }
  
  revokeVideoURL(url: string): void {
    URL.revokeObjectURL(url);
    console.log("🗑️ VideoRecording: Video URL revoked");
  }
}

// Export singleton instance
export const videoRecordingService = new VideoRecordingService();
