// @ts-check
export const animals = {
  animals: ['dog', 'cat'],
  showAnimals: function () {
    this.animals.map((el) => console.log(el));
  },
};
