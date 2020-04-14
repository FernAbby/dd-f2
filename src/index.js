import F2 from '@antv/f2';
import mixin from '../utils/mixin';

function wrapEvent(e) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function() {};
  }
  return e;
}

Component({
  mixins: [mixin],
  data: {},
  props: {
    onInit: () => {},
    id: 'canvas',
  },
  didMount() {
    const { id } = this.props;
    const config = this.initChart(id);
    const chart = this.props.onInit(F2, config);
    if (chart) {
      this.canvasEl = chart.get('el');
    }
  },
  didUpdate(prevProps) {},
  didUnmount() {},
  methods: {
    touchStart(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) return;
      canvasEl.dispatchEvent('touchstart', wrapEvent(e));
    },
    touchMove(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) return;
      canvasEl.dispatchEvent('touchmove', wrapEvent(e));
    },
    touchEnd(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) return;
      canvasEl.dispatchEvent('touchend', wrapEvent(e));
    }
  }
});
