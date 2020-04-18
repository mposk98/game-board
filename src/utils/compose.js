const compose = (...funcs) => (arg) => funcs.reduceRight((result, func) => func(result), arg);

export default compose;
