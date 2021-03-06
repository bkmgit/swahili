const SWList = require('../../../../types/list');
const SWNumber = require('../../../../types/number');
const SWBoolean = require('../../../../types/boolean');
const RTResult = require('../../../../runtimeResult');
const { RTError } = require('../../../../error');

/**
 * Puts an element at the given index of a list
 * @param {SWBuiltInFunction} inst the instance of the built in function
 * @param {Context} executionContext the calling context
 */
function weka(inst, executionContext) {
  let res = new RTResult();
  let orodha = executionContext.symbolTable.get('orodha');
  let pahala = executionContext.symbolTable.get('pahala');
  let kitu = executionContext.symbolTable.get('kitu');

  if (!pahala)
    return res.failure(
      new RTError(
        inst.posStart,
        inst.posEnd,
        `Parameter 'pahala' is required`,
        executionContext
      )
    );

  if (!kitu)
    return res.failure(
      new RTError(
        inst.posStart,
        inst.posEnd,
        `Parameter 'kitu' is required`,
        executionContext
      )
    );

  // check types
  if (!(pahala instanceof SWNumber) || !Number.isInteger(pahala.value))
    return res.failure(
      new RTError(
        pahala.posStart,
        pahala.posEnd,
        `'pahala' must be an int`,
        executionContext
      )
    );

  // check index in bounds
  if (pahala.value < 0 || pahala.value > orodha.elements.length)
    return res.failure(
      new RTError(
        pahala.posStart,
        pahala.posEnd,
        `Index ${pahala.value} is out of bounds`,
        executionContext
      )
    );

  // replace value in list
  orodha.elements[pahala.value] = kitu;
  return res.success(kitu);
}

module.exports = {
  method: weka,
  args: ['orodha', 'pahala', 'kitu'],
  types: [SWList],
};
