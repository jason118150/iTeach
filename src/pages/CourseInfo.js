import React, { Component } from 'react';
import {
	View,
	Text,
	Linking
} from 'react-native';
import Button from '../components/Button';
import styles from './styles/CourseInfo.styles'
import Header from '../components/Header';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
	classMenu: state.classMenu,
	courseName: state.course,
});

class CourseInfo extends Component {
  
  state = {
  	courseLink: 'https://my.ntu.edu.tw/',
  }
	render() {
		const { classMenu, courseName } = this.props;
		const courseInfo = classMenu.classList.find((item) => item.title === courseName);
		const { color } = courseInfo;
		return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View style={[styles.colorBox, { backgroundColor: color}]} />
            <Text style={styles.courseName} numberOfLines={1}>
              {courseName}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoRowContainer}>
              <Text style={styles.text}>
                開課學期 ：107學年上學期
              </Text>
            </View>
            <View style={styles.infoRowContainer}>
              <Text style={styles.text}>
                上課教室 ：電二１４４
              </Text>
            </View>
            <View style={styles.infoRowContainer}>
              <Text style={styles.text}>
                上課時間 ：星期一１８:３０ＰＭ
              </Text>
            </View>
            <View style={styles.infoRowContainer}>
              <Text style={styles.text} onPress={() => Linking.openURL(this.state.courseLink)}>
                課程網站 ：{this.state.courseLink}
              </Text>
            </View>
          </View>
          <View style={styles.infoRowContainer}>
            <Button label='修改' onPress={() => console.log('pressed')} />
          </View>
        </View>
        	
      </View>
		)
	}
}

export default connect(mapStateToProps)(CourseInfo);