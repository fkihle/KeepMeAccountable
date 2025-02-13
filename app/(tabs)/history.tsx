import { useEffect, useState } from 'react';
import { H2, SizableText, YStack } from 'tamagui';
// import { FlatList, Text, View } from 'react-native';
import { supabase } from '../../utils/supabase';

export default function PlungeHistory() {
  
  const [historyData, setHistoryData] = useState<any[]>([]);

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const { data: historyData, error } = await supabase.from('coldplungedata').select();

        if (error) {
          console.error('Error fetching historical plunge data:', error.message);
          return;
        }

        if (historyData && historyData.length > 0) {
          setHistoryData(historyData);
          console.log('History data:', historyData);
        }
      } catch (error) {
        console.error('Error fetching historical plunge data:', error.message);
      }
    };

    getHistoryData();
  }, []);

  return (

        <YStack flex={1} items="center" gap="$8" px="$10" pt="$5" bg="$background">
          <H2>Cold Plunge History</H2>
    
          <YStack gap="$2">
          {historyData.map((item) => (
            <SizableText size="$3" key={item.id}>{item.temperature}</SizableText>
          ))}
          </YStack>
          
        </YStack>
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, paddingTop: 5, backgroundColor: '#f0f0f0' }}>
    //   <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Cold Plunge History</Text>
      
    //   <FlatList
    //     data={historyData}
    //     keyExtractor={(item) => item.id.toString()}
    //     renderItem={({ item }) =>
    //       <Text style={{ fontSize: 18 }} key={item.id}>{item.title}</Text>}
    //     />
    //     </View>
  );
};
