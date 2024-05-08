import { createNamespacedHelpers } from 'vuex';
let { mapState } = createNamespacedHelpers('user');
export default {
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    getMenuList(authList) {
      let menu = [];
      let map = {};
      authList.forEach(m => {
        m.children = [];
        map[m.id] = m;  //{1:菜单,2:菜单}
        if (m.pid == -1) {  //如果是根就直接push到menu中
          menu.push(m);
        } else {
          map[m.pid] && map[m.pid].children.push(m);
        }
      })
      return menu;
    }
  },
  mounted() {
    this.list = this.getMenuList(this.userInfo.authList);
  },
  render() {
    let renderChildren = (list) => {
      return list.map(child => {
        return child.children.length ?
          <el-submenu index={child._id}>
            <div slot="title">{child.name}</div>
            {renderChildren(child.children)}
          </el-submenu> :
          <el-menu-item index={child.path}>{child.name}</el-menu-item>
      })
    }
    return <el-menu background-color="#333" text-color="#fff" active-text-color="#ffd04b" router={true} class="menu">
      {renderChildren(this.list)}
    </el-menu>;
  }
}
