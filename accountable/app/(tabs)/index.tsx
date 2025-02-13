
import { StyleSheet } from 'react-native';
import { H2, YStack } from 'tamagui';



// #############################################################
// Cold Plunge
// #############################################################

// interface ColdPlungeData {
//   id: string;
//   posted: Timestamp;
//   temperature: number;
//   minutes: number;
// }

// interface ColdPlungeStats {
//   uses: number;
//   mostRecentUse: Timestamp;
//   totalMinutes: number;
//   costOfUse: number;
// }

export default function ColdPlungeScreen() {
  // const [coldData, setColdData] = useState<ColdPlungeData[]>([]);
  // const [coldStats, setColdStats] = useState<ColdPlungeStats[]>([]);
  // const [temp, setTemp] = useState<number>(0);
  // const [mins, setMins] = useState<number>(0);
  
  // const drawer = useRef<DrawerLayoutAndroid>(null);
  // const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>('left',);
  
  // const changeDrawerPosition = () => {
  //   if (drawerPosition === 'left') {
  //     setDrawerPosition('right');
  //   } else {
  //     setDrawerPosition('left');
  //   }
  // };

  // const navigationView = () => (
  //   <View style={[styles.drawerContainer, styles.navigationContainer]}>
  //     <Text style={styles.drawerParagraph}>
  //       DATA IN DRAWER
  //     </Text>
  //     <Button
  //       title="Close drawer"
  //       onPress={() => drawer.current?.closeDrawer()}
  //     />
  //   </View>
  // );

  // const sendData = async () => {
  //   if (temp < 0 || temp > 45) {
  //       Alert.alert("Enter a valid temperature");
  //       return;
  //   }
  //   if (mins < 0 || mins > 30) {
  //       Alert.alert("Enter a valid minute amount");
  //       return;
  //   }
  //   try {
  //     await addDoc(collection(db, 'coldplungedata'), {
  //       posted: serverTimestamp(),
  //       temperature: temp,
  //       minutes: mins
  //     });
  //     setTemp(0);
  //     setMins(0);
  //   } catch (error) {
  //     console.error('Error registering plunge: ', error);
  //   }

    
  // };

  // useEffect(() => {
  //   // Fetch ColdPlunge data
  //   const q = query(
  //       collection(db, 'coldplungedata'),
  //       orderBy("posted", "desc")
  //   );

  //   // Parse DB data
  //   const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
  //       const fetchedMessages: ColdPlungeData[] = [];
  //       const stats: ColdPlungeStats[] = [];
  //       let sumUses: number = 0;
  //       let sumMinutes: number = 0;
  //       let cost: number = 0;
  //       let lastUse: Timestamp;

  //       QuerySnapshot.forEach((doc) => {
  //           const data = doc.data();
  //           fetchedMessages.push({
  //               ...data,
  //               id: doc.id,
  //               posted: data.posted || 0,
  //               minutes: data.minutes || 0,
  //               temperature: data.temperature || 0
  //           });
  //           sumUses += 1;
  //           sumMinutes += data.minutes || 0;
  //       });

  //       cost = 18000 / sumUses;
  //       lastUse = fetchedMessages[0].posted;

  //       setColdData(fetchedMessages);

  //       stats.push({
  //           uses: sumUses,
  //           mostRecentUse: lastUse,
  //           totalMinutes: sumMinutes,
  //           costOfUse: cost
  //       });
  //       setColdStats(stats);
  //   });

  //   return () => unsubscribe();
  // });



  return (
    <YStack flex={1} items="center" gap="$8" px="$10" pt="$5" bg="$background">
      <H2>Register Plunge</H2>

      {/* <ToastControl /> */}

      
    </YStack>
  );

//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={
//         <IconSymbol
//           size={310}
//           color="#808080"
//           name="snowflake.circle.fill"
//           style={styles.headerImage}
//         />}
//       headerTitle="Register Plunge">

//       <ThemedView>
//         {/* Plunge registration Card */}
//         <SafeAreaProvider>
//           <SafeAreaView style={styles.inputContainer}>
//             {/* <ScrollView keyboardDismissMode="interactive"> */}
//               <TextInput
//                 style={styles.inputTextInput}
//                 value={temp.toString()}
//                 onChangeText={() => setTemp(temp)}
//                 placeholder='Temp'
//                 inputMode='decimal'
//               />
//               <TextInput
//                 style={styles.inputTextInput}
//                 value={mins.toString()}
//                 onChangeText={() => setMins(mins)}
//                 placeholder='Mins'
//                 inputMode='decimal'
//               />
//               <Button
//                 title='Register'
//                 onPress={() => sendData}
//               />
//             {/* </ScrollView> */}
//           </SafeAreaView>
//         </SafeAreaProvider>
//       </ThemedView>
      
//         {/* Cold Plunge Main Stats */}
//         {coldStats?.map((coldStats: ColdPlungeStats, index) => (
//           <ThemedView key={index}>
//             <ThemedText type="subtitle"><i className="opacity-25">Total uses:</i>    {coldStats.uses}</ThemedText>
//             <ThemedText type="subtitle"><i className="opacity-25">Last use:</i>      {new Date(coldStats.mostRecentUse.seconds * 1000).toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</ThemedText>
//             <ThemedText type="subtitle"><i className="opacity-25">Total minutes:</i> {coldStats.totalMinutes}</ThemedText>
//             <ThemedText type="subtitle"><i className="opacity-25">Cost pr use:</i>   {coldStats.costOfUse}</ThemedText>
//           </ThemedView>
//         ))}
        
                
//     {/* Cold Plunge History stats - Drawer*/}
//     <ThemedView>
//       <DrawerLayoutAndroid
//         ref={drawer}
//         drawerWidth={300}
//         drawerPosition={drawerPosition}
//         renderNavigationView={navigationView}>

//         <View style={styles.drawerContainer}>
//           <Text style={styles.drawerParagraph}>
//             Drawer on the {drawerPosition}!
//           </Text>
//           <Button
//             title="Change drawer position"
//             onPress={() => changeDrawerPosition()}
//           />
//           <Text style={styles.drawerParagraph}>
//             Swipe from the side or press button below
//           </Text>
//           <Button
//             title="Open drawer"
//             onPress={() => drawer.current?.openDrawer()}
//           />
//         </View>
//       </DrawerLayoutAndroid>
//       </ThemedView>

//     </ParallaxScrollView>
//   );
}




















// #############################################################
// Styles
// #############################################################
const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  drawerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  drawerParagraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputTextInput: {
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
  }
});
// #############################################################
