import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { Card, H2, SizableText, YStack } from "tamagui";
import { supabase } from "utils/supabase";

// TODO:
// - Implement cache to reduce DB calls

// const CACHE_KEY = 'plungeHistory';
// const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export default function Results() {
        // const [historyData, setHistoryData] = useState<any[]>([]);
        const [refreshing, setRefreshing] = useState(false);

        const [lastUse, setLastUse] = useState<string>('');
        const [totalMinutes, setTotalMinutes] = useState<number>(0);
        const [costPrUse, setCostPrUse] = useState<number>(0);
        const [totalUses, setTotalUses] = useState<number>(0);



        const getHistoryData = async () => {
            try {
                const { data: historyData, error } = await supabase.from('coldplungedata').select().order('posted', { ascending: false });
    
            if (error) {
                console.error('Error fetching historical plunge data: ' + error.message);
                return;
            }
                
            if (historyData && historyData.length > 0) {
                // setHistoryData(historyData);
                
                setLastUse(new Date(historyData[0].posted).toLocaleDateString());
                setTotalMinutes(historyData.reduce((acc, item) => acc + item.minutes, 0));
                setCostPrUse(18000 / historyData.length);
                setTotalUses(historyData.length);
            }
            } catch (error) {
                console.error('Error fetching historical plunge data:' + error.message);
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

                <Card elevate size="$4" bordered width="80%" height="max-content" items={'center'} px="$4" py="$4" bg="$background">
                    <YStack gap="$2" width="100%">
                        <YStack flexDirection='row' paddingStart={8}>
                            <SizableText size="$5" flex={1}>Total Uses:</SizableText>
                            <SizableText size="$5" flex={1}>{totalUses}</SizableText>
                        </YStack>
                        <YStack flexDirection='row' paddingStart={8}>
                            <SizableText size="$5" flex={1}>Last use:</SizableText>
                            <SizableText size="$5" flex={1}>{lastUse}</SizableText>
                        </YStack>
                        <YStack flexDirection='row' paddingStart={8}>
                            <SizableText size="$5" flex={1}>Total minutes:</SizableText>
                            <SizableText size="$5" flex={1}>{totalMinutes} mins</SizableText>
                        </YStack>
                        <YStack flexDirection='row' paddingStart={8}>
                            <SizableText size="$5" flex={1}>Cost pr use:</SizableText>
                            <SizableText size="$5" flex={1}>{costPrUse.toFixed(2)} kr</SizableText>
                        </YStack>
                    </YStack>
                </Card>

            </YStack>

            
        </ScrollView>
    );
}