import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'
import Scroll from './Scroll';

// 上拉加载
BScroll.use(Pullup)
BScroll.use(ObserveDOM)
BScroll.use(ObserveImage)

export {
  Scroll
}