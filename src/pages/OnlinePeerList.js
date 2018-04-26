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
import styles from './styles/OnlinePeerList.styles'
import navAction from '../actions/nav.action'
import SearchClassItem from '../components/SearchClassItem'
// import classMenuAction from '../actions/classMenu.action'
import mockNewClass from '../../asset/mockNewClass.json'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state.onlinePeerList,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => { dispatch(navAction.classMenu()) },
  },
})

class OnlinePeerList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>
            在線名單
          </Text>
          <TouchableHighlight style={styles.addSearchIconContainer} onPress={this.props.navAction.onExit} underlayColor='#3A8FB7'>
            <Image
              style={styles.addSearchIcon}
              source={CloseImage}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
          {/* <FlatList
            style={styles.list}
            data={mockNewClass.newClasses}
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <SearchClassItem
                title={item.title}
                teacher={item.teacher}
                color={item.color}
                onPress={() => { this.selectClass(item.title, item.teacher, item.color) } }
              />
            )}
          /> */}
          {/* <View>
            <ActivityIndicator size="large" color="#3A8FB7" />
          </View> */}
        </View>
      </View>
    )
  }
}

OnlinePeerList.propTypes = {
  navAction: PropTypes.shape({
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  // classListAction: PropTypes.shape({
  //   add: PropTypes.func.isRequired,
  // }).isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlinePeerList)