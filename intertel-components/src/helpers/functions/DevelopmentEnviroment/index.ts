import process from "process";

const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const IsDevelopmentEnvironment = (): boolean => development;
const IsProductionEnvironment = (): boolean => !development;

export { IsDevelopmentEnvironment, IsProductionEnvironment };
