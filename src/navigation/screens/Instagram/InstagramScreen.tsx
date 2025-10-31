import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

// Halloween palette
const halloweenColors = {
  accent: "#ffae00", // pumpkin orange
  accentAlt: "#7A0CFF", // spooky purple
  surface: "#0b0b0f",
  border: "#2a1a12",
  muted: "#aaa",
};

const icons = {
  bigPlus: require("./instagramIcons/big-plus.png"),
  heart: require("./instagramIcons/heart.png"),
  dots: require("./instagramIcons/dots.png"),
  person: require("./instagramIcons/person.png"),
  stopSound: require("./instagramIcons/stop-sound.png"),
  comment: require("./instagramIcons/comment.png"),
  send: require("./instagramIcons/send.png"),
  share: require("./instagramIcons/share.png"),
  home: require("./instagramIcons/home.png"),
  search: require("./instagramIcons/search.png"),
  smallPlus: require("./instagramIcons/small-plus.png"),
  down: require("./instagramIcons/down.png"),
  play: require("./instagramIcons/play.png"),
  instagramLogo: require("./instagramIcons/instagram-logo.png"),
  send2: require("./instagramIcons/share2.png"),
  instagramLogo2: require("./instagramIcons/hallowenInstagramLogo.png"),
  witchHat: require("./instagramIcons/witch-hat.png"),
  happyFace: require("./instagramIcons/happy-face.png"),
  spider: require("./instagramIcons/spider.png"),
  zombie: require("./instagramIcons/zombie.png"),
  ghost: require("./instagramIcons/ghost.png"),
  h1: require("./instagramIcons/h1.jpg"),
  h2: require("./instagramIcons/h2.jpg"),
  h3: require("./instagramIcons/h3.png"),
  h4: require("./instagramIcons/h4.png"),
  blodyC: require("./instagramIcons/blodyC.png"),
  blodyC2: require("./instagramIcons/blodyC2.png"),
  bats: require("./instagramIcons/bats.png"),
  cat: require("./instagramIcons/black-evil-cat.png"),
  heartG: require("./instagramIcons/heartG.png"),
  save2: require("./instagramIcons/save2.png"),
  ghost_2: require("./instagramIcons/ghost_2.png"),
  p2: require("./instagramIcons/p2.png"),
  p3: require("./instagramIcons/p3.png"),
  dots_2: require("./instagramIcons/dots_2.png"),
};

const profileImages = {
  myImage: require("./instagramIcons/my_image.jpg"),
  person1: require("./instagramIcons/randpom-person-1.jpg"),
  person2: require("./instagramIcons/randpom-person-2.jpg"),
  person3: require("./instagramIcons/randpom-person-3.jpg"),
  person4: require("./instagramIcons/randpom-person-4.jpg"),
  person5: require("./instagramIcons/randpom-person-5.jpg"),
  person6: require("./instagramIcons/randpom-person-6.jpg"),
};
const storiesData = [
  {
    id: "1",
    username: "Your story",
    isUserStory: true,
    image: profileImages.myImage,
  },
  {
    id: "2",
    username: "emma.wilson",
    isUserStory: false,
    image: profileImages.person1,
  },
  {
    id: "4",
    username: "sophiamartinez",
    isUserStory: false,
    image: profileImages.person3,
  },
  {
    id: "5",
    username: "liam_davis",
    isUserStory: false,
    image: profileImages.person4,
  },
  {
    id: "6",
    username: "olivia.brown",
    isUserStory: false,
    image: profileImages.person5,
  },
  {
    id: "3",
    username: "jackson_lee",
    isUserStory: false,
    image: profileImages.person2,
  },
];

const postsData = [
  {
    id: "1",
    username: "oleg_shkarpeta",
    location: "London, UK",
    profileImage: icons.h1,
    postImage: icons.h3,
    likes: 1092,
    caption: "Living my best life in the city 🌆 Can't believe this view!",
    hashtags: "#london #citylife #vibes",
  },
  {
    id: "2",
    username: "emma.wilson",
    location: "Paris, France",
    profileImage: icons.h2,
    postImage: icons.h4,
    likes: 2845,
    caption: "Captured this magical moment at golden hour 🌅✨",
    hashtags: "#travel #sunset #paris",
  },
];

