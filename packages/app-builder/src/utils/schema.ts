/**
 * 协议版本检测
 */
export const checkVersion = (schema: any) => {
  const isV3 = schema.version && parseInt(schema.version) === 3;
  const isV2 = !schema.version || parseInt(schema.version) < 3;

  return {
    isV3,
    isV2,
  };
};
