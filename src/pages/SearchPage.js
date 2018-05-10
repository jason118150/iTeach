import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/ClassMenu.styles'
import navAction from '../actions/nav.action'
import SearchClassItem from '../components/SearchClassItem'
import classMenuAction from '../actions/classMenu.action'
import multiPeerAction from '../actions/multiPeer.action'
import courseAction from '../actions/course.action'
import courseInfoAction from '../actions/courseInfo.action'
// import mockNewClass from '../../asset/mockNewClass.json'

const mapStateToProps = state => ({
  status: state.account.status,
  peers: state.multiPeer.peers,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => {
      dispatch(navAction.classMenu())
      dispatch(multiPeerAction.student.stopSearch())
    },
  },
  classListAction: {
    add: (title, color) => {
      dispatch(classMenuAction.classList.add(title, color))
    },
  },
  courseAction: {
    joinCourse: (sender, title) => {     
      dispatch(multiPeerAction.backend.responseInvite(sender[0].invitationId, true))
      dispatch(multiPeerAction.student.stopSearch())
      dispatch(multiPeerAction.backend.onPeerConnected(sender[0].id, sender[0].info))
      dispatch(courseAction.setName(title)) 
    },
  },
  courseInfoAction: {
    save: (info) => { dispatch(courseInfoAction.save(info)) },
  },
})

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.selectClass = this.selectClass.bind(this)
    this.getCousreInfo = this.getCousreInfo.bind(this)
    this.saveCourseInfo = this.saveCourseInfo.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
  }

  selectClass(title, teacher, color) {
    Alert.alert(
      ''.concat('是否加入 ', teacher, ' 老師所開設的', title),
      '',
      [
        { text: '否', onPress: () => { console.log('Cancel Pressed') }, style: 'cancel' },
        { text: '是', onPress: () => { this.onConfirm(title, color) }, style: 'default' },
      ],
      { cancelable: false },
    )
  }

  onConfirm(title, color){
    this.saveCourseInfo(title, color)
    this.registerClass(title)
  }
  getCousreInfo() {
    return Object.keys(this.props.peers).map(peerId => this.props.peers[peerId].info)
  }


  saveCourseInfo(title, color){
    this.props.courseInfoAction.save(this.getCousreInfo()[0])
    this.props.classListAction.add(title, color)
  }

  registerClass(title){
    Alert.alert(''.concat('進入 ', title, ' 課程頁面'))     
    peer = Object.keys(this.props.peers).map(peerId => this.props.peers[peerId])
    this.props.courseAction.joinCourse(peer, title) 
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>
            搜尋課程
          </Text>
          <TouchableHighlight style={styles.addSearchIconContainer} onPress={this.props.navAction.onExit} underlayColor='#3A8FB7'>
            <Image
              style={styles.addSearchIcon}
              source={CloseImage}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={ this.getCousreInfo() }
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <SearchClassItem
                title={item.title}
                teacher={item.teacher}
                color={item.color}
                onPress={() => { this.selectClass(item.title, item.teacher, item.color) } }
              />
            )}
          />
          <View>
            <ActivityIndicator size="large" color="#3A8FB7" />
          </View>
        </View>
      </View>
    )
  }
}

SearchPage.propTypes = {
  navAction: PropTypes.shape({
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  classListAction: PropTypes.shape({
    add: PropTypes.func.isRequired,
  }).isRequired,
  courseAction: PropTypes.shape({
    joinCourse: PropTypes.func.isRequired,
  }).isRequired,
  courseInfoAction: PropTypes.shape({
    save: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
  peers: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
