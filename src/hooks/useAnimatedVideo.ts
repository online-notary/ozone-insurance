import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAnimatedVideo = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // List files in the animated-logo bucket
        const { data: files, error: listError } = await supabase.storage
          .from('animated-logo')
          .list('', {
            limit: 10,
            sortBy: { column: 'created_at', order: 'desc' }
          });

        if (listError) {
          console.error('List error:', listError);
          throw new Error(`Failed to fetch video list: ${listError.message}`);
        }

        if (!files || files.length === 0) {
          console.error('No files found in animated-logo bucket');
          throw new Error('No video files found');
        }

        // Find video files (mp4, webm, mov)
        const videoFile = files.find(file => 
          file.name.toLowerCase().endsWith('.mp4') ||
          file.name.toLowerCase().endsWith('.webm') ||
          file.name.toLowerCase().endsWith('.mov')
        );

        if (!videoFile) {
          throw new Error('No video files found in bucket');
        }

        console.log('Found video file:', videoFile.name);
        
        // Get public URL for the video file
        const { data: urlData } = supabase.storage
          .from('animated-logo')
          .getPublicUrl(videoFile.name);

        if (!urlData?.publicUrl) {
          throw new Error('Failed to get video URL');
        }

        console.log('Video URL:', urlData.publicUrl);
        setVideoUrl(urlData.publicUrl);
      } catch (err) {
        console.error('Error fetching animated video:', err);
        setError(err instanceof Error ? err.message : 'Failed to load video');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, []);

  return {
    videoUrl,
    isLoading,
    error
  };
};