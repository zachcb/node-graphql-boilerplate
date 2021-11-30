import chalk from "chalk";
import boxen, { Options } from "boxen";

const {
  log, warn, error, table,
} = console;
type LoggerOptions = {
  status: string;
  message: string;
  box?: boolean;
}

const boxOptions: Options = {
  padding: 1,
  margin: 1,
  borderStyle: "double",
};

export const logger = (context: LoggerOptions): void => {
  const { status, message, box = false } = context;
  const preparedMessage = box ? boxen(message, boxOptions) : message;

  switch (status) {
    case "success":
      log(chalk.blue(preparedMessage));
      break;
    case "warn":
      warn(chalk.yellow(preparedMessage));
      break;
    case "error":
      error(chalk.red(preparedMessage));
      break;
    default:
  }
};
