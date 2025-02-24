
import { useState } from 'react';
import { Button, Form, H2, Input, SizableText, Spinner, XStack, YStack } from 'tamagui';
import CountdownTimer from 'utils/countdownTimer';
import { supabase } from 'utils/supabase';
// TODO:
// - Resolve: "Text strings must be rendered within a <Text> component"
// - Handle temp and mins as floats, not stings
// - Add input format validation for temp and mins
// - Create countdown timer for plunge


export default function ColdPlungeScreen() {
  const [temp, setTemp] = useState<string>('');
  const [mins, setMins] = useState<string>('');

  const [incorrectMin, setIncorrectMin] = useState<boolean>(false);
  const [incorrectTemp, setIncorrectTemp] = useState<boolean>(false);
  
  const [success, setSuccess] = useState<boolean>(false);
  const [registering, setRegistering] = useState<boolean>(false);

  const sendData = async () => {
    if (parseFloat(temp) < 0.0 || parseFloat(temp) > 45.0 || isNaN(parseFloat(temp))) {
        console.log("Enter a valid temperature");
        setIncorrectTemp(true);
    }
    if (parseFloat(mins) < 0.0 || parseFloat(mins) > 30.0 || isNaN(parseFloat(mins))) {
        console.log("Enter a valid minute amount");
        setIncorrectMin(true);
        return;
    }
    try {
      setRegistering(true);
      const { error } = await supabase.from('coldplungedata').insert({
        temperature: temp,
        minutes: mins,
        posted: new Date()
      });

      setTemp('');
      setMins('');
      setSuccess(true);
      setRegistering(false);
    } catch (error) {
      console.error('Error registering plunge: ', error);
    }
  };


  return (
    <YStack flex={1} items="center" gap="$8" px="$10" pt="$5" bg="$background">
      <H2>Register Plunge</H2>
      <Form gap="$2" onSubmit={() => sendData()} >
        <XStack gap="$2" items="center" width="100%">
          <SizableText size="$6" flex={1}>Temperature:</SizableText>
          <Input
            value={temp}
            onChangeText={(text) => {
              const sanitizedText = text.replace(',', '.');
              setTemp(text ? sanitizedText : '');
            }}
            keyboardType='numeric'
            width={100}
          />
        </XStack>
        <XStack gap="$2" items="center" width="100%">
        {incorrectTemp && (
            <SizableText size="$6" color="$red9">Enter a valid temperature</SizableText>
          )}
          </XStack>
        <XStack gap="$2" items="center">
          <SizableText size="$6" flex={1}>Minutes:</SizableText>
          <Input
            value={mins}
            onChangeText={(text) => {
              const sanitizedText = text.replace(',', '.');
              setMins(text ? sanitizedText : '');
            }}
            keyboardType='numeric'
            width={100}
          />
        </XStack>
        <XStack gap="$2" items="center" width="100%">
          {incorrectMin && (
            <SizableText size="$6" color="$red9">Enter a valid minute amount</SizableText>
          )}
        </XStack>
        
        <Form.Trigger asChild>
          <Button icon={registering ? <Spinner /> : undefined}>
            <SizableText>Register Plunge</SizableText>
          </Button>
        </Form.Trigger>
        {success && (
          <SizableText size="$6">Plunge registered!</SizableText>
        )}
        {success && setTimeout(() => setSuccess(false), 3000)}
      </Form>

      {/* Countdown timer */}
      <XStack gap="$4" items="center" width="100%">
        <CountdownTimer />
      </XStack>

    </YStack>
  );
}