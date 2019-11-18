import VueRouter from "vue-router";
import Combat from "./screens/Combat";
import CharactersSelection from "./screens/CharactersSelection";
import Victory from "./screens/Victory";
import Defeat from "./screens/Defeat";
import GameOver from "./screens/GameOver";

const routes = [
  {path: '/characters-selection', name: "characters-selection", component: CharactersSelection},
  {path: '/combat', name: 'combat', component: Combat},
  {path: '/victory', name: 'victory', component: Victory},
  {path: '/defeat', name: 'defeat', component: Defeat},
  {path: '/gameover', name: 'gameover', component: GameOver},
  {path: '/', component: CharactersSelection}
]

export const router = new VueRouter({
  routes
})
