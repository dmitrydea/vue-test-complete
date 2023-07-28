import { CellData } from "@/types";
export default function useStoryHelper() {
    const getDataFromStore = async () => {
        return new Promise<Array<CellData>>(resolve => {
            setTimeout(() => {
                let data = localStorage.getItem("daysData");
                let data_array = data && data?.length ? JSON.parse(data) : [];
                resolve(data_array);
            },1000);
        });
    };
    const setDataToStore = (cellData: CellData) => {
        let data = localStorage.getItem("daysData");
        let data_array = data && data?.length ? JSON.parse(data) as Array<CellData> : [];
        let search = data_array.filter((item) => { return item.date == cellData.date });
        if(search.length > 0)
        {
            data_array.forEach((item) => {
                if (item.date == cellData.date) {
                    item.value = cellData.value;
                    return;
                }
            })
        } else {
            data_array.push({
                date: cellData.date,
                value: cellData.value
            });
        }
        localStorage.setItem("daysData",JSON.stringify(data_array));
    };
    return { getDataFromStore, setDataToStore };
}