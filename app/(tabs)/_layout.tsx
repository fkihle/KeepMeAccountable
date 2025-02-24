import { Atom, Award, History } from '@tamagui/lucide-icons'
import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: theme.accent4.val,
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
        title: '',
        tabBarIcon: ({ color }) => <Atom color={color as any} />,
      }}
      />
      <Tabs.Screen
      name="history"
      options={{
        title: '',
        tabBarIcon: ({ color }) => <History color={color as any} />,
      }}
      />
      <Tabs.Screen
      name="results"
      options={{
        title: '',
        tabBarIcon: ({ color }) => <Award color={color as any} />,
      }}
      />
    </Tabs>
  )
}
