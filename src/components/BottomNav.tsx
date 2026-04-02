import { HStack, VStack, Text } from '@vapor-ui/core';
import { Icon } from '@iconify/react';

export type BottomNavTab = 'home' | 'farmers' | 'products' | 'my';

interface BottomNavProps {
  activeTab?: BottomNavTab;
  onTabChange?: (tab: BottomNavTab) => void;
}

const TABS: { id: BottomNavTab; label: string; icon: string }[] = [
  { id: 'home', label: '홈', icon: 'lucide:home' },
  { id: 'farmers', label: '농부들', icon: 'lucide:users' },
  { id: 'products', label: '특산품', icon: 'lucide:leaf' },
  { id: 'my', label: '마이', icon: 'lucide:user' },
];

function TabIcon({ icon, active }: { icon: string; active: boolean }) {
  const color = active
    ? 'var(--vapor-color-orange-500)'
    : 'var(--vapor-color-gray-500)';

  return <Icon icon={icon} width={28} height={28} style={{ color }} />;
}

export function BottomNav({ activeTab = 'home', onTabChange }: BottomNavProps) {
  return (
    <HStack
      render={<nav />}
      className={}
      $css={{
        justifyContent: 'space-between',
        gap: '$400',
        alignItems: 'center',
        backgroundColor: '$basic-white',
        paddingTop: '$150',
        paddingBottom: '$250',
        paddingLeft: '$500',
        paddingRight: '$500',
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        maxWidth: '375px',
        margin: '0 auto',
      }}
    >
      {TABS.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <VStack
            key={tab.id}
            render={<button onClick={() => onTabChange?.(tab.id)} />}
            $css={{
              alignItems: 'center',
              gap: '$025',
              background: 'none',
              border: 'none',
              padding: '$000',
              cursor: 'pointer',
            }}
          >
            <TabIcon icon={tab.icon} active={active} />
            <Text
              typography="body3"
              $css={{
                fontWeight: '500',
                color: active
                  ? 'var(--vapor-color-orange-500)'
                  : 'var(--vapor-color-gray-500)',
              }}
            >
              {tab.label}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
}
