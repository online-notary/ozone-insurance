import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AnimatedLogoProps {
  onAnimationComplete: () => void;
  className?: string;
}

const AnimatedLogo = ({ onAnimationComplete, className = "" }: AnimatedLogoProps) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_RETRIES = 2;
  const LOAD_TIMEOUT = 10000; // 10 seconds

  useEffect(() => {
    const fetchAnimatedLogo = async (attempt = 0) => {
      try {
        setLoadingProgress(`Loading animated logo${attempt > 0 ? ` (attempt ${attempt + 1})` : ""}...`);
        console.log(`Fetching animated logo (attempt ${attempt + 1})`);

        // Set timeout for the entire operation
        timeoutRef.current = setTimeout(() => {
          console.warn("Logo loading timeout");
          setLoadingProgress("Loading timeout - using fallback");
          handleLoadError("Timeout loading animated logo", attempt);
        }, LOAD_TIMEOUT);

        // List files in the logo bucket
        const { data: files, error: listError } = await supabase.storage.from("logo").list("", {
          limit: 1,
          sortBy: { column: "created_at", order: "desc" },
        });

        if (listError) {
          console.error("Error listing files:", listError);
          throw new Error(`Failed to list files: ${listError.message}`);
        }

        if (files && files.length > 0) {
          // Get the public URL for the most recent file
          const { data } = supabase.storage.from("logo").getPublicUrl(files[0].name);

          console.log("Found logo:", data.publicUrl);
          setLogoUrl(data.publicUrl);
          setLoadingProgress("Loading logo...");
        } else {
          throw new Error("No logo found in bucket");
        }

        // Clear timeout if successful
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      } catch (err) {
        console.error("Error fetching animated logo:", err);
        handleLoadError(err instanceof Error ? err.message : "Unknown error", attempt);
      }
    };

    const handleLoadError = (errorMessage: string, attempt: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (attempt < MAX_RETRIES) {
        console.log(`Retrying logo fetch in 2 seconds... (${attempt + 1}/${MAX_RETRIES})`);
        setRetryCount(attempt + 1);
        setTimeout(() => fetchAnimatedLogo(attempt + 1), 2000);
      } else {
        console.warn("All retry attempts failed, using fallback");
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchAnimatedLogo();

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    console.log("Animation completed");
    setTimeout(() => {
      onAnimationComplete();
    }, 500); // Small delay for smooth transition
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  const handleImageLoad = () => {
    console.log("Logo loaded successfully");
    setIsLoading(false);
    // Show the static logo briefly then complete the "animation"
    setTimeout(handleVideoEnd, 1500);
  };

  const handleImageError = () => {
    console.error("Failed to load logo image");
    setError("Failed to load logo image");
    setIsLoading(false);
  };

  // Handle error state with useEffect to avoid render-time updates
  useEffect(() => {
    if (error && !isLoading) {
      console.log("Using fallback due to error:", error);
      setTimeout(() => {
        onAnimationComplete();
      }, 100);
    }
  }, [error, isLoading, onAnimationComplete]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20 bg-primary/20 rounded animate-pulse"></div>
          {loadingProgress && <div className="text-xs text-muted-foreground animate-pulse">{loadingProgress}</div>}
          {retryCount > 0 && (
            <div className="text-xs text-yellow-600">
              Retry {retryCount}/{MAX_RETRIES}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error || !logoUrl) {
    // Show a fallback loading state instead of null to prevent disappearing
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-20 h-20 bg-primary/10 rounded flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/20 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Determine if it's a video or image based on file extension
  const isVideo = logoUrl.match(/\.(mp4|webm|mov)$/i);

  if (isVideo) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <video
          ref={videoRef}
          className="w-20 h-20 object-contain"
          onEnded={handleVideoEnd}
          onLoadedData={handleVideoLoad}
          muted
          playsInline
          preload="auto"
        >
          <source src={logoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  } else {
    // For GIF or other animated images
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img
          src={logoUrl}
          alt="Ozone Financial Logo"
          className="w-20 h-20 object-contain"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    );
  }
};

export default AnimatedLogo;
