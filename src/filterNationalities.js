export function filterNationalities(nationalities) {
    return {
        Nationalities: nationalities.reduce((object, item) => {
            if (!object[item]) {
                object[item] = 1;
            } else {
                object[item]++;
            }
            return object;

        }, {})

    }
}