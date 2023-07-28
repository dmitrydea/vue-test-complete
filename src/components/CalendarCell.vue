<template>
  <td ref="wrapperElement" class="cell-body" @click="editCell">
    <input :class="{'text-active' : editingFlag}" v-if="day.editing" type="text" :value="numberValue" @keydown.enter="saveCell(day)" @keydown="onKeyDown" @input="onInput($event)" >
    <span v-else @click="editCell">{{ numberValue }}</span>
    <hr :class="{'background-active' : editingFlag}" class="dropdown-divider">
  </td>
</template>

<script setup lang="ts">
import { ref, PropType, nextTick  } from 'vue';
import { CellData } from '@/types';
const wrapperElement = ref<HTMLInputElement | null>(null)
const {day, numberValue, editingFlag} = defineProps({
    day: {
      type: Object as PropType<CellData>,
      required: true,
    },
    numberValue: {
      type: Number as PropType<Number>,
      required: true,
    },
    editingFlag: {
      type: Boolean as PropType<Boolean | undefined>,
      required: true,
    }
})
const emit = defineEmits<{
  (e: 'update:numberValue', value: Number): void,
  (e: 'update:editingFlag', value: Boolean): void
  (e: 'saveCellInStorage', value: CellData): void
}>()


const editCell = async () => {
  emit('update:editingFlag', true);
  await nextTick();
  wrapperElement.value?.getElementsByTagName("input")[0].focus();
};

const saveCell = (cellData: CellData) => {
  emit('update:editingFlag', false);
  emit('saveCellInStorage', cellData);
};

const onKeyDown = (e: any) => {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'];
  const isDigit = /[0-9]/.test(e.key);
  if (!isDigit && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
}

const onInput = (e: any) => {
  let a = e.target.value.replace(/\D/g, '');
  if(a) emit('update:numberValue', parseInt(e.target.value.replace(/\D/g, '')));
  else emit('update:numberValue', 0);
};
</script>

<style>
input {
  width: 40px;
  text-align: center;
}
.cell-body {
  padding-top: 30px !important;
  padding-bottom: 30px !important;
}
.dropdown-divider {
  height: 1px !important;
  background-color: gray !important;
  margin-top: 3px !important;
}
.cell-body input {
  background-color: transparent !important;
  border: none !important;
  outline: none !important;
}
.text-active {
  color: blue !important;
}
.background-active {
  background-color: blue !important;
}
</style>
