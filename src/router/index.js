// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import QuizOverview from '../views/QuizOverview.vue';
import QuestionsComponent from '../views/QuestionsComponent.vue';
import TopicComponent from '../views/TopicComponent.vue';

const routes = [
  {
    path: '/',
    name: 'QuizOverview',
    component: QuizOverview,
  },
  {
    path: '/richtlijn/:id',
    name: 'Quiz',
    component: QuestionsComponent,
    props: true,
  },
  {
    path: '/onderwerp/:slug',
    name: 'Topic',
    component: TopicComponent,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
