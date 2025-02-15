
import { useState } from 'react';
import { Button, Form, H2, Input, SizableText, XStack, YStack } from 'tamagui';
import { supabase } from 'utils/supabase';


export default function ColdPlungeScreen() {
  const [temp, setTemp] = useState<number>(0);
  const [mins, setMins] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  
  const sendData = async () => {
    if (temp < 0 || temp > 45) {
        console.log("Enter a valid temperature");
        return;
    }
    if (mins < 0 || mins > 30) {
        console.log("Enter a valid minute amount");
        return;
    }
    try {
      const { error } = await supabase.from('coldplungedata').insert({
        temperature: temp,
        minutes: mins,
        posted: new Date()
      });

      setTemp(0);
      setMins(0);
      setSuccess(true);
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
            value={temp.toString()}
            onChangeText={(text) => {
              const sanitizedText = text.replace(',', '.');
              setTemp(Number(sanitizedText));
            }}
            placeholder='Temp'
            keyboardType='numeric'
            width={100}
          />
        </XStack>
        <XStack gap="$2" items="center">
          <SizableText size="$6" flex={1}>Minutes:</SizableText>
          <Input            
            value={mins.toString()}
            onChangeText={(text) => {
              const sanitizedText = text.replace(',', '.');
              setMins(Number(sanitizedText));
            }}
            placeholder='Mins'
            keyboardType='numeric'
            width={100}
          />
        </XStack>
        
          
      {/* introduce spinner icon when processesing registration */}
      <Form.Trigger asChild>
        <Button>
          Register Plunge
        </Button>
      </Form.Trigger>
      {success ? (<SizableText size="$6">Plunge registered!</SizableText>) : (<></>)}
    </Form>

    </YStack>
  );
}