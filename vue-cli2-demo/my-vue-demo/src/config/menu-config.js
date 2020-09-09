const base = 'Home'

//一级菜单在这写死，只对二级菜单进行方法的增加
const menujson = [{
  name: 'basic',
  meta: {
    title: '基本',
    icon: 'fa fa-camera-retro'
  },
  sub: []
},{
  name: 'basic2',
  meta: {
    title: '基本2',
    icon: 'fa fa-camera-retro'
  },
  sub: []
},{
  name: 'basic3',
  meta: {
    title: '基本3',
    icon: 'fa fa-camera-retro'
  },
  sub: []
}];

let addSubMenuData = function (name, title, path,parentIndex) {

  let subjsont = {
    name: name,
    meta: {
      index: `/Home/${name}`,
      title: title,
      path: path,
      type: 'menu',
      active: false
    }
  }
  let indexs = parentIndex | 0;
  menujson[indexs].sub.push(subjsont);
}


//mockjs的使用
addSubMenuData('mockjsdemo', 'mockjs的试用', './views/news')


//hls播放实时视频的使用
addSubMenuData('播放视频demo', '播放视频demo', './views/videoHls')

addSubMenuData('播放视频demo-videoJs', '播放视频demo-videoJs', './views/videoHls/videoJsDemo')

addSubMenuData('vlc视频demo', 'vlc视频demo', './views/videoHls/vlcDemo')

addSubMenuData('hkiWebSdk视频demo', 'hkiWebSdk视频demo', './views/videoHls/iframeWebSdk')

addSubMenuData('videojsCom', 'videojsCom视频demo', './views/videoHls/videoJsCom')

addSubMenuData('gojsdemo-1', 'gojs的使用-鼠标移入移出事件', './views/gojsdemo/gojs-1')


addSubMenuData('cartlist-1', 'gcartlist-1', './views/cartlist',1)
addSubMenuData('elPicUpload-1', 'elPicUpload-1', './views/elUploadPic',1)


export default menujson;
