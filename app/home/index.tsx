import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const Home = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const intervalRef = useRef(null);

  const slides = [
    {
      image: require('@/assets/images/fingerp.png'),
      text: '',
    },
    {
      image: require('@/assets/images/keyp.png'),
      text: '',
    },
    {
      image: require('@/assets/images/fasterp.png'),
      text: '',
    },
    
  ];

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      const nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({ x: nextSlide * width, animated: true });
    }, 2000);
  };

  useEffect(() => {
    startAutoSlide();

    return () => clearInterval(intervalRef.current);
  }, [currentSlide]);

  const handleScroll = (event) => {
    const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);

    // Reset the interval when user manually scrolls
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  return (
    <View style={styles.container}>
        {/* Logo and Banner Area */}
      <View style={styles.header}>
        <Image source={require('@/assets/images/ninepay.png')} style={styles.logo} />
        <Text style={styles.bannerText}>Aptos Payments Made Easy.</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View style={styles.slide} key={index}>
            <Image
              source={slide.image}
              style={[styles.image, slide.image === require('@/assets/images/fingerp.png') && styles.fingerImage]}
            />
            <Text style={styles.description}>{slide.text}</Text>
          </View>
        ))}
      </ScrollView>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.7 : 1 }
        ]}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    alignItems: 'center', // Center items horizontally
    marginTop: 100, // Adjust the margin as needed
    marginBottom: 0,
  },
  logo: {
    width: 500,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10, // Space between logo and text
  },
  bannerText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  slide: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  fingerImage: {
    width: "80%", // Adjust the width as needed
    resizeMode: "contain",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    color: "#fff",
  },
  button: {
    backgroundColor: "#9EDA6F",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,
    borderRadius: 36,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 19,
    fontWeight: "medium",
    textAlign: "center",
  },
});

export default Home;
