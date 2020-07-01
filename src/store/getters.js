const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  showpage:state => state.user.showpage,
  demoObj:state => state.user.demoObj,
}
export default getters
