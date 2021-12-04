<template>
  <div ref="wrapRef" :style="{ height, width }"></div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, onMounted } from 'vue';
import { GetLocationApi } from '@/api';

export default defineComponent({
  name: 'BaiduMap',
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'calc(100vh - 478px)',
    },
  },
  setup(props, context) {
    const wrapRef = ref<HTMLDivElement | null>(null);
    const _drawing = ref<boolean>(false);
    const _overlay = ref<any>(null);
    var drawingManager: any;
    const _dmDiv = ref<any>(null);
    const _selected_field = ref<any>(null);
    context.emit('selected-field', null);

    function initMap() {
      const BMap = window.BMap;
      const wrapEl = unref(wrapRef);
      if (!wrapEl) return;
      const map = new BMap.Map(wrapEl, { enableMapClick: false });
      const point = new BMap.Point(121.0, 31.0);
      map.centerAndZoom(point, 10);
      map.setMinZoom(10); //设置地图最小缩放等级
      map.setMaxZoom(18); //设置地图最大缩放等级

      const BMapLib = window.BMapLib;
      const BMAP_ANCHOR_TOP_RIGHT = window.BMAP_ANCHOR_TOP_RIGHT;
      const BMAP_DRAWING_CIRCLE = window.BMAP_DRAWING_CIRCLE;

      const styleOptions = {
        strokeColor: 'red',
        fillColor: 'red',
        strokeWeight: 3,
        strokeOpacity: 0.4,
        fillOpacity: 0.2,
        strokeStyle: 'dashed',
      };
      drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false,
        enableDrawingTool: false,
        circleOptions: styleOptions,
      });
      drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
      drawingManager.addEventListener(
        'circlecomplete',
        (e: any, overlay: any) => {
          _overlay.value = overlay;
          _dmDiv.value.innerHTML = '重新绘制';
          _drawing.value = false;
          drawingManager.close();
          var myGeo = new BMap.Geocoder({ extensions_town: true });
          // 根据坐标得到地址描述
          myGeo.getLocation(_overlay.value.getCenter(), function (result:any) {
            if (result) {
              console.log(result);
            }
          });
          _selected_field.value = {
            longitude: _overlay.value.getCenter().lng,
            latitude: _overlay.value.getCenter().lat,
            radius: _overlay.value.getRadius(),
          };
          console.log(overlay);
          context.emit('selected-field', _selected_field);
        }
      );
      map.addControl(new BMap.NavigationControl());

      function DrawingControl() {}
      DrawingControl.prototype = new BMap.Control();
      DrawingControl.prototype.initialize = function (map: any) {
        _dmDiv.value = document.createElement('div');
        _dmDiv.value.appendChild(document.createTextNode('重新绘制'));
        _dmDiv.value.style.cursor = 'pointer';
        _dmDiv.value.style.border = '1px solid gray';
        _dmDiv.value.style.backgroundColor = 'white';
        _dmDiv.value.onclick = function (e: any) {
          if (!_drawing.value) {
            if (_overlay.value) _overlay.value.hide();
            _dmDiv.value.innerHTML = '停止绘制';
            context.emit('selected-field', null);
            drawingManager.open();
            _drawing.value = true;
          } else {
            _dmDiv.value.innerHTML = '重新绘制';
            _drawing.value = false;
            context.emit('selected-field', null);
            drawingManager.close();
          }
        };
        map.getContainer().appendChild(_dmDiv.value);
        return _dmDiv.value;
      };
      const D = DrawingControl as any;
      const drawingControl = new D();
      drawingControl.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
      drawingControl.defaultOffset = new BMap.Size(10, 10);
      map.addControl(drawingControl);

      function GeoLocation() {}
      GeoLocation.prototype = new BMap.Control();
      GeoLocation.prototype.initialize = function (map: any) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode('定位'));
        div.style.cursor = 'pointer';
        div.style.border = '1px solid gray';
        div.style.backgroundColor = 'white';
        div.onclick = function (e: any) {
          GetLocationApi.getLocationFromBrowser((r:any)=>
          {
            console.log(r);
          });
        };
        map.getContainer().appendChild(div);
        return div;
      };
      const G = GeoLocation as any;
      const geoLocation = new G();
      geoLocation.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
      geoLocation.defaultOffset = new BMap.Size(10, 50);
      map.addControl(geoLocation);
    }

    onMounted(() => {
      initMap();
    });
    return { wrapRef };
  },
});
</script>