export const InstagramScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingTop:
            Platform.OS === "android"
              ? (StatusBar.currentHeight || 0) + 10
              : 50,
          paddingBottom: 10,
          borderBottomWidth: 0.5,
          borderBottomColor: halloweenColors.border,
        }}
      >
        <Image
          source={icons.instagramLogo2}
          style={{ width: 120, height: 40, tintColor: halloweenColors.accent, objectFit: "cover" }}
          resizeMode="contain"
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => console.log("New Post")}
            style={{ padding: 5 }}
          >
            <Image
              source={icons.cat}
              style={{ width: 24, height: 24, tintColor: halloweenColors.accent }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Activity")}
            style={{ padding: 5, marginLeft: 10 }}
          >
            <Image
              source={icons.bats}
              style={{ width: 24, height: 24, tintColor: halloweenColors.accent }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: 10, maxHeight: 100 }}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        >
          {storiesData.map((story) => (
            <View key={story.id} style={{ alignItems: "center", width: 80 }}>
              <LinearGradient
                colors={
                  story.isUserStory
                    ? ["#3a3a3a", "#555555"]
                    : [halloweenColors.accent, halloweenColors.accentAlt]
                }
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 4,
                  position: "relative"
                }}
              >
                <Image
                  source={story.image}
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: 33,
                  }}
                  accessibilityLabel={`${story.username}'s story`}
                />
              </LinearGradient>
              <Image
                source={icons.witchHat}
                style={{ width: 40, height: 40, position: "absolute", top: -15, left: 25, zIndex: 1000,transform: [{ rotateZ: "15deg" }] }}
              />
                               <Image
                  source={icons.blodyC2}
                  style={{
                    width: 120,
                    height: 120,
                    position: "absolute",
                    top: -20,
                    borderRadius: 33,
                    zIndex: 1,
                  }}
                />
              {story.isUserStory && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    backgroundColor: halloweenColors.accent,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: halloweenColors.border,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icons.smallPlus}
                    style={{ width: 12, height: 12, tintColor: "#000" }}
                  />
 
                </View>
              )}
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  maxWidth: 70,
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {story.username}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ height: 0.5, backgroundColor: halloweenColors.border }} />

        {postsData.map((post, index) => (
          <View key={post.id}>
            {index > 0 && (
              <View
                style={{
                  height: 0.5,
                  backgroundColor: halloweenColors.border,
                  marginVertical: 10,
                }}
              />
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={post.profileImage}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    marginRight: 8,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    backgroundColor: "#ddd",
                  }}
                  accessibilityLabel={`${post.username} profile picture`}
                />
                   <Image
                  source={icons.blodyC}
                  style={{
                    width: 40,
                    height: 40,
                    left: -5,
                    position: "absolute",
                  }}
                  accessibilityLabel={`${post.username} profile picture`}
                />
                <View>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 14, color: "#fff" }}
                  >
                    {post.username}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#aaa", marginTop: -2 }}>
                    {post.location}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => console.log("Post Menu")}
                style={{ padding: 5 }}
              >
                <Image
                  source={icons.dots}
                  style={{ width: 20, height: 20, tintColor: halloweenColors.accent }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: width,
                height: width * 1.5,
                backgroundColor: "#000",
                position: "relative",
              }}
            >
              <Image
                source={post.postImage }
                style={{ width: "100%", height: "100%" }}
                accessibilityLabel="Post content"
                resizeMode="cover"
              />
              {/** Spooky corner emoji overlay */}
              <Text
                style={{
                  position: "absolute",
                  top: 10,
                  left: 12,
                  fontSize: 28,
                  textShadowColor: "rgba(0,0,0,0.6)",
                  textShadowRadius: 6,
                }}
              >
                🎃
              </Text>
              <View
                style={{
                  position: "absolute",
                  bottom: 15,
                  right: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "95%",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => console.log("Viewers")}
                  style={{
                    backgroundColor: "#2b3036cc",
                    padding: 10,
                    borderRadius: 50,
                  }}
                >
                  <Image
                    source={icons.p3}
                    style={{ width: 12, height: 12, tintColor: halloweenColors.accent }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log("Volume")}
                  style={{
                    backgroundColor: "#2b3036cc",
                    padding: 10,
                    borderRadius: 50,
                  }}
                >
                  <Image
                    source={icons.ghost_2}
                    style={{ width: 12, height: 12, tintColor: halloweenColors.accent }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                paddingVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: width / 3.5,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => console.log("Like")}
                  style={{ padding: 5 }}
                >
                  <Image
                    source={icons.heartG}
                    style={{ width: 24, height: 24, tintColor: halloweenColors.accent }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log("Comment")}
                  style={{ padding: 5 }}
                >
                  <Image
                    source={icons.comment}
                    style={{ width: 24, height: 24, tintColor: halloweenColors.accent }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log("Share")}
                  style={{ padding: 5 }}
                >
                  <Image
                    source={icons.send2}
                    style={{ width: 24, height: 24, tintColor: halloweenColors.accent }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => console.log("Save")}
                style={{ padding: 5 }}
              >
                <Image
                  source={icons.save2}
                  style={{ width: 24, height: 24, tintColor: halloweenColors.accent }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  marginBottom: 4,
                  color: "#fff",
                }}
              >
                {post.likes.toLocaleString()} likes
              </Text>
              <Text style={{ fontSize: 14, color: "#fff" }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 14, color: "#fff" }}
                >
                  {post.username}
                </Text>{" "}
                {post.caption}{" "}
                <Text style={{ color: halloweenColors.accent }}>{post.hashtags}</Text>
              </Text>
            </View>
          </View>
        ))}

        <View style={{ height: 50 }} />
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 8,
          borderTopWidth: 0.5,
          borderTopColor: halloweenColors.border,
        }}
      >
        <TouchableOpacity
          onPress={() => console.log("Home")}
          style={{ padding: 5 }}
        >
          <Image
            source={icons.happyFace}
            style={{ width: 24, height: 24, tintColor: halloweenColors.accent }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Search")}
          style={{ padding: 5 }}
        >
          <Image
            source={icons.zombie}
            style={{ width: 24, height: 24, tintColor: halloweenColors.accent }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Reels")}
          style={{ padding: 5 }}
        >
          <Image
            source={icons.spider}
            style={{ width: 24, height: 24, tintColor: halloweenColors.accent }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Shop")}
          style={{ padding: 5 }}
        >
          <Image
            source={icons.ghost}
            style={{ width: 24, height: 24, tintColor: halloweenColors.accent }}
          />
        </TouchableOpacity>
        <Image
          source={profileImages.myImage}
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: 2,
            borderColor: halloweenColors.accent,
            backgroundColor: "#ddd",
          }}
          accessibilityLabel="Profile"
        />
      </View>
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      >
        <Image
          source={require("./instagramIcons/textureHallowen.png")}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", opacity: 0.35 }}
        />
      </View>
    </View>
  );
};
