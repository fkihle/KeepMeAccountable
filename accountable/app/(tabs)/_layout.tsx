import { Atom, Award, History } from '@tamagui/lucide-icons'
import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: theme.red10.val,
      tabBarStyle: {
        backgroundColor: theme.background.val,
        borderTopColor: theme.borderColor.val,
      },
      headerStyle: {
        backgroundColor: theme.background.val,
        borderBottomColor: theme.borderColor.val,
      },
      headerTintColor: theme.color.val,
      }}
    >
      <Tabs.Screen
      name="index"
      options={{
        title: 'Register Plunge',
        tabBarIcon: ({ color }) => <Atom color={color as any} />,
      }}
      />
      <Tabs.Screen
      name="history"
      options={{
        title: 'History',
        tabBarIcon: ({ color }) => <History color={color as any} />,
      }}
      />
      <Tabs.Screen
      name="results"
      options={{
        title: 'Results',
        tabBarIcon: ({ color }) => <Award color={color as any} />,
      }}
      />
    </Tabs>
  )
}
