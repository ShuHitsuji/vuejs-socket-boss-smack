import VueRouter from "vue-router";
import Combat from "./screens/Combat";
import CharactersSelection from "./screens/CharactersSelection";
import Victory from "./screens/Victory";

const routes = [
  {path: '/characters-selection', component: CharactersSelection},
  {path: '/combat', name: 'combat', component: Combat},
  {path: '/victory', name: 'combat', component: Victory},
  {path: '/combat', name: 'combat', component: Combat},
  {path: '/', component: CharactersSelection}
]

export const router = new VueRouter({
  routes
})
