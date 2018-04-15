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
import mockNewClass from '../../asset/mockNewClass.json'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state.classMenu,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    onExit: () => { dispatch(navAction.classMenu()) },
  },
})

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.selectClass = this.selectClass.bind(this)
  }

  selectClass(title, teacher) {
    Alert.alert(
      ''.concat('是否加入', teacher, '老師所開設的', title),
      '',
      [
        { text: '否', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: '是', onPress: () => console.log('OK Pressed'), style: 'default' },
      ],
      { cancelable: false },
    )
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
            data={mockNewClass.newClasses}
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <SearchClassItem
                title={item.title}
                teacher={item.teacher}
                color={item.color}
                onPress={() => this.selectClass(item.title, item.teacher)}
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
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
