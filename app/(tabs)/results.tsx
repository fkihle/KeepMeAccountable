import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { H2, SizableText, YStack } from "tamagui";
import { supabase } from "utils/supabase";

// const CACHE_KEY = 'plungeHistory';
// const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export default function Results() {
        const [historyData, setHistoryData] = useState<any[]>([]);
        const [refreshing, setRefreshing] = useState(false);

        const [lastUse, setLastUse] = useState<string>('');
        const [totalMinutes, setTotalMinutes] = useState<number>(0);
        const [costPrUse, setCostPrUse] = useState<number>(0);
        const [totalUses, setTotalUses] = useState<number>(0);



        const getHistoryData = async () => {
            try {
                const { data: historyData, error } = await supabase.from('coldplungedata').select().order('posted', { ascending: false });
    
            if (error) {
                console.log('Error fetching historical plunge data: ' + error.message);
                return;
            }
                
            if (historyData && historyData.length > 0) {
                setHistoryData(historyData);
                const lastUseDate = new Date(historyData[0].posted);
                setLastUse(`${lastUseDate.getFullYear()}-${String(lastUseDate.getMonth() + 1).padStart(2, '0')}-${String(lastUseDate.getDate()).padStart(2, '0')}`);
                setTotalMinutes(historyData.reduce((acc, item) => acc + item.minutes, 0));
                setCostPrUse(18000 / historyData.length);
                setTotalUses(historyData.length);
            }
            } catch (error) {
                console.log('Error fetching historical plunge data:' + error.message);
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
                <H2>Results</H2>
                    <YStack flexDirection='column' justify="flex-start" paddingStart={8} gap="$2">
                        <YStack flexDirection='row' width='100%'>
                            <SizableText size="$6" flex={1}>Total Uses:</SizableText>
                            <SizableText size="$6" flex={1}>{totalUses}</SizableText>
                        </YStack>
                        <YStack flexDirection='row'  width='100%'>
                            <SizableText size="$6" flex={1}>Last use:</SizableText>
                            <SizableText size="$6" flex={1}>{lastUse}</SizableText>
                        </YStack>
                        <YStack flexDirection='row'  width='100%'>
                            <SizableText size="$6" flex={1}>Total minutes:</SizableText>
                            <SizableText size="$6" flex={1}>{totalMinutes}</SizableText>
                        </YStack>
                        <YStack flexDirection='row'  width='100%'>
                            <SizableText size="$6"flex={1}>Cost pr use:</SizableText>
                            <SizableText size="$6"flex={1}>{costPrUse}</SizableText>
                        </YStack>
                    </YStack>

            </YStack>
        </ScrollView>
    );
}