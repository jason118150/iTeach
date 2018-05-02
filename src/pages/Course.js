import React, { Component } from 'react'
import { connect } from 'react-redux'
<<<<<<< HEAD
import { View } from 'react-native'
=======
import {
  Alert,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
>>>>>>> Create multiPeer.action.js
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/Course.styles'
import navAction from '../actions/nav.action'
import courseItemAction from '../actions/courseItem.action'
import CourseItem from '../components/CourseItem'
import CourseItemData from '../components/CourseItemData'
<<<<<<< HEAD
import Appbar from '../components/Appbar'
=======
import multiPeerAction from '../actions/multiPeer.action'

>>>>>>> Create multiPeer.action.js

const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.classMenu()) },
    enterFeature: (id) => { dispatch(navAction.enterFeature(id)) },
  },
  courseItemAction: {
    setName: (id) => {
      dispatch(courseItemAction.setName(id))
    },
    onPress: (id, status = '', onclick = false) => {
      if (id === 0) {
        dispatch(navAction.onlinePeerList())
      } else if (id === 1 && status === 'teacher') {
        if (onclick === false) {
          dispatch(multiPeerAction.teacher.startRelease())
        } else {
          dispatch(multiPeerAction.teacher.stopRelease())
        }
      }
    },
  },
})

class Course extends Component {
  iconOnPress(id) {
    this.props.courseItemAction.setName(id)
    this.props.navAction.enterFeature(id)
  }
  render() {
    const { courseItem } = this.props
    return (
      <View style={styles.container}>
        <Appbar title={this.props.course.courseName}
          rightIcon={CloseImage}
          onRightPress={this.props.navAction.onExit}/>
        <View style={styles.itemContainer}>
          {CourseItemData.filter(item => item.user.includes(this.props.status))
            .map(item => (
              <CourseItem
                key={item.id} id={item.id}
                title={courseItem.courseItem[item.id].onclick
                  ? courseItem.courseItem[item.id].title[1]
                  : courseItem.courseItem[item.id].title[0]}
                imgSrc={courseItem.courseItem[item.id].onclick
                  ? courseItem.courseItem[item.id].imgSrc[1]
                  : courseItem.courseItem[item.id].imgSrc[0]}
<<<<<<< HEAD
                onPress={this.iconOnPress.bind(this)} />
=======
                onPress={
                  (id) => {
                    this.props.courseItemAction.setName(id)
                    this.props.courseItemAction.onPress(
                      id,
                      this.props.status,
                      courseItem.courseItem[item.id].onclick,
                    )
                  }
                }/>
>>>>>>> Create multiPeer.action.js
            ))
          }
        </View>
      </View>
    )
  }
}

Course.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    enterFeature: PropTypes.func.isRequired,
  }).isRequired,
  courseItemAction: PropTypes.shape({
    setName: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.object.isRequired,
  courseItem: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
