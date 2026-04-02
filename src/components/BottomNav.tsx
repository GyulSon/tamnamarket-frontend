import { HStack, VStack, Text } from '@vapor-ui/core';
import Image from 'next/image';
import { HomeOutlineIcon } from '@vapor-ui/icons';
import { UserOutlineIcon } from '@vapor-ui/icons';

export type BottomNavTab = 'home' | 'farmers' | 'products' | 'my';

interface BottomNavProps {
  activeTab?: BottomNavTab;
  onTabChange?: (tab: BottomNavTab) => void;
}

const TABS: { id: BottomNavTab; label: string; icon: string }[] = [
  { id: 'home', label: '홈', icon: 'home' },
  { id: 'products', label: '특산품', icon: '/images/icons/vega.svg' },
  { id: 'farmers', label: '농부들', icon: '/images/icons/hat.svg' },
  { id: 'my', label: '마이', icon: 'my' },
];

function TabIcon({ icon, active }: { icon: string; active: boolean }) {
  const color = active ? '#FF761B' : '#959595';
  if (icon.includes('hat')) {
    if (active) {
      return (
        <Image
          src="/images/icons/haton.svg"
          alt={icon}
          width={28
            
          }
          height={28
            
          }
          style={{ color }}
        />
      );
    } else {
      return (
        <Image
          src="/images/icons/hatoff.svg"
          alt={icon}
          width={28
            
          }
          height={28
            
          }
          style={{ color }}
        />
      );
    }
  } else if (icon.includes('vega')) {
    if (active) {
      return (
        <Image
          src="/images/icons/vegaon.svg"
          alt={icon}
          width={28
            
          }
          height={28
            
          }
          style={{ color }}
        />
      );
    } else {
      return (
        <Image
          src="/images/icons/vegaoff.svg"
          alt={icon}
          width={28
            
          }
          height={28
            
          }
          style={{ color }}
        />
      );
    }
  } else if (icon.includes('home')) {
    return <HomeOutlineIcon width="28
    " height="28
    " style={{ color }} />;
  }
  return <UserOutlineIcon width="28
  " height="28
  " style={{ color }} />;
}

export function BottomNav({ activeTab = 'home', onTabChange }: BottomNavProps) {
  return (
    <HStack
      render={<nav />}
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
        // maxWidth: '375px',
        zIndex: 10,
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
              typography="subtitle1"
              $css={{
                fontWeight: '500',
                color: active ? '#FF761B' : '#959595',
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
