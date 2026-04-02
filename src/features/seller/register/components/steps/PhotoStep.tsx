import { Button, Text, VStack } from '@vapor-ui/core';
import { ChangeEvent } from 'react';

type PhotoStepProps = {
  fileNames: string[];
  onFileChange: (fileNames: string[]) => void;
  onNext: () => void;
};

const PhotoStep = ({ fileNames, onFileChange, onNext }: PhotoStepProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files?.length) {
      return;
    }

    onFileChange(Array.from(files, (file) => file.name));
  };

  return (
    <VStack
      $css={{
        width: '100%',
        minHeight: '100dvh',
        padding: '$200',
        justifyContent: 'space-between',
        gap: '$200',
        border: '3px solid red',
      }}
    >
      <VStack $css={{ gap: '$050' }}>
        <Text render={<h1 />} typography="heading4">
          사진 촬영 및 첨부
        </Text>
      </VStack>

      <VStack
        $css={{ flex: 1, width: '100%', justifyContent: 'center', gap: '$100' }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          capture="environment"
          onChange={handleChange}
        />
        <Text typography="body2">
          {fileNames.length ? fileNames.join(', ') : '선택된 사진 없음'}
        </Text>
      </VStack>

      <Button onClick={onNext}>다음</Button>
    </VStack>
  );
};

export default PhotoStep;
