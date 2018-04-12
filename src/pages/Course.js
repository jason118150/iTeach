import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import DrawerImage from '../../asset/drawer.png'
import CloseImage from '../../asset/close.png'
import styles from './styles/Course.styles'
import nav from '../actions/nav'
import { getCourse } from '../actions/course'
import CourseItem from '../components/CourseItem'
import CourseItemData from '../components/CourseItemData'

const mapStateToProps = state => ({
  status: state.account.status,
  courseName: getCourse,
})

const mapDispatchToProps = dispatch => ({
  nav: {
    openDrawer: () => { dispatch(nav.openDrawer()) },
    // onExit: () => { dispatch(nav.classMenu()) },
  },
  /* classList: {
    set: async (classes) => { dispatch(await classMenu.classList.set(classes)) },
  }, */
})

class Course extends Component {
  render() {
    const ItemData = CourseItemData.filter(item => item.user.includes(this.props.status))
      .map(item => (
        <CourseItem
          key={item.title}
          title={item.title}
          imgSrc={item.imgSrc}
          clicked={item.clicked}/>
      ))

    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <TouchableHighlight style={styles.drawerIconContainer} onPress={this.props.nav.openDrawer} underlayColor='#E5F2FF'>
            <Image style={styles.drawerIcon} source={DrawerImage} />
          </TouchableHighlight>
          <Text style={styles.title}>
            {this.state.courseName}
          </Text>
          <TouchableHighlight style={styles.addSearchIconContainer} onPress={null} underlayColor='#E5F2FF'>
            <Image style={styles.addSearchIcon} source={CloseImage} />
          </TouchableHighlight>
        </View>
        <View style={styles.itemContainer}>
          {ItemData}
        </View>
      </View>
    )
  }
}

Course.propTypes = {
  nav: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    // onExit: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
