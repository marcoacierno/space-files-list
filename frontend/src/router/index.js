import Vue from 'vue';
import Router from 'vue-router';

import FilesList from '@/components/FilesList';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'files-list', component: FilesList },
  ],
});
