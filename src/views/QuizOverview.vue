<template>
    <div div id="question-container">
        <h1>Welkom!</h1>
        <p class="padding-v-16 large">
            Ontdek webtoegankelijkheid met de WCAG Kennis Tester! Test je kennis, verbeter je vaardigheden en draag bij aan een inclusief internet. Welkom en veel plezier!        
        </p>
        <h2>Richtlijnen</h2>
        <ul class="space-v-16 overview_list">
            <li v-for="quiz in quizzes" :key="quiz.id" class="space-8">
                <router-link :to="{ name: 'Quiz', params: { id: quiz.id } }">
                    {{ quiz.title }}
                </router-link>
            </li>
        </ul>
        <h2>Onderwerpen</h2>
        <ul class="space-v-16 overview_list">
            <li v-for="topic in topics" :key="topic.slug" class="space-8">
                <router-link :to="{ name: 'Topic', params: { slug: topic.slug } }">
                    {{ topic.topic }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const quizzes = ref([]);
const topics = [
    { "topic": "Basisprincipes van Toegankelijkheid", "slug": "basisprincipes-toegankelijkheid" },
    { "topic": "Scherminhoud en Leesvolgorde", "slug": "scherminhoud-leesvolgorde" },
    { "topic": "Structuur met Koppen en Subkoppen", "slug": "structuur-koppen-subkoppen" },
    { "topic": "Alternatieve Tekst voor Afbeeldingen", "slug": "alternatieve-tekst-afbeeldingen" },
    { "topic": "Kleurgebruik en Contrast", "slug": "kleurgebruik-contrast" },
    { "topic": "Toetsenbordnavigatie en Focusindicatie", "slug": "toetsenbordnavigatie-focusindicatie" },
    { "topic": "Formulieren en Toegankelijke Invoervelden", "slug": "formulieren-toegankelijke-invoervelden" },
    { "topic": "Multimedia: Video en Audio", "slug": "multimedia-video-audio" },
    { "topic": "Leesbaarheid en Tekstaanpassingen", "slug": "leesbaarheid-tekstaanpassingen" },
    { "topic": "Duidelijke en Betekenisvolle Linkteksten", "slug": "duidelijke-betekenisvolle-linkteksten" },
    { "topic": "Responsiviteit en Mobiele Toegankelijkheid", "slug": "responsiviteit-mobiele-toegankelijkheid" },
    { "topic": "Toegankelijkheid van Tabellen en Gegevens", "slug": "toegankelijkheid-tabellen-gegevens" },
    { "topic": "Aria-Labels en Rolattributen", "slug": "aria-labels-rolattributen" },
    { "topic": "Lettertypekeuze en Tekstgroottes", "slug": "lettertypekeuze-tekstgroottes" },
    { "topic": "Navigatiestructuur en Landmarks", "slug": "navigatiestructuur-landmarks" },
    { "topic": "Focus op Gebruikers met Beperkingen", "slug": "focus-gebruikers-beperkingen" },
    { "topic": "Toegankelijkheidsaudits en Testing Tools", "slug": "toegankelijkheidsaudits-testing-tools" },
    { "topic": "Toegankelijkheidsverklaringen en Compliance", "slug": "toegankelijkheidsverklaringen-compliance" },
    { "topic": "Onderhoud van Toegankelijkheid in Content", "slug": "onderhoud-toegankelijkheid-content" },
    { "topic": "Praktijkvoorbeelden en Casestudy's", "slug": "praktijkvoorbeelden-casestudys" }
]

onMounted(() => {
    // Simpele voorbeelddata, vervang dit met een API-aanroep
    quizzes.value = [
        { id: '1-1', title: 'Richtlijn 1.1' },
        { id: '1-2', title: 'Richtlijn 1.2' }
        // ... voeg meer quizzen toe
    ];
});
</script>
