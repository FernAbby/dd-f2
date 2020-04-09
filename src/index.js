import F2 from '@antv/f2';
import mixin from '/utils/mixin';
Component({
  mixins: [mixin],
  data: {},
  props: {
    onInit: () => {},
    id: 'canvas',
  },
  didMount() {
    const { isOpen, treeData } = this.props;
    this.setData({
      expend: isOpen,
      isLeaf: !(treeData.childs && treeData.childs.length)
    });
  },
  didUpdate() {
    const { treeData } = this.props;
    this.setData({
      isLeaf: !(treeData.childs && treeData.childs.length)
    });
  },
  didUnmount() {},
  methods: {
    touchStart() {

    },
    touchMove() {

    },
    touchEnd() {

    }
  }
});
