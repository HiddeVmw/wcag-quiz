<template>
  <div>
    <router-link class="back__button" :to="{ name: 'QuizOverview' }"
      aria-label="Terug naar Quizoverzicht">Terug</router-link>

    <div id="question-container" role="form" aria-labelledby="quiz-title">
      <h1 id="quiz-title">Richtlijn {{ quizId.replace('-', '.') }}</h1>
      <div id="question" tabindex="0">
         <div id="error-message"  :aria-live="errorMessage ? 'assertive' : 'off'" :aria-describedby="errorMessage ? 'error-message' : null">
        {{ errorMessage }}
      </div>
        <h2 class="question__div space-v-16" aria-live="polite">{{ currentQuestion.vraag }}</h2>
        <div id="options-container" role="group" aria-labelledby="options-title" class="space-v-16">
          <div id="options-title" class="sr-only">Antwoordopties</div>
          <template  v-for="(option, index) in currentQuestion.opties" :key="index">
<label class="option-label space-8">
            <input type="radio" v-model="selectedOption" :value="option" :name="'optie' + index" :id="'optie' + index"
              :aria-labelledby="'optie' + index + '-label'" />
            <span :id="'optie' + index + '-label'">{{ option }}</span>
          </label>
          </template>
          
        </div>
      </div>
      <button v-if="currentQuestionIndex !== questions.length" @click="checkAnswer" role="button">
        Volgende vraag
      </button>
      <div>
    <Modal ref="resultModal" @close="restartQuiz" :title="`Uitslag Richtlijn ${ quizId.replace('-', '.') }` ">

        <div class="results_container" v-if="currentQuestionIndex === questions.length">

          <p id="feedback" role="status" aria-live="assertive">{{ feedback }}</p>

          <ul id="errorList" class="space-v-16" v-if="errors && currentQuestionIndex === questions.length">
            <li v-for="(error, index) in errors" :key="index">
              <h3>Vraag {{ index + 1 }}</h3>
              <div>
                <h>{{ error.vraag }}</h>

                <h4>Antwoord bij vraag {{ index + 1 }}</h4>
                <p class="correct_answer">{{ error.correct_antwoord }}</p>
              </div>
            </li>
          </ul>
          <p v-if="!errors">Er zijn geen fout beantwoorde vragen.</p>
          
          <button @click="restartQuiz">Opnieuw beginnen</button>
          <button  class="space-h-8 secondary" @click="$router.push({ name: 'QuizOverview' })">Terug naar overzicht</button>
        </div>
        </Modal>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { questionsData } from '../data/questions.js';
import { useRoute, useRouter } from 'vue-router';
import Modal from '../components/Modal.vue';

const errorMessage = ref('');

const route = useRoute();
const resultModal = ref(null);
const quizId = computed(() => route.params.id);

// const questions = questionsData[route.params.id];
// 10 random questions
const questions = questionsData[route.params.id].sort(() => Math.random() - Math.random()).slice(0, 5);

let currentQuestionIndex = ref(0);
let selectedOption = ref('');
let feedback = ref('');
let errors = ref([]);

const currentQuestion = ref(questions[currentQuestionIndex.value])

const restartQuiz = () => {
  currentQuestionIndex.value = 0;
  selectedOption.value = '';
  feedback.value = '';
  errors.value = [];
  resultModal.value.visible = false;
  loadQuestion();
};

const loadQuestion = () => {
  currentQuestion.value = questions[currentQuestionIndex.value];
  selectedOption.value = '';
  // Stel de focus in op de volgende vraag
  const nextQuestionId = 'question';
  const nextQuestionElement = document.getElementById(nextQuestionId);
  errorMessage.value = ''; 
  if (nextQuestionElement) {
    nextQuestionElement.focus();
  }
};

const checkAnswer = () => {
  if (selectedOption.value) {
    const userAnswer = selectedOption.value;
    const correctAnswer = currentQuestion.value.correct_antwoord;

    if (userAnswer === correctAnswer) {
      feedback.value = 'Goed antwoord!';
    } else {
      feedback.value = `Fout antwoord. Het juiste antwoord is: ${correctAnswer}`;
      errors.value.push(currentQuestion.value);
    }

    // Ga naar de volgende vraag
    currentQuestionIndex.value++;

    // Laad de volgende vraag of toon de eindscore
    if (currentQuestionIndex.value < questions.length) {
      loadQuestion();
    } else {
      currentQuestionIndex.value = questions.length;
      feedback.value = `Je hebt ${questions.length - errors.value.length} van de ${questions.length} vragen goed beantwoord.`;
      resultModal.value.visible = true;

      // add list of errors to feedback
    }
  } else {
    errorMessage.value = 'Selecteer een antwoord.';
  }
};

onMounted(loadQuestion);
</script>

<style></style>
