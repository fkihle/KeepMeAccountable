import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Card, H2, SizableText, YStack } from 'tamagui';
import { supabase } from '../../utils/supabase';

// TODO:
// - Implement cache to reduce DB calls

export default function PlungeHistory() {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getHistoryData = async () => {
    try {
      const { data: historyData, error } = await supabase.from('coldplungedata').select().order('posted', { ascending: false });

      if (error) {
        alert('Error fetching historical plunge data: ' + error.message);
        return;
      }

      if (historyData && historyData.length > 0) {
        setHistoryData(historyData);
        console.log('Fetched data:', historyData);
      }
    } catch (error) {
      alert('Error fetching historical plunge data:' + error.message);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getHistoryData().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getHistoryData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <YStack flex={1} items="center" gap="$8" px="$2" pt="$2" bg="$background">
        <H2>Cold Plunge History</H2>
        
        <Card elevate size="$4" bordered width="80%" height="max-content" items={'center'} px="$4" py="$4" bg="$background">
          <YStack gap="$2" width="100%">
            <YStack flexDirection='row' paddingStart={8}>
              <SizableText size="$4" flex={1}>Date</SizableText>
              <SizableText size="$4" flex={1}>Minutes</SizableText>
              <SizableText size="$4" flex={1}>Temperature</SizableText>
            </YStack>
            {historyData.map((item) => (
              <YStack key={item.id} flexDirection='row' paddingStart={8}>
                <SizableText size="$4" flex={1}>{new Date(item.posted).toLocaleDateString()}</SizableText>
                <SizableText size="$4" flex={1}>{item.minutes}</SizableText>
                <SizableText size="$4" flex={1}>{item.temperature}°C</SizableText>
              </YStack>
            ))}
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  );
};
