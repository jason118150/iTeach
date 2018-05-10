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
})

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.selectClass = this.selectClass.bind(this)
  }

  selectClass(title, teacher, color) {
    Alert.alert(
      ''.concat('是否加入 ', teacher, ' 老師所開設的', title),
      '',
      [
        { text: '否', onPress: () => { console.log('Cancel Pressed') }, style: 'cancel' },
        { text: '是', onPress: () => { this.registerClass(title, color) }, style: 'default' },
      ],
      { cancelable: false },
    )
  }

  registerClass(title, color) {
    this.props.classListAction.add(title, color)
  }

  getCourseInfo() {
    // return Object.keys(this.props.peers).map(i => this.props.peers[i].info)
    return Object.keys(this.props.peers).map(i => this.props.peers[i].info).filter(item => item.identity === 'teacher' && item.releasing === true)
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
            data={ this.getCourseInfo() }
            keyExtractor={item => item.course}
            renderItem={({ item }) => (
              <SearchClassItem
                title={item.course}
                teacher={item.username}
                color={item.color}
                onPress={() => {
                  this.selectClass(
                    item.course,
                    item.username,
                    item.color,
                  )
                }}
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
  status: PropTypes.string.isRequired,
  peers: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
