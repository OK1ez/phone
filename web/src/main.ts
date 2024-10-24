import './styles/globals.css'
import App from './main.svelte'
import { mount } from "svelte";

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
