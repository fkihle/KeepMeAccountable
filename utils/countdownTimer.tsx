import { Audio } from "expo-av";
import { Link } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { WheelPicker } from "react-native-infinite-wheel-picker";
import { Button, Card, CardHeader, SizableText, YStack } from "tamagui";

// TODO: 
// - Fix: Error playing sound: [Error: The Sound is already loaded.]
// Create a 10sec countdown before plungtime counter starts
// Add beeps on last three seconds

const CountdownTimer: React.FC = () => {
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const sound = useRef(new Audio.Sound());
    const [showSoundCredits, setShowSoundCredits] = useState<boolean>(false);

    const plungeMins: string[] = ['0:01','3:10','4:10','5:10','6:10','7:10','8:10','9:10','10:10','11:10','12:10','13:10','14:10','15:10'];
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [plungeMinutes, setPlungeMinutes] = useState<string>('3:10');
    
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning && countdown !== null && countdown > 0) {
            timer = setTimeout(() => 
                setCountdown((prev) => (prev !== null ? prev - 1 : 0)), 1000);
        } else if (isRunning && countdown === 0) {
            setCountdown(null);
            setIsRunning(false);
            playSound();
            setShowSoundCredits(true);
            setTimeout(() => setShowSoundCredits(false), 3000)
        }

        return () => clearTimeout(timer);
    }, [countdown, isRunning]);

    // Start Countdown
    const startCountdown = useCallback(() => {
        let secs = plungeMinutes.split(':');
        let plungeSecs = parseInt(secs[0]) * 60 + parseInt(secs[1]);
        setCountdown(plungeSecs);
        setIsRunning(true);
    }, [plungeMinutes]);


    // Play Sound
    const playSound = async () => {
        try {
            await sound.current.loadAsync(require('../assets/sounds/timer_finished.mp3'));
            await sound.current.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    return (

        <YStack flex={1} items="center" pt="$2">
            <Card elevate size="$4" bordered width="80%" height="max-content" items={'center'} p="$4" bg="$background">
                <CardHeader>
                    <SizableText size="$8">Countdown Timer</SizableText>
                </CardHeader>

                <YStack gap="$2" width="100%">
                    <YStack width="100%" height="$17" gap="$4" overflow="hidden" style={{ backgroundColor: '#0000001a' }}>
                    {isRunning ? (
                        <>
                            {/* COUNTDOWN */}
                            <YStack items="center" height="$12">
                            <SizableText size="$15">{countdown !== null && isRunning ? countdown : plungeMinutes}</SizableText>
                            <SizableText size="$4">Seconds left</SizableText>
                            </YStack>
                             {/* STOP COUNTDOWN BUTTON */}
                            <Button size="$5" onPress={() => {
                                setCountdown(null);
                                setIsRunning(false);
                            }}>Stop Countdown</Button>
                        </>
                    ) : (
                        <>
                            {/* MINUTE SELECTION */}
                            <YStack height="$12">
                            <WheelPicker
                                initialSelectedIndex={0}
                                data={plungeMins}
                                restElements={2}
                                elementHeight={30}
                                onChangeValue={(index, value) => {
                                    console.log(value);
                                    setSelectedIndex(index);
                                    setPlungeMinutes(value);
                                }}
                                selectedIndex={selectedIndex}
                                infiniteScroll={false}
                                selectedLayoutStyle={{ backgroundColor: '#00000026', borderRadius: 2 }}
                                elementTextStyle={{ fontSize: 18, color: '#fff' }}
                                />
                                </YStack>
                                {/* START COUNTDOWN BUTTON */}
                            <Button size="$5" onPress={startCountdown}>Start Countdown</Button>
                        </>
                    )}
                    </YStack>
                    

                </YStack>
            </Card>
            {showSoundCredits && (
                <SizableText size="$6">
                    Sound Effect by <Link href="https://pixabay.com/users/benkirb-8692052/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=262896" target="_blank" rel="noopener noreferrer">Benjamin Adams</Link> from <Link href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=262896" target="_blank" rel="noopener noreferrer">Pixabay</Link>
                    {/* Sound Effect by Benjamin Adams from Pixabay */}
                </SizableText>
            )}
        </YStack>
    );
}

export default CountdownTimer;
