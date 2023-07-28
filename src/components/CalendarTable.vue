<template>
  <div class="table-wrapper">
    <table class="table table-bordered">
      <thead>
        <tr>
          <CalendarHeaderCell v-for="(day) in daysInMonth" :key="day.date" :day="day" />
        </tr>
      </thead>
      <tbody>
        <tr>
          <CalendarCell v-for="(day, index) in daysInMonth" v-model:editingFlag="day.editing" v-model:numberValue="day.value" :key="index" :day="day" @saveCellInStorage="updateCellValueInStorage" />
        </tr>
      </tbody>
    </table>
    <PreLoader v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, PropType } from 'vue';
import { CustomDate, CellData } from '@/types';
import useStoryHelper from "@/hooks/storyhelper";
const { getDataFromStore, setDataToStore } = useStoryHelper();
import CalendarCell from '@/components/CalendarCell.vue';
import CalendarHeaderCell from '@/components/CalendarHeaderCell.vue';
import PreLoader from '@/components/PreLoader.vue';

const props = defineProps({
  dateInfo: {
    type: Object as PropType<CustomDate>,
    required: true,
  }
})

const emit = defineEmits<{
  (e: 'callIsLoading', value: Boolean): void
}>()

const daysInMonth = ref<CellData[]>([]);
const isLoading = ref<Boolean>(false);

const getDaysCount = computed<number>(() => {
  const days = new Date(props.dateInfo.year, props.dateInfo.month + 1, 0).getDate();
  return days;
});

const setDaysInMontht = async (daysCount: number) => {
  isLoading.value = true;
  emit("callIsLoading", true);
  let result = await getDataFromStore();
  daysInMonth.value = [];
  for (let index = 1; index <= daysCount; index++) {
    let dt = getDate(index);
    let val = result.filter((item) => { return item.date == dt });
    daysInMonth.value.push({
      date: dt,
      value: val && val.length ? val[0].value : 0,
      editing: false
    });
  }
  isLoading.value = false;
  emit("callIsLoading", false);
};

const getDate = (day: number) => {
  return `${props.dateInfo.year}-${props.dateInfo.month + 1}-${day}`;
};

watch(() => props.dateInfo.month, () => { 
  setDaysInMontht(getDaysCount.value);
});

onMounted(() => {
  setDaysInMontht(getDaysCount.value);
});

const updateCellValueInStorage = (cellData: CellData) => {
  console.log(cellData);
  setDataToStore(cellData);
}

</script>

<style>
.table-wrapper {
  position: relative;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

input {
  width: 40px;
  text-align: center;
}
</style>
