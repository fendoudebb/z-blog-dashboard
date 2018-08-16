<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Tag color="blue">{{userName}}</Tag>
      <Icon :size="12" type="arrow-down-b"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'user',
  props: {
    userName: {
      type: String,
      default: localStorage.getItem('username')
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
          });
          break
      }
    }
  }
}
</script>
