import F2Context from './f2Context';

const systemInfo = dd.getSystemInfoSync();
const rpxRatio = getRpxRatio(systemInfo.screenWidth);
function getRpxRatio(screenWidth) {
  return 2 * (screenWidth / 375);
}

export default {
  data: {
    BAR_SIZE: 60,
    colors: [
      '#41A9FF', '#13C2C2','#FACC14', '#F04864',
      '#2FC25B', '#D66BCA', '#668B8B', '#CD7054',
      '#8E77ED', '#2f9833', '#7EA2E6', '#E5875B',
      '#556B2F', '#905a3d', '#3436C7', '#50577D',
    ],
    systemInfo: {
      ...systemInfo, rpxRatio, // rpx像素比
    },
  },
  methods: {
    initChart(id) {
      return new Promise((resolve, reject) => {
        if (id) {
          dd.createSelectorQuery()
            .select(`#${id}`)
            .boundingClientRect()
            .exec((res) => {
              if (res && res[0]) {
                const { pixelRatio } = systemInfo;
                let canvasWidth = res[0].width;
                let canvasHeight = res[0].height;

                this.setData({
                  canvas: {
                    width: canvasWidth * pixelRatio,
                    height: canvasHeight * pixelRatio
                  }
                }, () => {
                  const chartContext = dd.createCanvasContext(id);
                  // chartContext.scale(pixelRatio, pixelRatio);
                  const context = F2Context(chartContext);
                  resolve({ context, canvasWidth, canvasHeight, id });
                });
              }
            });
        } else {
          reject({errCode: 1, message: 'id不能为空'});
        }
      });
    },
  },
}
