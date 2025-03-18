export const steps = {
    sum: (steps) => {
        const totalSteps = steps.records.reduce((sum, record) => sum + record.count, 0);
        return totalSteps;
    }
}