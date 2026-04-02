'use client';

import { Box, Button, Text, VStack } from '@vapor-ui/core';
import { useCallback, useEffect, useRef, useState } from 'react';

type CameraStepProps = {
  isActive: boolean;
  fileNames: string[];
  onCapture: (payload: {
    file: File;
    fileName: string;
    previewUrl: string;
  }) => void;
};

const CameraStep = ({ isActive, fileNames, onCapture }: CameraStepProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraLoading, setIsCameraLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const stopCameraStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCameraStream = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setErrorMessage('이 브라우저에서는 카메라를 사용할 수 없어요.');
      setIsCameraLoading(false);
      return;
    }

    setIsCameraLoading(true);
    setErrorMessage('');

    try {
      stopCameraStream();

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
        },
        audio: false,
      });

      streamRef.current = mediaStream;

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play().catch(() => undefined);
      }

      setIsCameraLoading(false);
    } catch (error) {
      const nextMessage =
        error instanceof DOMException && error.name === 'NotAllowedError'
          ? '카메라 권한을 허용하면 바로 촬영을 시작할 수 있어요.'
          : '카메라를 켜지 못했어요. 잠시 후 다시 시도해주세요.';

      setErrorMessage(nextMessage);
      setIsCameraLoading(false);
    }
  }, [stopCameraStream]);

  useEffect(() => {
    if (isActive) {
      setIsCapturing(false);
      void startCameraStream();
      return;
    }

    stopCameraStream();
  }, [isActive, startCameraStream, stopCameraStream]);

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, [stopCameraStream]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (
      isCapturing ||
      !video ||
      !canvas ||
      !video.videoWidth ||
      !video.videoHeight
    ) {
      return;
    }

    setIsCapturing(true);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const fileName =
      fileNames[0] ?? `captured-${new Date().toISOString().slice(0, 19)}.jpg`;

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setIsCapturing(false);
          return;
        }

        const file = new File([blob], fileName, { type: 'image/jpeg' });

        stopCameraStream();
        onCapture({
          file,
          fileName,
          previewUrl: URL.createObjectURL(blob),
        });
      },
      'image/jpeg',
      0.92
    );
  };

  return (
    <Box
      $css={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        backgroundColor: '#111111',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          backgroundColor: '#111111',
        }}
      />

      <Box
        $css={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.08) 38%, rgba(17, 17, 17, 0.55) 100%)',
        }}
      />

      <VStack
        $css={{
          position: 'relative',
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
          paddingTop: '52px',
          paddingBottom: '40px',
          paddingLeft: '20px',
          paddingRight: '20px',
          boxSizing: 'border-box',
        }}
      >
        <VStack
          $css={{
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Text
            typography="body2"
            foreground="white"
            $css={{
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingLeft: '16px',
              paddingRight: '16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(17, 17, 17, 0.62)',
              fontWeight: '500',
            }}
          >
            상품이 잘 보이게 찍어주세요
          </Text>
        </VStack>

        <VStack
          $css={{
            alignItems: 'center',
            gap: '14px',
          }}
        >
          {errorMessage ? (
            <VStack
              $css={{
                gap: '10px',
                width: '100%',
                maxWidth: '420px',
                alignItems: 'center',
              }}
            >
              <Text
                typography="body2"
                $css={{
                  color: '$white',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                }}
              >
                {errorMessage}
              </Text>
              <Button
                colorPalette="primary"
                onClick={() => void startCameraStream()}
              >
                다시 시도
              </Button>
            </VStack>
          ) : (
            <>
              <button
                aria-label="사진 촬영"
                disabled={isCameraLoading || isCapturing}
                onClick={handleCapture}
                style={{
                  display: 'flex',
                  width: '74px',
                  height: '74px',
                  padding: '6px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '999px',
                  border: '2px solid rgba(255, 255, 255, 0.96)',
                  backgroundColor: 'transparent',
                  cursor:
                    isCameraLoading || isCapturing ? 'not-allowed' : 'pointer',
                  opacity: isCameraLoading || isCapturing ? 0.6 : 1,
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    borderRadius: '999px',
                    backgroundColor: '#ffffff',
                  }}
                />
              </button>
            </>
          )}
        </VStack>
      </VStack>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Box>
  );
};

export default CameraStep;
