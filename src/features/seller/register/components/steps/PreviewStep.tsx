import { Button, Text, VStack } from '@vapor-ui/core';

type PreviewStepProps = {
  title: string;
  description: string;
  photoNames: string[];
  onSubmit: () => void;
};

const PreviewStep = ({
  title,
  description,
  photoNames,
  onSubmit,
}: PreviewStepProps) => {
  return (
    <VStack
      $css={{
        width: '100%',
        minHeight: '100dvh',
        padding: '$200',
        justifyContent: 'space-between',
        gap: '$200',
        border: '3px solid blue',
      }}
    >
      <VStack $css={{ gap: '$050' }}>
        <Text render={<h1 />} typography="heading4">
          자동 생성된 등록 화면
        </Text>
      </VStack>

      <VStack $css={{ flex: 1, justifyContent: 'center', gap: '$100' }}>
        <Text typography="body2">
          사진: {photoNames.length ? photoNames.join(', ') : '없음'}
        </Text>
        <Text typography="body2">제목: {title}</Text>
        <Text typography="body2">설명: {description}</Text>
      </VStack>

      <Button onClick={onSubmit}>등록</Button>
    </VStack>
  );
};

export default PreviewStep;
