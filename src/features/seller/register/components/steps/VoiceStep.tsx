import { Button, Text, VStack } from '@vapor-ui/core';
import { ChangeEvent } from 'react';

type VoiceStepProps = {
  voiceText: string;
  onVoiceTextChange: (value: string) => void;
  onNext: () => void;
};

const VoiceStep = ({
  voiceText,
  onVoiceTextChange,
  onNext,
}: VoiceStepProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onVoiceTextChange(event.target.value);
  };

  return (
    <VStack
      $css={{
        width: '100%',
        minHeight: '100dvh',
        padding: '$200',
        justifyContent: 'space-between',
        gap: '$200',
        border: '3px solid green',
      }}
    >
      <VStack $css={{ gap: '$050' }}>
        <Text render={<h1 />} typography="heading4">
          음성 AI 인식
        </Text>
      </VStack>

      <VStack $css={{ flex: 1, justifyContent: 'center', gap: '$150' }}>
        <textarea
          value={voiceText}
          onChange={handleChange}
          placeholder="예: 제주 감귤 판매합니다. 오늘 수확한 상품입니다."
          style={{
            width: '100%',
            minHeight: '240px',
            padding: '12px',
            border: '1px solid #ccc',
            resize: 'none',
          }}
        />
      </VStack>

      <Button onClick={onNext}>다음</Button>
    </VStack>
  );
};

export default VoiceStep;
