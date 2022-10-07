'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  let listMaleGender = people.filter(person => person.sex === 'm');

  listMaleGender = century
    ? listMaleGender.filter(person => Math.ceil(person.died / 100) === century)
    : listMaleGender;

  return listMaleGender.reduce((result, person) =>
    result + (person.died - person.born), 0) / listMaleGender.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let listFemaleGender = people.filter(person => person.sex === 'f');

  listFemaleGender = withChildren
    ? listFemaleGender.filter(woman => people.some(
      person => woman.name === person.mother)
    )
    : listFemaleGender;

  return listFemaleGender.reduce((result, person) =>
    result + (person.died - person.born), 0) / listFemaleGender.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let listChildren = people.filter(child => child.mother
    && people.find(person => person.name === child.mother));

  listChildren = onlyWithSon
    ? listChildren.filter(child => child.sex === 'm')
    : listChildren;

  return listChildren.reduce((result, child) =>
    result + child.born - (people.find(person =>
      person.name === child.mother).born), 0) / listChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
