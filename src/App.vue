<template>
  <div>
    <DateSwitcher @getdateinfo="getDateInfo" :waitLoading="waitLoading" />
    <CalendarTable :dateInfo="dateInfoFromSwitcher" @callIsLoading="(value) => waitLoading = value"></CalendarTable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DateSwitcher from '@/components/DateSwitcher.vue';
import CalendarTable from '@/components/CalendarTable.vue';
import { CustomDate } from '@/types';

const dateInfoFromSwitcher = ref<CustomDate>({} as CustomDate)

const waitLoading = ref<Boolean>(false)

const getDateInfo = (dateInfo: CustomDate) => {
  dateInfoFromSwitcher.value = dateInfo;
}
</script>

<style>
button {
  margin-bottom: 10px;
}
</style>
