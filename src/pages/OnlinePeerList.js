import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
// TODO: online peer list style
import styles from './styles/OnlinePeerList.styles'
import navAction from '../actions/nav.action'
import mockData from '../../asset/mockData.json'
import OnlineListItem from '../components/OnlineListItem'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
  },
})

class OnlinePeerList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>
            在線名單
          </Text>
          <TouchableHighlight style={styles.addSearchIconContainer} onPress={this.props.navAction.onExit} underlayColor='#3A8FB7'>
            <Image style={styles.addSearchIcon} source={CloseImage} />
          </TouchableHighlight>
        </View>
        <View style={styles.subtitleBar}>
          <Text style={styles.subtitle}>
            在線
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <FlatList
            style={styles.list}
            data={mockData.payload}
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <OnlineListItem
                title={item.title}
                color={item.color}
              />
            )}
          />
        </View>
        <View style={styles.subtitleBar}>
          <Text style={styles.subtitle}>
            離線
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <FlatList
            style={styles.list}
            data={mockData.payload}
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <OnlineListItem
                title={item.title}
                color={item.color}
              />
            )}
          />
        </View>
      </View>
    )
  }
}

OnlinePeerList.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlinePeerList)
