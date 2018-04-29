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
import searchPageAction from '../actions/searchPage.action'
import mockNewClass from '../../asset/mockNewClass.json'

const mapStateToProps = state => ({
  status: state.account.status,
  // peers: state.multipeer.peers
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => {
      dispatch(navAction.classMenu())
      dispatch(searchPageAction.multipeer.stopSearch())
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
    // this.getCousreInfo = this.getCousreInfo.bind(this)
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

  getCousreInfo() {
    // const { peers } = this.props.peers
    // return Object.keys(peers).map(peerId => peers[peerId].info)
    return [{
      title: '小海豚MV舞蹈課程123',
      teacher: '蔡丞昊',
      color: 'red',
    }, {
      title: '印尼文化史',
      teacher: '宋玉美',
      color: 'blue',
    }, {
      title: '佛教經義賞析',
      teacher: '陳秉珏',
      color: 'green',
    }]
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
            data={ mockNewClass.newClasses }
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
  status: PropTypes.string.isRequired,
  // peers: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
