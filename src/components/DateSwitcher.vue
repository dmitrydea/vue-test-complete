<script lang="ts" setup>
import { ref, computed, onMounted, PropType } from 'vue';
import { CustomDate } from '@/types';
const currentDate = ref<Date>(new Date());

const { waitLoading } = defineProps({
    waitLoading: {
        type: Boolean as PropType<Boolean>,
        required: true,  
    }
})

const emit = defineEmits<{
  (e: 'getdateinfo', value: CustomDate): void
}>()

const toViewDate = computed<string>(() => {
  return currentDate.value.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
});

const changeMonth = (diff: number) => {
    let newDate = new Date(currentDate.value);
    newDate.setMonth(newDate.getMonth() + diff);
    currentDate.value = newDate;
    emit('getdateinfo', {
        month: currentDate.value.getMonth(),
        year: currentDate.value.getFullYear()
    } as CustomDate);
}

onMounted(() => {
    emit('getdateinfo', {
        month: currentDate.value.getMonth(),
        year: currentDate.value.getFullYear()
    } as CustomDate);
})
</script>

<template>
    <div class="switcher">
        <button :disabled="waitLoading" class="btn btn-outline-dark" @click="changeMonth(-1)">Пред. месяц</button>
        <span style="min-width: 200px;">{{ toViewDate }}</span>
        <button :disabled="waitLoading" class="btn btn-outline-dark" @click="changeMonth(1)">След. месяц</button>
    </div>
</template>

<style scoped>
.switcher {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
}
.switcher span {
    text-align: center;
}
</style>
