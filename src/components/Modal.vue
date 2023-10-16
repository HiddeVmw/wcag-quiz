<template>
    <div v-show="visible" @keydown.esc="closeModal" @click.self="closeModal" ref="modal" role="dialog" aria-modal="true"
        :aria-labelledby="modalTitleId" @focusin="handleFocusIn">
        <div ref="modalContent"  role="document" aria-labelledby="modalTitle" id="modalTitle"  @keydown.tab.prevent="trapFocus">
            <h2 id="modalTitle">{{ title }}</h2>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onUnmounted } from 'vue';

defineProps({
    title: {
        type: String,
        required: true,
    },
});

const visible = ref(false);

const closeModal = () => {
    visible.value = false;
};

const modalTitleId = 'modalTitle';

const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

const trapFocus = (event) => {
    const modalContent = document.getElementById(modalTitleId);
    const focusableElements = modalContent.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    } else {
        // next element focus
        if (event.shiftKey) {
            if (activeElement.previousElementSibling) {
                event.preventDefault();
                activeElement.previousElementSibling.focus();
            }
        } else {
            if (activeElement.nextElementSibling) {
                event.preventDefault();
                activeElement.nextElementSibling.focus();
            }
        }
    }
};

const handleFocusIn = (event) => {
    const modalContent = document.getElementById(modalTitleId);
  
    if (visible.value && modalContent && !modalContent.contains(event.target)) {
        modalContent.focus();
    }
};

watchEffect(() => {
    if (visible.value) {
        document.addEventListener('keydown', handleKeyDown);
        const modalContent = document.getElementById(modalTitleId);
        if (modalContent) modalContent.focus();
    } else {
        document.removeEventListener('keydown', handleKeyDown);
    }
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
});

defineExpose({ visible });
</script>

<style>
/* Style your modal here */
[role="dialog"] {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

[role="document"] {
    background: white;
    border-radius: 10px;
    padding: 20px;
    max-width: 600px;
}
</style>
