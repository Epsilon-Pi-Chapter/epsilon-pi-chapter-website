import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

export const SCENE_DURATIONS = {
  open: 3000,
  lineage: 6000,
  events: 7000,
  officers: 5000,
  achievements: 5000,
  close: 4000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  open: Scene1,
  lineage: Scene2,
  events: Scene3,
  officers: Scene4,
  achievements: Scene5,
  close: Scene6,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center">
      {/* 9:16 vertical reel canvas, letterboxed inside any viewport */}
      <div
        className="relative bg-black overflow-hidden"
        style={{
          aspectRatio: '9 / 16',
          height: '100%',
          maxWidth: '100%',
        }}
      >
      {/* Persistent ambient gold glow + grain */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 60%, rgba(201,154,46,0.18) 0%, transparent 55%)',
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
      </div>

      <AnimatePresence initial={false} mode="wait">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
      </div>
    </div>
  );
}
