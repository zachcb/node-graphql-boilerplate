export const logger = (context: Record<string, unknown>): void => {
  const { status, message } = context;

  switch (status) {
    case 'success':
      console.log('LOG', message);
      break;
    case 'error':
      console.error('ERROR', message);
      break;
    default:
  }
};
