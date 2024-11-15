import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { useAuth } from "../../../context/authContext";
import { icons } from "../../../constants"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const TabIcon = ({ icon, name, focused }) => {

  const { theme } = useAuth()
  return (
    <View className="flex items-center justify-center">
      <Image
      style={{ height: hp(5), width: wp(5)}}
        source={icon}
        resizeMode="contain"
        tintColor={focused ? theme.tab.active : theme.tab.inActive }
      />
      <Text
      style={{ color: focused ? theme.tab.active : theme.tab.inActive  }}

        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { isAuthenticated, theme } = useAuth();

  if (!isAuthenticated) return <Redirect href="/Login" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: hp(7),
          },
        }}
      >

        <Tabs.Screen
          name="Home"
          options={{
            title: "home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="MyProfileLecturer"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="MyCoursesLecturer"
          options={{
            title: "Courses",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.upload}
                color={color}
                name="Courses"
                focused={focused}
              />
            ),
          }}
        />

        
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
