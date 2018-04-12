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
import DrawerImage from '../../asset/drawer.png'
import SearchImage from '../../asset/search.png'
import AddImage from '../../asset/add.png'
import styles from './styles/ClassMenu.styles'
import nav from '../actions/nav'
import classMenu from '../actions/classMenu'
import ClassItem from '../components/ClassItem'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state.classMenu,
})

const mapDispatchToProps = dispatch => ({
  nav: {
    openDrawer: () => { dispatch(nav.openDrawer()) },
  },
  classList: {
    set: async (classes) => { dispatch(await classMenu.classList.set(classes)) },
  },
})

class ClassMenu extends Component {
  constructor(props) {
    super(props)
    this.cancelAllDelete = this.cancelAllDelete.bind(this)
    this.deleteClass = this.deleteClass.bind(this)
    this.classOnPress = this.classOnPress.bind(this)
  }

  cancelAllDelete(without) {
    Object.values(this.classRef).forEach((ref) => {
      // Scroll back the reference of ScrollView inside ClassItem
      if (ref.ref !== without) {
        ref.ref.scrollTo({ x: 0 })
      }
    })
  }

  async deleteClass(title) {
    await this.props.classList.set(this.props.classes.filter(item => item.title !== title))
    delete this.classRef[title]
  }

  async classOnPress(title, color) {
    if (this.props.classes[0].title !== title) {
      const classes = this.props.classes.filter(item => item.title !== title)
      classes.splice(0, 0, { title, color })
      await this.props.classList.set(classes)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <TouchableHighlight style={styles.drawerIconContainer} onPress={this.props.nav.openDrawer} underlayColor='#E5F2FF'>
            <Image style={styles.drawerIcon} source={DrawerImage} />
          </TouchableHighlight>
          <Text style={styles.title}>
            課程選單
          </Text>
          <TouchableHighlight style={styles.addSearchIconContainer} onPress={null} underlayColor='#E5F2FF'>
            <Image style={styles.addSearchIcon} source={this.props.status === 'student' ? AddImage : SearchImage} />
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
          <View style={[styles.welcomeMsgContainer, { display: this.props.classes.length === 0 ? 'flex' : 'none' }]}>
            <Text style={styles.welcomeMsg}>{`
              (歡迎訊息)
              歡迎使用 iTeach
              請利用右上方按鈕`}{this.props.status === 'teacher' ? '新增' : '搜尋'}課程
            </Text>
          </View>
          <FlatList
            style={[styles.list, { display: this.props.classes.length !== 0 ? 'flex' : 'none' }]}
            onScrollBeginDrag={this.cancelAllDelete}
            data={this.props.classes}
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <ClassItem
                title={item.title}
                color={item.color}
                deleteClass={this.deleteClass}
                cancelAllDelete={this.cancelAllDelete}
                onPress={this.classOnPress}
                ref={(ref) => {
                  this.classRef = { ...this.classRef, [item.title]: ref }
                }}/>
            )} />
        </View>
      </View>
    )
  }
}

ClassMenu.propTypes = {
  nav: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
  classList: PropTypes.shape({
    set: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
  classes: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassMenu)
