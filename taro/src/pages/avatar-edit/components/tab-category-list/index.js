import Taro from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'

import './styles.styl'

export default class ImageChoose extends Taro.Component {
  config = {
    component: true
  }

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    categoryList: [],
    chooseShape: () => {}
  }
  

  constructor(props) {
    super(props)
    this.state = {
      currentTabIndex: 0
    }
  }


  chooseTab = (tabIndex) => {
    this.setState({
      currentTabIndex: tabIndex
    })
  }

  render() {
    const { categoryList, chooseShape } = this.props
    const { currentTabIndex } = this.state

    return (
      <View className='tab-wrap'>
        <View className='tab-hd'>
          {
            categoryList.map((item, itemIndex) => {
              const { _id, categoryName } = item
              return (
                <View
                  key={_id}
                  className={`tab-hd-item ${currentTabIndex === itemIndex ? 'tab-hd-active' : ''}`}
                  onClick={this.chooseTab.bind(this, itemIndex)}
                >
                  {
                    categoryName
                  }
                </View>
              )
            })
          }
        </View>
        <View className='tab-bd'>
          {
            categoryList.map((item, itemIndex) => {
              return (
                <View key={item.name} style={{ display: currentTabIndex === itemIndex ? ' block' : 'none' }}>
                  <ScrollView className="shape-select-wrap" scrollX>
                    {
                      item.shapeList.map((shapeItem) => {
                        const { imageUrl, _id: shapeId } = shapeItem 
                        return (
                          <Image
                            className={`tab-bd-image  tab-bd-image-${item.name}`}
                            key={shapeId}
                            src={imageUrl}
                            onClick={() => chooseShape({ ...shapeItem, shapeId })}
                          />
                        )
                      })
                    }
                  </ScrollView>
                </View>
              )
            })
          }
        </View>

      </View>
    )
  }
}