const prefix = 'MAX-BUILDER';

/** console日志 **/
const log = (
  type: 'WARN' | 'SUCCESS' | 'ERROR' | 'INFO',
  msg: string,
  ...others: any
) => {
  console.log(
    `[ ${prefix} ${type} ]: ${msg}${others.length > 0 ? '\n' : ''}`,
    ...others,
  );
};
export const Logger = {
  info: (msg: string, ...others: any) => {
    log('INFO', msg, ...others);
  },
  warn: (msg: string, ...others: any) => {
    log('WARN', msg, ...others);
  },
  success: (msg: string, ...others: any) => {
    log('SUCCESS', msg, ...others);
  },
  error: (msg: string, ...others: any) => {
    log('ERROR', msg, ...others);
  },
};
