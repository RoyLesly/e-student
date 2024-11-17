import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../../../constants";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuth } from "@/context/authContext";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex gap-2 items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="h-6 w-6"
      />
      <Text
        className={`${focused ? "font-semibold text-[17px] text-teal-700" : "text-slate-400 font-semibold text-[14px]"} italic`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { theme } = useAuth();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect href="/sign-in" />;
  // if (!false && !true) return <Redirect href="/sign-in" />;

  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#179892",
        tabBarInactiveTintColor: "#003330",
        tabBarShowLabel: false,
        tabBarStyle: {
          fontSize: hp(4),
          backgroundColor: "#fff",
          borderTopWidth: hp(0.1),
          borderTopColor: "#fff",
          margin: hp(2),
          height: hp(8),
          borderRadius: hp(3),
          elevation: 5,
          shadowColor: '#52006A',
        },
      }}
    >

      <Tabs.Screen
        name="TabMenu"
        options={{
          title: "Menu",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Menu"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="TabCourses"
        options={{
          title: "My Courses",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.play}
              color={color}
              name="My Courses"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="TabChat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.upload}
              color={color}
              name="Chat"
              focused={focused}
            />
          ),
        }}
      />


    </Tabs>


  );
};

export default TabLayout;
