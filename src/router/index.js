import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VideoList from "@/components/VideoList/VideoList"
import DataTable from "@/components/DataTable/DataTable"

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

  {
    path: '/videolist',
    name: 'VideoList',
    component: VideoList,
    
  },
  {
    path: '/datatable',
    name: 'DataTable',
    component: DataTable,
    
  },
]

const router = new VueRouter({
  routes
})

export default router
