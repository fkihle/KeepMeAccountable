import { Audio } from "expo-av";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import { WheelPicker } from "react-native-infinite-wheel-picker";
import { Button, Card, CardHeader, SizableText, YStack } from "tamagui";

// TODO: 
// - Add sound file

const CountdownTimer: React.FC = () => {
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const confettiRef = useRef<ConfettiCannon | null>(null);
    const sound = useRef(new Audio.Sound());

    const plungeMins: string[] = ['0:03','3:10','4:10','5:10','6:10','7:10','8:10','9:10','10:10','11:10','12:10','13:10','14:10','15:10'];
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
            triggerConfetti();
            //playSound();
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

    // Trigger Confetti
    const triggerConfetti = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // hide after 3 secs
    };

    // Play Sound
    const playSound = async () => {
        try {
            await sound.current.loadAsync(require('FIND_NICE_SOUNDFILE'));
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
                    {/* MINUTE SELECTION */}
                    <YStack width="100%" overflow="hidden" style={{ backgroundColor: '#0000001a', width: 150 }}>
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
                
                    <SizableText>Seconds left: {countdown !== null && isRunning ? countdown : plungeMinutes}</SizableText>

                    {/* START COUNTDOWN BUTTON */}
                    <Button size="$5" onPress={startCountdown}>Start Countdown</Button>

                    {showConfetti && <ConfettiCannon count={200} origin={{ x: -150, y: -200 }} fadeOut={true} />}
                </YStack>
            </Card>
        </YStack>
    );
}

export default CountdownTimer;
