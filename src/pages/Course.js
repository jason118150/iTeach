import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import CloseImage from '../../asset/close.png'
import styles from './styles/Course.styles'
import navAction from '../actions/nav.action'
import courseItemAction from '../actions/courseItem.action'
import CourseItem from '../components/CourseItem'
import CourseItemData from '../components/CourseItemData'

const mapStateToProps = state => ({
  status: state.account.status,
  ...state,
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.classMenu()) },
    onPress: (id) => { dispatch(navAction.onlinePeerList()) },
  },
  courseItemAction: {
    setName: (id) => { dispatch(courseItemAction.setName(id)) },
  },
})

class Course extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress(id) {
    if(id==0){
      this.props.nav.onlinePeerList
    }
  }

  render() {
    const { courseItem } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>
            {this.props.course}
          </Text>
          <TouchableHighlight style={styles.addSearchIconContainer} onPress={this.props.navAction.onExit} underlayColor='#3A8FB7'>
            <Image style={styles.addSearchIcon} source={CloseImage} />
          </TouchableHighlight>
        </View>
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
                onPress={this.props.courseItemAction.setName}/>
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
  }).isRequired,
  courseItemAction: PropTypes.shape({
    setName: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.string.isRequired,
  courseItem: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
