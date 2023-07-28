export default function useDateHelper() {
    const getDayOfWeekName = (ISODateStr: string) => {
        let dateObject = new Date(ISODateStr);
        return dateObject.toLocaleString('ru-RU', {weekday: 'short'});;
    };
    const getMonthName = (ISODateStr: string) => {
        let dateObject = new Date(ISODateStr);
        return dateObject.toLocaleString('ru-RU', { month: 'short' });
    };
    const getDayNumber = (ISODateStr: string) => {
        let dateObject = new Date(ISODateStr);
        return dateObject.getDate();
    };
    return { getDayOfWeekName, getMonthName, getDayNumber };
}