import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  NativeModules,
  Animated,
  Easing,
} from "react-native";
import musics from "./album/albums";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.state = {
      filter: [],
      lastData: [],
      loading: false,
      
    };
  }
  

  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  componentDidMount() {
    this.fetchData();
    this.animate();
  }

  fetchData = () => {
    let lastData = this.state.lastData;
    fetch("https://randomuser.me/api/?results=10")
      .then(response => response.json())
      .then(data => {
        this.setState(
          { lastData: [...lastData, ...data.results], loading: true },
          () => this.setState({ filter: this.state.lastData })
        );
      });
  };

  changeColor() {
    this.setState({changeColor: !this.state.changeColor})
  }

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <ScrollView>
            <View style={{ marginBottom: 100, marginTop: 100 }}>
              <Text style={styles.title}>Browse Music</Text>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>

              <Animated.View   style={{opacity,height: 30, width: 30, backgroundColor: 'white',alignItems: 'center',justifyContent:'center'}} >
                <Image source={require("./picture/radio.png")}  />       
                </Animated.View>

                <Text style={styles.pm}>Discover</Text>
             
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>
              <Animated.View   style={{opacity,height: 30, width: 30, backgroundColor: 'white',alignItems: 'center',justifyContent:'center'}} >
                <Image source={require("./picture/around.png")} />
                </Animated.View>
                <Text style={styles.pm}>Around Me</Text>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>
              <Animated.View   style={{opacity,height: 30, width: 30, backgroundColor: 'white',alignItems: 'center',justifyContent:'center'}} >
                <Image source={require("./picture/music.png")} />
                </Animated.View>
                <Text style={styles.pm}>Turn The Table</Text>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>
              <Animated.View   style={{opacity,height: 30, width: 30, backgroundColor: 'white',alignItems: 'center',justifyContent:'center'}} >
                <Image source={require("./picture/headphones.png")} />
                </Animated.View>
                <Text style={styles.pm}>Co Play</Text>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>
              <Animated.View   style={{opacity,height: 30, width: 30, backgroundColor: 'white',alignItems: 'center',justifyContent:'center'}} >
                <Image source={require("./picture/cd.png")} />
                </Animated.View>
                <Text style={styles.pm}>Daily Digest</Text>
              </View>
            </View>
            <View style={{ marginBottom: 100, marginTop: 100 }}>
              <Text style={styles.title}>Browse Music</Text>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>

              <Animated.View   style={{opacity,height: 30, width: 30, backgroundColor: 'white',alignItems: 'center',justifyContent:'center'}} >
                <Image source={require("./picture/radio.png")}  />       
                </Animated.View>

                <Text style={styles.pm}>Discover</Text>
             
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>
              <Animated.View   style={{opacity,height: 30, width: 30, backgroundColor: 'white',alignItems: 'center',justifyContent:'center'}} >
                <Image source={require("./picture/around.png")} />
                </Animated.View>
                <Text style={styles.pm}>Around Me</Text>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>
              <Animated.View   style={{opacity,height: 30, width: 30, backgroundColor: 'white',alignItems: 'center',justifyContent:'center'}} >
                <Image source={require("./picture/music.png")} />
                </Animated.View>
                <Text style={styles.pm}>Turn The Table</Text>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>
              <Animated.View   style={{opacity,height: 30, width: 30, backgroundColor: 'white',alignItems: 'center',justifyContent:'center'}} >
                <Image source={require("./picture/headphones.png")} />
                </Animated.View>
                <Text style={styles.pm}>Co Play</Text>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 30 }}>
              <Animated.View   style={{opacity,height: 30, width: 30, backgroundColor: 'white',alignItems: 'center',justifyContent:'center'}} >
                <Image source={require("./picture/cd.png")} />
                </Animated.View>
                <Text style={styles.pm}>Daily Digest</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.main}>
          <View style={styles.header}>
            <Image
              resizeMode="stretch"
              source={require("./picture/music.jpg")}
              style={{ width: 1045, height: 350 ,position:'absolute'}}
            />
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{ flexDirection: "row",justifyContent:'center',marginBottom:10}}>
              <Image
                source={require("./picture/back.png")}
                // style={{paddingHorizontal:20}}
              />
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: "row",justifyContent:'center',marginBottom:10}}>
              <Image
                source={require("./picture/play.png")}
                style={{ marginHorizontal:30 }}
              />
               </TouchableOpacity>
               <TouchableOpacity style={{ flexDirection: "row",justifyContent:'center',marginBottom:10}}>
              <Image
                source={require("./picture/forward.png")}
                // style={{ width: 1045, height: 350 }}
              />
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.scroll}>
              <View style={styles.vertical}>
                <FlatList
                  data={this.state.filter}
                  keyExtractor={item => item.email}
                  renderItem={({ item }) => (
                    <View style={styles.list}>
                      <Image
                        source={{ uri: item.picture.large }}
                        style={{ width: 50, height: 50 }}
                      />
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          paddingTop: 5,
                          paddingLeft: 5
                        }}
                      >
                        {item.name.first}
                      </Text>
                      <Text>{item.name.last}</Text>
                      <Text>{item.phone}</Text>
                      <Text style={{ paddingRight: 10 }}>
                        {item.name.title}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={styles.flat}>
              <FlatList
                data={musics}
                keyExtractor={item => item.title}
                horizontal={true}
                renderItem={({ item }) => (
                  <View style={styles.box}>
                    <Image
                      source={item.image}
                      style={{ width: 140, height: 120 }}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        paddingTop: 5
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text>{item.title1}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  nav: {
    flex: 1,
    paddingLeft: 30,
    backgroundColor: "white"
  },
  main: {
    flex: 5,
    backgroundColor: "#edf1f4"
  },
  header: {
    height: 350,
    alignItems:'center',
    justifyContent:'flex-end',
   
  },
  footer: {
    // borderColor:'white',
    // borderWidth: 1,
    height: 500
  },
  scroll: {
    flex: 1
    // borderColor:'white',
    // borderWidth: 1,
  },
  flat: {
    flex: 1
    // borderColor:'white',
    // borderWidth: 1,
  },
  pm: {
    color: "black",
    fontSize: 18,
    paddingLeft: 25
  },
  box: {
    backgroundColor: "white",
    height: 200,
    width: 180,
    marginVertical: 15,
    marginHorizontal: 30,
    alignItems: "center",
    paddingTop: 10
  },
  vertical: {
    backgroundColor: "#edf1f4",
    height: 200,
    width: 970,
    marginVertical: 20,
    marginHorizontal: 30,
    alignItems: "center",
    paddingTop: 15
  },
  list: {
    flexDirection: "row",
    marginVertical: 5,
    // marginLeft:100,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    width: 960,
    backgroundColor: "white"
  },
  title:{
    fontSize:16,
  }
});
