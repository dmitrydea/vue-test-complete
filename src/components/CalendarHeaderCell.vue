<script lang="ts" setup>
import { PropType } from 'vue';
import useDataHelper from "@/hooks/datehelper";
import { CellData } from '@/types';
const props = defineProps({
    day: {
        type: Object as PropType<CellData>,
        required: true,
    }
})
const { getDayOfWeekName, getMonthName, getDayNumber } = useDataHelper();
</script>

<template>
    <th class="bg-light">
        <div class="cell-header">
            <div>
                {{ getDayOfWeekName(day.date) }}
            </div>
            <div>
                {{ getDayNumber(day.date) }}
            </div>
            <div>
                {{ getMonthName(day.date) }}
            </div>
        </div>
    </th>
</template>

<style scoped>
    .cell-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .cell-header > div {
        font-weight: normal;
        font-size: 12px;
        padding: 0 !important;
    }
    .cell-header > div:nth-child(2) {
        font-weight: bold;
    }
    .bg-light {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }
</style>
